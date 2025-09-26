import { API_BASE, TOKEN_STORAGE_KEY } from '@/lib/config';

export function getToken(): string | null {
  return localStorage.getItem(TOKEN_STORAGE_KEY);
}

export function setToken(token: string) {
  localStorage.setItem(TOKEN_STORAGE_KEY, token);
}

export function clearToken() {
  localStorage.removeItem(TOKEN_STORAGE_KEY);
}

export async function apiFetch(input: string, init: RequestInit = {}) {
  const token = getToken();
  const headers: HeadersInit = {
    ...(init.headers || {}),
  };
  if (token) {
    (headers as Record<string, string>)['Authorization'] = `Bearer ${token}`;
  }
  if (!(headers as Record<string, string>)['Content-Type'] && init.body) {
    (headers as Record<string, string>)['Content-Type'] = 'application/json';
  }
  const res = await fetch(`${API_BASE}${input}`, { ...init, headers });
  if (res.status === 401) {
    // Unauthorized: clear token to force re-login in UI
    clearToken();
  }
  return res;
}
