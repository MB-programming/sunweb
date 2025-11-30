import Axios from '../Axios';

// Get all steps
export const getAllSteps = async (params = {}) => {
  try {
    const response = await Axios.get('/steps', { params });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Get single step by ID
export const getStepById = async (id) => {
  try {
    const response = await Axios.get(`/steps/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Create new step
export const createStep = async (stepData) => {
  try {
    const response = await Axios.post('/steps', stepData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Update step
export const updateStep = async (id, stepData) => {
  try {
    const response = await Axios.put(`/steps/${id}`, stepData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Delete step
export const deleteStep = async (id) => {
  try {
    const response = await Axios.delete(`/steps/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
