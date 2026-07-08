interface ApiEnvelope<T> {
  data: T;
  message?: string;
}

interface ApiErrorPayload {
  error?: string;
  fields?: Record<string, string | undefined>;
}

export class ApiError extends Error {
  status: number;
  fields?: Record<string, string | undefined>;

  constructor(message: string, status: number, fields?: Record<string, string | undefined>) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.fields = fields;
  }
}

async function request<T>(path: string, init: RequestInit = {}): Promise<ApiEnvelope<T>> {
  const headers = new Headers(init.headers);
  if (init.body && !(init.body instanceof FormData) && !headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json');
  }

const baseUrl = import.meta.env.VITE_API_URL || '';
  const url = path.startsWith('http') ? path : baseUrl + path;

  const response = await fetch(url, {
    ...init,
    credentials: 'include',
    headers,
  });
  const payload = await response.json().catch(() => ({})) as ApiEnvelope<T> & ApiErrorPayload;

  if (!response.ok) {
    if (response.status === 401 && !path.endsWith('/login') && !path.endsWith('/session')) {
      window.dispatchEvent(new Event('auth:expired'));
    }
    throw new ApiError(payload.error || 'Request failed.', response.status, payload.fields);
  }

  return payload;
}

export const api = {
  get<T>(path: string) {
    return request<T>(path);
  },
  post<T>(path: string, body?: unknown) {
    return request<T>(path, {
      method: 'POST',
      body: body instanceof FormData ? body : JSON.stringify(body ?? {}),
    });
  },
  put<T>(path: string, body?: unknown) {
    return request<T>(path, {
      method: 'PUT',
      body: body instanceof FormData ? body : JSON.stringify(body ?? {}),
    });
  },
  patch<T>(path: string, body?: unknown) {
    return request<T>(path, {
      method: 'PATCH',
      body: body instanceof FormData ? body : JSON.stringify(body ?? {}),
    });
  },
  delete<T>(path: string) {
    return request<T>(path, { method: 'DELETE' });
  },
};

export const getImageUrl = (url: string | null | undefined) => {
  if (!url) return undefined;
  if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('data:') || url.startsWith('blob:')) {
    return url;
  }
  const rootUrl = import.meta.env.VITE_IMAGE_API_URL || import.meta.env.VITE_API_URL || '';
  return `${rootUrl}${url}`;
};
