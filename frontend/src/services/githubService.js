import { apiRequest, cacheHelper } from './apiClient';

export const githubService = {
  getProfile: async () => {
    try {
      const data = await apiRequest('/github/profile');
      if (data) cacheHelper.set('gh_profile', data);
      return data;
    } catch {
      return cacheHelper.get('gh_profile');
    }
  },
  
  getRepositories: async () => {
    try {
      const data = await apiRequest('/github/repositories');
      if (data) cacheHelper.set('gh_repos', data);
      return data || [];
    } catch {
      return cacheHelper.get('gh_repos') || [];
    }
  },

  getPinnedRepositories: async () => {
    try {
      const data = await apiRequest('/github/pinned');
      if (data) cacheHelper.set('gh_pinned', data);
      return data || [];
    } catch {
      return cacheHelper.get('gh_pinned') || [];
    }
  },

  getStatistics: async () => {
    try {
      const data = await apiRequest('/github/statistics');
      if (data) cacheHelper.set('gh_stats', data);
      return data;
    } catch {
      return cacheHelper.get('gh_stats');
    }
  },

  getLanguages: async () => {
    try {
      const data = await apiRequest('/github/languages');
      if (data) cacheHelper.set('gh_languages', data);
      return data || [];
    } catch {
      return cacheHelper.get('gh_languages') || [];
    }
  },

  getActivity: async () => {
    try {
      const data = await apiRequest('/github/activity');
      if (data) cacheHelper.set('gh_activity', data);
      return data || [];
    } catch {
      return cacheHelper.get('gh_activity') || [];
    }
  }
};
