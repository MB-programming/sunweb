import Axios from '../Axios';

// Get all clients
export const getAllClients = async (params = {}) => {
  try {
    const response = await Axios.get('/clients', { params });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Get single client by ID
export const getClientById = async (id) => {
  try {
    const response = await Axios.get(`/clients/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Create new client
export const createClient = async (clientData) => {
  try {
    const response = await Axios.post('/clients', clientData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Update client
export const updateClient = async (id, clientData) => {
  try {
    const response = await Axios.put(`/clients/${id}`, clientData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Delete client
export const deleteClient = async (id) => {
  try {
    const response = await Axios.delete(`/clients/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
