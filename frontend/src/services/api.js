import { apiRequest, API_BASE_URL } from './apiClient';

/**
 * Backward compatibility adapter for axios-style `api.get / api.post` calls
 */
const api = {
  get: async (endpoint, options = {}) => {
    const data = await apiRequest(endpoint, { method: 'GET', ...options });
    return { data };
  },
  post: async (endpoint, payload, options = {}) => {
    const data = await apiRequest(endpoint, {
      method: 'POST',
      body: JSON.stringify(payload),
      ...options,
    });
    return { data };
  },
  put: async (endpoint, payload, options = {}) => {
    const data = await apiRequest(endpoint, {
      method: 'PUT',
      body: JSON.stringify(payload),
      ...options,
    });
    return { data };
  },
  delete: async (endpoint, options = {}) => {
    const data = await apiRequest(endpoint, { method: 'DELETE', ...options });
    return { data };
  },
  defaults: {
    baseURL: API_BASE_URL,
  },
};

export default api;
