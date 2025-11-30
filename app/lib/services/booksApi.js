import Axios from '../Axios';

// Get all bookings
export const getAllBookings = async (params = {}) => {
  try {
    const response = await Axios.get('/books', { params });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Get single booking by ID
export const getBookingById = async (id) => {
  try {
    const response = await Axios.get(`/books/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Create new booking
export const createBooking = async (bookingData) => {
  try {
    const response = await Axios.post('/books', bookingData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Update booking
export const updateBooking = async (id, bookingData) => {
  try {
    const response = await Axios.put(`/books/${id}`, bookingData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Delete booking
export const deleteBooking = async (id) => {
  try {
    const response = await Axios.delete(`/books/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
