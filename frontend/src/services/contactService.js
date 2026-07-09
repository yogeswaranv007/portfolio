import api from './api';

export const submitContactForm = async (contactData) => {
  const response = await api.post('/api/contact', contactData);
  return response.data;
};
