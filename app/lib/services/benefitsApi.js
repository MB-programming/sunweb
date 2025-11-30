import Axios from '../Axios';

// Get all benefits
export const getAllBenefits = async (params = {}) => {
  try {
    const response = await Axios.get('/benefits', { params });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Get single benefit by ID
export const getBenefitById = async (id) => {
  try {
    const response = await Axios.get(`/benefits/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Create new benefit
export const createBenefit = async (benefitData) => {
  try {
    const response = await Axios.post('/benefits', benefitData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Update benefit
export const updateBenefit = async (id, benefitData) => {
  try {
    const response = await Axios.put(`/benefits/${id}`, benefitData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Delete benefit
export const deleteBenefit = async (id) => {
  try {
    const response = await Axios.delete(`/benefits/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
