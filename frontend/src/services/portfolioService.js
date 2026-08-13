import defaultProfile from '../data/profile.json';
import defaultProjects from '../data/projects.json';
import defaultSkills from '../data/skills.json';
import defaultAchievements from '../data/achievements.json';
import defaultCodingProfiles from '../data/codingProfiles.json';

const STORAGE_KEYS = {
  PROFILE: 'portfolio_profile',
  PROJECTS: 'portfolio_projects',
  SKILLS: 'portfolio_skills',
  ACHIEVEMENTS: 'portfolio_achievements',
  CODING_PROFILES: 'portfolio_coding_profiles',
  MESSAGES: 'portfolio_messages'
};

const hydrateWithIds = (data, prefix) => {
  if (Array.isArray(data)) {
    return data.map((item, i) => item.id ? item : { ...item, id: `${prefix}-${i}` });
  }
  return data;
};

const getFromStorage = (key, defaultData, prefix = 'item') => {
  try {
    const data = localStorage.getItem(key);
    if (!data) return hydrateWithIds(defaultData, prefix);
    
    const parsed = JSON.parse(data);
    return hydrateWithIds(parsed, prefix);
  } catch (e) {
    console.error(`Error reading ${key} from localStorage`, e);
    return hydrateWithIds(defaultData, prefix);
  }
};

const saveToStorage = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (e) {
    console.error(`Error saving ${key} to localStorage`, e);
  }
};

export const portfolioService = {
  // --- Profile ---
  getProfile: async () => {
    return getFromStorage(STORAGE_KEYS.PROFILE, defaultProfile);
  },
  updateProfile: async (profileData) => {
    saveToStorage(STORAGE_KEYS.PROFILE, profileData);
    return profileData;
  },

  // --- Projects ---
  getProjects: async () => {
    return getFromStorage(STORAGE_KEYS.PROJECTS, defaultProjects);
  },
  getProjectById: async (id) => {
    const projects = getFromStorage(STORAGE_KEYS.PROJECTS, defaultProjects);
    return projects.find(p => p.id === id);
  },
  saveProject: async (projectData) => {
    const projects = getFromStorage(STORAGE_KEYS.PROJECTS, defaultProjects);
    const index = projects.findIndex(p => p.id === projectData.id);
    if (index >= 0) {
      projects[index] = projectData;
    } else {
      projects.push({ ...projectData, id: projectData.id || `proj-${Date.now()}` });
    }
    saveToStorage(STORAGE_KEYS.PROJECTS, projects);
    return projects;
  },
  deleteProject: async (id) => {
    const projects = getFromStorage(STORAGE_KEYS.PROJECTS, defaultProjects);
    const updated = projects.filter(p => p.id !== id);
    saveToStorage(STORAGE_KEYS.PROJECTS, updated);
    return updated;
  },

  // --- Skills ---
  getSkills: async () => {
    const data = getFromStorage(STORAGE_KEYS.SKILLS, defaultSkills);
    // Migration check: if the data in localStorage is an object (old format) instead of an array,
    // reset it to the new defaultSkills array.
    if (!Array.isArray(data)) {
      console.warn("Detected old skills data format in localStorage. Resetting to default array format.");
      saveToStorage(STORAGE_KEYS.SKILLS, defaultSkills);
      return defaultSkills;
    }
    return data;
  },
  saveSkill: async (skillData) => {
    const skills = getFromStorage(STORAGE_KEYS.SKILLS, defaultSkills);
    const index = skills.findIndex(s => s.id === skillData.id);
    if (index >= 0) {
      skills[index] = skillData;
    } else {
      skills.push({ ...skillData, id: skillData.id || `skill-${Date.now()}` });
    }
    saveToStorage(STORAGE_KEYS.SKILLS, skills);
    return skills;
  },
  deleteSkill: async (id) => {
    const skills = getFromStorage(STORAGE_KEYS.SKILLS, defaultSkills);
    const updated = skills.filter(s => s.id !== id);
    saveToStorage(STORAGE_KEYS.SKILLS, updated);
    return updated;
  },

  // --- Achievements ---
  getAchievements: async () => {
    return getFromStorage(STORAGE_KEYS.ACHIEVEMENTS, defaultAchievements);
  },
  saveAchievement: async (achievementData) => {
    const achievements = getFromStorage(STORAGE_KEYS.ACHIEVEMENTS, defaultAchievements);
    const index = achievements.findIndex(a => a.id === achievementData.id);
    if (index >= 0) {
      achievements[index] = achievementData;
    } else {
      achievements.push({ ...achievementData, id: achievementData.id || `ach-${Date.now()}` });
    }
    saveToStorage(STORAGE_KEYS.ACHIEVEMENTS, achievements);
    return achievements;
  },
  deleteAchievement: async (id) => {
    const achievements = getFromStorage(STORAGE_KEYS.ACHIEVEMENTS, defaultAchievements);
    const updated = achievements.filter(a => a.id !== id);
    saveToStorage(STORAGE_KEYS.ACHIEVEMENTS, updated);
    return updated;
  },
  resetAchievements: async () => {
    localStorage.removeItem(STORAGE_KEYS.ACHIEVEMENTS);
    return getFromStorage(STORAGE_KEYS.ACHIEVEMENTS, defaultAchievements);
  },

  // --- Coding Profiles ---
  getCodingProfiles: async () => {
    return getFromStorage(STORAGE_KEYS.CODING_PROFILES, defaultCodingProfiles);
  },

  // --- Messages ---
  getMessages: async () => {
    return getFromStorage(STORAGE_KEYS.MESSAGES, []);
  },
  sendMessage: async (messageData) => {
    const messages = getFromStorage(STORAGE_KEYS.MESSAGES, []);
    const newMessage = { ...messageData, id: `msg-${Date.now()}`, date: new Date().toISOString(), read: false };
    messages.push(newMessage);
    saveToStorage(STORAGE_KEYS.MESSAGES, messages);
    return newMessage;
  },
  markMessageRead: async (id) => {
    const messages = getFromStorage(STORAGE_KEYS.MESSAGES, []);
    const msg = messages.find(m => m.id === id);
    if (msg) msg.read = true;
    saveToStorage(STORAGE_KEYS.MESSAGES, messages);
    return messages;
  },
  deleteMessage: async (id) => {
    const messages = getFromStorage(STORAGE_KEYS.MESSAGES, []);
    const updated = messages.filter(m => m.id !== id);
    saveToStorage(STORAGE_KEYS.MESSAGES, updated);
    return updated;
  }
};
