import Axios from '../Axios';

// Get all users
export const getAllUsers = async (params = {}) => {
  try {
    const response = await Axios.get('/users', { params });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Get single user by ID
export const getUserById = async (id) => {
  try {
    const response = await Axios.get(`/users/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Create new user
export const createUser = async (userData) => {
  try {
    const response = await Axios.post('/users', userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Update user
export const updateUser = async (id, userData) => {
  try {
    const response = await Axios.put(`/users/${id}`, userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Delete user
export const deleteUser = async (id) => {
  try {
    const response = await Axios.delete(`/users/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
