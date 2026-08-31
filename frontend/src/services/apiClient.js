/**
 * Centralized API Client for Backend Communication
 * Auto-detects production backend URL when deployed to Vercel/production
 */

const getBaseUrl = () => {
  if (import.meta.env.VITE_API_BASE_URL) {
    return import.meta.env.VITE_API_BASE_URL;
  }
  if (import.meta.env.VITE_API_URL && !import.meta.env.VITE_API_URL.includes('localhost')) {
    return import.meta.env.VITE_API_URL;
  }
  // If running in browser and NOT on localhost/127.0.0.1, default to live production Render backend
  if (typeof window !== 'undefined' && window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1') {
    return 'https://portfolio-yogeswaran-v-2005.onrender.com/api';
  }
  return import.meta.env.VITE_API_URL || 'http://localhost:8080/api';
};

const rawBase = getBaseUrl().replace(/\/+$/, '');

// Normalizes HOST_URL (without /api) and API_BASE_URL (with exactly one /api)
export const HOST_URL = rawBase.replace(/\/api$/, '');
export const API_BASE_URL = `${HOST_URL}/api`;

const DEFAULT_TIMEOUT_MS = 15000; // 15s timeout to allow Render cold start

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
 * Fetch wrapper with URL normalization, timeout and error handling
 */
export const apiRequest = async (endpoint, options = {}) => {
  let url;
  if (endpoint.startsWith('http://') || endpoint.startsWith('https://')) {
    url = endpoint;
  } else {
    let cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
    // Strip accidental leading /api if passed (prevents /api/api/...)
    if (cleanEndpoint.startsWith('/api/')) {
      cleanEndpoint = cleanEndpoint.replace(/^\/api/, '');
    }
    url = `${API_BASE_URL}${cleanEndpoint}`;
  }

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
      let errorMessage;
      try {
        const errorJson = JSON.parse(errorText);
        errorMessage = errorJson.message || errorJson.error || errorText;
      } catch {
        errorMessage = errorText;
      }
      throw new Error(errorMessage || `HTTP ${response.status}`);
    }

    const text = await response.text();
    return text ? JSON.parse(text) : null;
  } catch (error) {
    clearTimeout(timeoutId);
    if (error.name === 'AbortError') {
      throw new Error(`Request timed out after ${timeoutMs}ms (Backend may be waking up)`);
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
