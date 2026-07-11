import { useEffect, useState } from 'react';
import { API_CONFIG } from '../config';

type UseApiDataResult<T> = {
  data: T | null;
  loading: boolean;
  error: Error | null;
  refetch: () => void;
};

export function useApiData<T>(
  fetcher: () => Promise<T>,
  mockFallback?: T,
  deps: unknown[] = [],
): UseApiDataResult<T> {
  const [data, setData] = useState<T | null>(() =>
    API_CONFIG.useMock && mockFallback !== undefined ? mockFallback : null,
  );
  const [loading, setLoading] = useState(!(API_CONFIG.useMock && mockFallback !== undefined));
  const [error, setError] = useState<Error | null>(null);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    fetcher()
      .then((result) => {
        if (!cancelled) setData(result);
      })
      .catch((err: Error) => {
        if (!cancelled) setError(err);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [tick, ...deps]);

  return {
    data,
    loading,
    error,
    refetch: () => setTick((n) => n + 1),
  };
}
