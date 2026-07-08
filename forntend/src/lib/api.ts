export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  errors?: Array<{ field?: string; message: string }>;
}

export class ApiError extends Error {
  status: number;
  errors?: ApiResponse<unknown>['errors'];

  constructor(message: string, status: number, errors?: ApiResponse<unknown>['errors']) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.errors = errors;
  }
}

type ApiRequestBody = BodyInit | Record<string, unknown> | unknown[] | null;

interface ApiFetchOptions extends Omit<RequestInit, 'body'> {
  body?: ApiRequestBody;
}

export const API_BASE_URL = normalizeApiBase(import.meta.env.VITE_API_URL);
export const IMAGE_API_URL = normalizeApiBase(import.meta.env.VITE_IMAGE_API_URL || import.meta.env.VITE_API_URL?.replace('/api', '') || '');

function normalizeApiBase(value?: string) {
  const trimmed = value?.trim().replace(/\/+$/, '');
  return trimmed || '/api';
}

export function apiUrl(endpoint: string) {
  if (/^https?:\/\//i.test(endpoint)) return endpoint;

  const normalizedEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  return `${API_BASE_URL}${normalizedEndpoint}`;
}

export function getImageUrl(endpoint: string | undefined | null) {
  if (!endpoint) return '';
  if (/^https?:\/\//i.test(endpoint) || endpoint.startsWith('data:')) return endpoint;
  const normalizedEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  return `${IMAGE_API_URL}${normalizedEndpoint}`;
}

export async function apiFetch<T>(endpoint: string, options: ApiFetchOptions = {}) {
  const headers = new Headers(options.headers);
  const isFormData = options.body instanceof FormData;
  const hasBody = options.body !== undefined && options.body !== null;
  let body = options.body;

  if (hasBody && !isFormData && typeof options.body !== 'string') {
    headers.set('Content-Type', 'application/json');
    body = JSON.stringify(options.body);
  }

  const response = await fetch(apiUrl(endpoint), {
    ...options,
    headers,
    body: body as BodyInit | undefined,
  });
  const payload = await parseJsonResponse<T>(response);

  if (!response.ok || payload.success === false) {
    throw new ApiError(payload.message || 'API request failed', response.status, payload.errors);
  }

  return payload;
}

async function parseJsonResponse<T>(response: Response): Promise<ApiResponse<T>> {
  try {
    return await response.json();
  } catch (_error) {
    return {
      success: response.ok,
      message: response.ok ? 'OK' : response.statusText,
      data: null as T,
    };
  }
}

export function apiGet<T>(endpoint: string) {
  return apiFetch<T>(endpoint);
}

export function apiPost<T>(endpoint: string, body: ApiRequestBody) {
  return apiFetch<T>(endpoint, { method: 'POST', body });
}
