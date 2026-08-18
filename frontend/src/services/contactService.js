import { apiRequest } from './apiClient';

export const submitContactForm = async (contactData) => {
  return apiRequest('/contact', {
    method: 'POST',
    body: JSON.stringify(contactData),
  });
};
