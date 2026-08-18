/**
 * Centralized API Client for Backend Communication
 * Canonical Env Var: VITE_API_BASE_URL (with graceful fallback to VITE_API_URL or localhost)
 */

const BASE_URL = (
  import.meta.env.VITE_API_BASE_URL ||
  import.meta.env.VITE_API_URL ||
  'http://localhost:8080'
).replace(/\/+$/, '');

// Ensure /api suffix if not already present on base
export const API_BASE_URL = BASE_URL.endsWith('/api') ? BASE_URL : `${BASE_URL}/api`;

const DEFAULT_TIMEOUT_MS = 10000; // 10s timeout to avoid indefinite blocking

/**
 * Get headers including JWT Authorization token if present
 */
export const getAuthHeaders = () => {
  const headers = {
    'Content-Type': 'application/json',
  };
  const token = localStorage.getItem('admin_token');
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
};

/**
 * Fetch wrapper with timeout and error handling
 */
export const apiRequest = async (endpoint, options = {}) => {
  const url = endpoint.startsWith('http') ? endpoint : `${API_BASE_URL}${endpoint.startsWith('/') ? '' : '/'}${endpoint}`;
  const timeoutMs = options.timeout || DEFAULT_TIMEOUT_MS;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        ...getAuthHeaders(),
        ...options.headers,
      },
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      if (response.status === 401) {
        localStorage.removeItem('admin_token');
        if (window.location.pathname.startsWith('/admin') && window.location.pathname !== '/admin/login') {
          window.location.href = '/admin/login';
        }
      }
      const errorText = await response.text().catch(() => 'Network response was not ok');
      throw new Error(errorText || `HTTP ${response.status}`);
    }

    const text = await response.text();
    return text ? JSON.parse(text) : null;
  } catch (error) {
    clearTimeout(timeoutId);
    if (error.name === 'AbortError') {
      throw new Error(`Request timed out after ${timeoutMs}ms`);
    }
    throw error;
  }
};

/**
 * Cache helpers for optional enhancement data
 */
export const cacheHelper = {
  get: (key) => {
    try {
      const item = sessionStorage.getItem(`portfolio_cache_${key}`);
      return item ? JSON.parse(item) : null;
    } catch {
      return null;
    }
  },
  set: (key, data) => {
    try {
      if (data) {
        sessionStorage.setItem(`portfolio_cache_${key}`, JSON.stringify(data));
      }
    } catch {
      // Ignore sessionStorage quota errors
    }
  },
};
