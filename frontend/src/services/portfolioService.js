import { apiRequest, cacheHelper } from './apiClient';

// Local Static Fallbacks (Source of truth for instant, zero-delay rendering)
import profileFallback from '../data/profile.json';
import projectsFallback from '../data/projects.json';
import skillsFallback from '../data/skills.json';
import achievementsFallback from '../data/achievements.json';
import codingProfilesFallback from '../data/codingProfiles.json';

export const portfolioService = {
  // ==========================================
  // Synchronous Local Fallbacks (Instant Load)
  // ==========================================
  getLocalProfile: () => cacheHelper.get('profile') || profileFallback,
  getLocalProjects: () => cacheHelper.get('projects') || projectsFallback,
  getLocalProjectById: (id) => {
    const cachedProjects = cacheHelper.get('projects') || projectsFallback;
    return cachedProjects.find(p => String(p.id) === String(id)) || null;
  },
  getLocalSkills: () => cacheHelper.get('skills') || skillsFallback,
  getLocalAchievements: () => cacheHelper.get('achievements') || achievementsFallback,
  getLocalCodingProfiles: () => cacheHelper.get('coding_profiles') || codingProfilesFallback,

  // ==========================================
  // Asynchronous Fetchers (With Graceful Fallback)
  // ==========================================
  getProfile: async () => {
    try {
      const data = await apiRequest('/portfolio/profile');
      if (data && data.name) {
        cacheHelper.set('profile', data);
        return data;
      }
    } catch {
      // Backend offline or sleeping: gracefully retain local/cached data
    }
    return cacheHelper.get('profile') || profileFallback;
  },

  getProjects: async () => {
    try {
      const data = await apiRequest('/portfolio/projects');
      if (Array.isArray(data) && data.length > 0) {
        cacheHelper.set('projects', data);
        return data;
      }
    } catch {
      // Backend offline
    }
    return cacheHelper.get('projects') || projectsFallback;
  },

  getProjectById: async (id) => {
    try {
      const data = await apiRequest(`/portfolio/projects/${id}`);
      if (data && data.title) {
        return data;
      }
    } catch {
      // Fall back to local project matching id
    }
    const projects = cacheHelper.get('projects') || projectsFallback;
    return projects.find(p => String(p.id) === String(id)) || null;
  },

  getSkills: async () => {
    try {
      const data = await apiRequest('/portfolio/skills');
      if (Array.isArray(data) && data.length > 0) {
        cacheHelper.set('skills', data);
        return data;
      }
    } catch {
      // Backend offline
    }
    return cacheHelper.get('skills') || skillsFallback;
  },

  getAchievements: async () => {
    try {
      const data = await apiRequest('/portfolio/achievements');
      if (Array.isArray(data) && data.length > 0) {
        cacheHelper.set('achievements', data);
        return data;
      }
    } catch {
      // Backend offline
    }
    return cacheHelper.get('achievements') || achievementsFallback;
  },

  getCodingProfiles: async () => {
    try {
      const data = await apiRequest('/portfolio/coding-profiles');
      if (Array.isArray(data) && data.length > 0) {
        cacheHelper.set('coding_profiles', data);
        return data;
      }
    } catch {
      // Backend offline
    }
    return cacheHelper.get('coding_profiles') || codingProfilesFallback;
  },

  // ==========================================
  // Admin CMS Operations (Protected by JWT)
  // ==========================================
  updateProfile: async (profileData) => {
    const data = await apiRequest('/admin/portfolio/profile', {
      method: 'PUT',
      body: JSON.stringify(profileData),
    });
    cacheHelper.set('profile', data);
    return data;
  },

  saveProject: async (projectData) => {
    const isNew = !projectData.id;
    const endpoint = isNew ? '/admin/portfolio/projects' : `/admin/portfolio/projects/${projectData.id}`;
    const method = isNew ? 'POST' : 'PUT';
    
    return apiRequest(endpoint, {
      method,
      body: JSON.stringify({
        ...projectData,
        id: isNew ? `proj-${Date.now()}` : projectData.id,
      }),
    });
  },

  deleteProject: async (id) => {
    return apiRequest(`/admin/portfolio/projects/${id}`, {
      method: 'DELETE',
    });
  },

  saveSkill: async (skillData) => {
    const isNew = !skillData.id || String(skillData.id).startsWith('skill-');
    const endpoint = isNew ? '/admin/portfolio/skills' : `/admin/portfolio/skills/${skillData.id}`;
    const method = isNew ? 'POST' : 'PUT';

    const payload = { ...skillData };
    if (isNew) delete payload.id;

    return apiRequest(endpoint, {
      method,
      body: JSON.stringify(payload),
    });
  },

  deleteSkill: async (id) => {
    return apiRequest(`/admin/portfolio/skills/${id}`, {
      method: 'DELETE',
    });
  },

  saveAchievement: async (achievementData) => {
    const isNew = !achievementData.id || String(achievementData.id).startsWith('ach-');
    const endpoint = isNew ? '/admin/portfolio/achievements' : `/admin/portfolio/achievements/${achievementData.id}`;
    const method = isNew ? 'POST' : 'PUT';

    const payload = { ...achievementData };
    if (isNew) delete payload.id;

    return apiRequest(endpoint, {
      method,
      body: JSON.stringify(payload),
    });
  },

  deleteAchievement: async (id) => {
    return apiRequest(`/admin/portfolio/achievements/${id}`, {
      method: 'DELETE',
    });
  },

  saveCodingProfile: async (profileData) => {
    const isNew = !profileData.id;
    const endpoint = isNew ? '/admin/portfolio/coding-profiles' : `/admin/portfolio/coding-profiles/${profileData.id}`;
    const method = isNew ? 'POST' : 'PUT';

    const payload = { ...profileData };
    if (isNew) delete payload.id;

    return apiRequest(endpoint, {
      method,
      body: JSON.stringify(payload),
    });
  },

  deleteCodingProfile: async (id) => {
    return apiRequest(`/admin/portfolio/coding-profiles/${id}`, {
      method: 'DELETE',
    });
  },

  // ==========================================
  // Messages & Contact
  // ==========================================
  getMessages: async () => {
    return apiRequest('/admin/messages');
  },

  sendMessage: async (messageData) => {
    return apiRequest('/contact', {
      method: 'POST',
      body: JSON.stringify(messageData),
    });
  },

  markMessageRead: async (id) => {
    return apiRequest(`/admin/messages/${id}/read`, {
      method: 'PUT',
    });
  },

  deleteMessage: async (id) => {
    return apiRequest(`/admin/messages/${id}`, {
      method: 'DELETE',
    });
  },
};

export const authService = {
  login: async (email, password) => {
    const data = await apiRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    if (data?.token) {
      localStorage.setItem('admin_token', data.token);
    }
    return data;
  },
  logout: () => {
    localStorage.removeItem('admin_token');
    window.location.href = '/admin/login';
  },
  isAuthenticated: () => {
    return !!localStorage.getItem('admin_token');
  },
};
