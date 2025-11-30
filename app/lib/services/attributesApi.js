import Axios from '../Axios';

// Get all attributes
export const getAllAttributes = async (params = {}) => {
  try {
    const response = await Axios.get('/attributes', { params });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Get single attribute by ID
export const getAttributeById = async (id) => {
  try {
    const response = await Axios.get(`/attributes/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Create new attribute
export const createAttribute = async (attributeData) => {
  try {
    const response = await Axios.post('/attributes', attributeData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Update attribute
export const updateAttribute = async (id, attributeData) => {
  try {
    const response = await Axios.put(`/attributes/${id}`, attributeData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Delete attribute
export const deleteAttribute = async (id) => {
  try {
    const response = await Axios.delete(`/attributes/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
