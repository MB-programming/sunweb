import Axios from "../Axios";

// Articles API using futures endpoint
// We'll use futures to store blog posts/articles

// Get all articles
export const getAllArticles = async (params = {}) => {
  try {
    const response = await Axios.get('/futures', { params });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Get article by ID
export const getArticleById = async (id) => {
  try {
    const response = await Axios.get(`/futures/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Create new article
export const createArticle = async (data) => {
  try {
    const response = await Axios.post('/futures', data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Update article
export const updateArticle = async (id, data) => {
  try {
    const response = await Axios.put(`/futures/${id}`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Delete article
export const deleteArticle = async (id) => {
  try {
    const response = await Axios.delete(`/futures/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default {
  getAllArticles,
  getArticleById,
  createArticle,
  updateArticle,
  deleteArticle,
};
