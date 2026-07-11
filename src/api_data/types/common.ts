export type BilingualText = {
  en: string;
  hi: string;
};

export type ApiResponse<T> = {
  data: T;
  success: boolean;
  message?: string;
};

export type PaginatedResponse<T> = ApiResponse<T[]> & {
  page: number;
  total: number;
  hasMore: boolean;
};
