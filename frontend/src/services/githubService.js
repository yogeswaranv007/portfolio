import api from './api';

export const githubService = {
  getProfile: async () => {
    const response = await api.get('/api/github/profile');
    return response.data;
  },
  
  getRepositories: async () => {
    const response = await api.get('/api/github/repositories');
    return response.data;
  },

  getPinnedRepositories: async () => {
    const response = await api.get('/api/github/pinned');
    return response.data;
  },

  getStatistics: async () => {
    const response = await api.get('/api/github/statistics');
    return response.data;
  },

  getLanguages: async () => {
    const response = await api.get('/api/github/languages');
    return response.data;
  },

  getActivity: async () => {
    const response = await api.get('/api/github/activity');
    return response.data;
  }
};
