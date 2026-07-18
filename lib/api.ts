const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000/api";

export class ApiError extends Error {
  status: number;
  code?: string;

  constructor(message: string, status: number, code?: string) {
    super(message);
    this.status = status;
    this.code = code;
  }
}

interface Envelope<T> {
  success: boolean;
  data?: T;
  message?: string;
  code?: string;
}

let refreshPromise: Promise<void> | null = null;

function rawFetch(path: string, options: RequestInit = {}): Promise<Response> {
  // Skip the default JSON header for FormData bodies — the browser needs to set
  // its own Content-Type with the multipart boundary.
  const isFormData = typeof FormData !== "undefined" && options.body instanceof FormData;

  return fetch(`${API_URL}${path}`, {
    ...options,
    credentials: "include",
    headers: {
      ...(isFormData ? {} : { "Content-Type": "application/json" }),
      ...options.headers,
    },
  });
}

function refreshAccessToken(): Promise<void> {
  if (!refreshPromise) {
    refreshPromise = rawFetch("/auth/refresh", { method: "POST" })
      .then((res) => {
        if (!res.ok) throw new Error("Refresh failed");
      })
      .finally(() => {
        refreshPromise = null;
      });
  }
  return refreshPromise;
}

async function parseResponse<T>(res: Response): Promise<T> {
  if (res.status === 204) return undefined as T;

  const body: Envelope<T> = await res.json();
  if (!body.success) {
    throw new ApiError(body.message ?? "Request failed", res.status, body.code);
  }
  return body.data as T;
}

export async function apiFetch<T>(path: string, options: RequestInit = {}): Promise<T> {
  const res = await rawFetch(path, options);

  if (res.status === 401 && path !== "/auth/refresh") {
    try {
      await refreshAccessToken();
    } catch {
      const body: Envelope<T> = await res.json().catch(() => ({ success: false }));
      throw new ApiError(body.message ?? "Unauthorized", 401, body.code);
    }
    const retryRes = await rawFetch(path, options);
    return parseResponse<T>(retryRes);
  }

  return parseResponse<T>(res);
}
