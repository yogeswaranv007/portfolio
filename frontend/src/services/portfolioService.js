const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

const getHeaders = () => {
    const headers = {
        'Content-Type': 'application/json',
    };
    const token = localStorage.getItem('admin_token');
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }
    return headers;
};

const handleResponse = async (response) => {
    if (!response.ok) {
        if (response.status === 401) {
            localStorage.removeItem('admin_token');
            window.location.href = '/admin/login';
        }
        const error = await response.text();
        throw new Error(error);
    }
    const text = await response.text();
    return text ? JSON.parse(text) : null;
};

export const portfolioService = {
  // --- Profile ---
  getProfile: async () => {
      const response = await fetch(`${API_URL}/portfolio/profile`);
      return handleResponse(response);
  },
  updateProfile: async (profileData) => {
      const response = await fetch(`${API_URL}/admin/portfolio/profile`, {
          method: 'PUT',
          headers: getHeaders(),
          body: JSON.stringify(profileData),
      });
      return handleResponse(response);
  },

  // --- Projects ---
  getProjects: async () => {
      const response = await fetch(`${API_URL}/portfolio/projects`);
      return handleResponse(response);
  },
  getProjectById: async (id) => {
      const response = await fetch(`${API_URL}/portfolio/projects/${id}`);
      return handleResponse(response);
  },
  saveProject: async (projectData) => {
      const isNew = !projectData.id;
      const url = isNew ? `${API_URL}/admin/portfolio/projects` : `${API_URL}/admin/portfolio/projects/${projectData.id}`;
      const method = isNew ? 'POST' : 'PUT';
      
      const response = await fetch(url, {
          method,
          headers: getHeaders(),
          body: JSON.stringify({
            ...projectData,
            id: isNew ? `proj-${Date.now()}` : projectData.id
          }),
      });
      return handleResponse(response);
  },
  deleteProject: async (id) => {
      const response = await fetch(`${API_URL}/admin/portfolio/projects/${id}`, {
          method: 'DELETE',
          headers: getHeaders()
      });
      return handleResponse(response);
  },

  // --- Skills ---
  getSkills: async () => {
      const response = await fetch(`${API_URL}/portfolio/skills`);
      return handleResponse(response);
  },
  saveSkill: async (skillData) => {
      const isNew = !skillData.id || String(skillData.id).startsWith('skill-');
      const url = isNew ? `${API_URL}/admin/portfolio/skills` : `${API_URL}/admin/portfolio/skills/${skillData.id}`;
      const method = isNew ? 'POST' : 'PUT';
      
      const payload = { ...skillData };
      if (isNew) delete payload.id; // DB auto-generates ID

      const response = await fetch(url, {
          method,
          headers: getHeaders(),
          body: JSON.stringify(payload),
      });
      return handleResponse(response);
  },
  deleteSkill: async (id) => {
      const response = await fetch(`${API_URL}/admin/portfolio/skills/${id}`, {
          method: 'DELETE',
          headers: getHeaders()
      });
      return handleResponse(response);
  },

  // --- Achievements ---
  getAchievements: async () => {
      const response = await fetch(`${API_URL}/portfolio/achievements`);
      return handleResponse(response);
  },
  saveAchievement: async (achievementData) => {
      const isNew = !achievementData.id || String(achievementData.id).startsWith('ach-');
      const url = isNew ? `${API_URL}/admin/portfolio/achievements` : `${API_URL}/admin/portfolio/achievements/${achievementData.id}`;
      const method = isNew ? 'POST' : 'PUT';
      
      const payload = { ...achievementData };
      if (isNew) delete payload.id;

      const response = await fetch(url, {
          method,
          headers: getHeaders(),
          body: JSON.stringify(payload),
      });
      return handleResponse(response);
  },
  deleteAchievement: async (id) => {
      const response = await fetch(`${API_URL}/admin/portfolio/achievements/${id}`, {
          method: 'DELETE',
          headers: getHeaders()
      });
      return handleResponse(response);
  },
  resetAchievements: async () => {
      // Just fetch it again, no local reset
      return portfolioService.getAchievements();
  },

  // --- Coding Profiles ---
  getCodingProfiles: async () => {
      const response = await fetch(`${API_URL}/portfolio/coding-profiles`);
      return handleResponse(response);
  },
  saveCodingProfile: async (profileData) => {
      const isNew = !profileData.id;
      const url = isNew ? `${API_URL}/admin/portfolio/coding-profiles` : `${API_URL}/admin/portfolio/coding-profiles/${profileData.id}`;
      const method = isNew ? 'POST' : 'PUT';
      
      const payload = { ...profileData };
      if (isNew) delete payload.id;

      const response = await fetch(url, {
          method,
          headers: getHeaders(),
          body: JSON.stringify(payload),
      });
      return handleResponse(response);
  },
  deleteCodingProfile: async (id) => {
      const response = await fetch(`${API_URL}/admin/portfolio/coding-profiles/${id}`, {
          method: 'DELETE',
          headers: getHeaders()
      });
      return handleResponse(response);
  },

  // --- Messages ---
  getMessages: async () => {
      const response = await fetch(`${API_URL}/admin/messages`, { headers: getHeaders() });
      return handleResponse(response);
  },
  sendMessage: async (messageData) => {
      const response = await fetch(`${API_URL}/contact`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(messageData),
      });
      return handleResponse(response);
  },
  markMessageRead: async (id) => {
      const response = await fetch(`${API_URL}/admin/messages/${id}/read`, {
          method: 'PUT',
          headers: getHeaders(),
      });
      return handleResponse(response);
  },
  deleteMessage: async (id) => {
      const response = await fetch(`${API_URL}/admin/messages/${id}`, {
          method: 'DELETE',
          headers: getHeaders(),
      });
      return handleResponse(response);
  }
};

export const authService = {
    login: async (email, password) => {
        const response = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });
        const data = await handleResponse(response);
        if (data.token) {
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
    }
};
