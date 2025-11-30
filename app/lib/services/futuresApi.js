import Axios from '../Axios';

// Get all futures
export const getAllFutures = async (params = {}) => {
  try {
    const response = await Axios.get('/futures', { params });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Get single future by ID
export const getFutureById = async (id) => {
  try {
    const response = await Axios.get(`/futures/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Create new future
export const createFuture = async (futureData) => {
  try {
    const response = await Axios.post('/futures', futureData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Update future
export const updateFuture = async (id, futureData) => {
  try {
    const response = await Axios.put(`/futures/${id}`, futureData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Delete future
export const deleteFuture = async (id) => {
  try {
    const response = await Axios.delete(`/futures/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
