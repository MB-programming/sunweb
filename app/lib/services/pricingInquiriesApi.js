import Axios from "../Axios";

// Pricing Inquiries API using books endpoint
// We'll use books to store pricing inquiry requests

// Get all pricing inquiries
export const getAllPricingInquiries = async (params = {}) => {
  try {
    const response = await Axios.get('/books', { params });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Get pricing inquiry by ID
export const getPricingInquiryById = async (id) => {
  try {
    const response = await Axios.get(`/books/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Create new pricing inquiry
export const createPricingInquiry = async (data) => {
  try {
    const response = await Axios.post('/books', data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Update pricing inquiry status
export const updatePricingInquiry = async (id, data) => {
  try {
    const response = await Axios.put(`/books/${id}`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Delete pricing inquiry
export const deletePricingInquiry = async (id) => {
  try {
    const response = await Axios.delete(`/books/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default {
  getAllPricingInquiries,
  getPricingInquiryById,
  createPricingInquiry,
  updatePricingInquiry,
  deletePricingInquiry,
};
