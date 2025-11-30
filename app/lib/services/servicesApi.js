import Axios from '../Axios';

// Get all services
export const getAllServices = async (params = {}) => {
  try {
    const response = await Axios.get('/services', { params });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Get single service by ID
export const getServiceById = async (id) => {
  try {
    const response = await Axios.get(`/services/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Create new service
export const createService = async (serviceData) => {
  try {
    const response = await Axios.post('/services', serviceData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Update service
export const updateService = async (id, serviceData) => {
  try {
    const response = await Axios.put(`/services/${id}`, serviceData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Delete service
export const deleteService = async (id) => {
  try {
    const response = await Axios.delete(`/services/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
