import { API_CONFIG } from '../config';
import type { ApiResponse } from '../types';

export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public body?: unknown,
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

type RequestOptions = {
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  body?: unknown;
  token?: string;
};

export async function apiRequest<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const { method = 'GET', body, token } = options;
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), API_CONFIG.timeoutMs);

  try {
    const headers: Record<string, string> = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };
    if (token) headers.Authorization = `Bearer ${token}`;

    const response = await fetch(`${API_CONFIG.baseUrl}${path}`, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
      signal: controller.signal,
    });

    const json = await response.json().catch(() => null);

    if (!response.ok) {
      throw new ApiError(
        (json as { message?: string })?.message ?? `Request failed (${response.status})`,
        response.status,
        json,
      );
    }

    return ((json as ApiResponse<T>)?.data ?? json) as T;
  } finally {
    clearTimeout(timeout);
  }
}

export async function apiGet<T>(path: string, token?: string): Promise<T> {
  return apiRequest<T>(path, { method: 'GET', token });
}

export async function apiPost<T>(path: string, body: unknown, token?: string): Promise<T> {
  return apiRequest<T>(path, { method: 'POST', body, token });
}
