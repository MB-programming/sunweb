import Axios from '../Axios';

// Get all FAQs
export const getAllFaqs = async (params = {}) => {
  try {
    const response = await Axios.get('/faqs', { params });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Get single FAQ by ID
export const getFaqById = async (id) => {
  try {
    const response = await Axios.get(`/faqs/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Create new FAQ
export const createFaq = async (faqData) => {
  try {
    const response = await Axios.post('/faqs', faqData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Update FAQ
export const updateFaq = async (id, faqData) => {
  try {
    const response = await Axios.put(`/faqs/${id}`, faqData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Delete FAQ
export const deleteFaq = async (id) => {
  try {
    const response = await Axios.delete(`/faqs/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
