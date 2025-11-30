import api from './api';

// Get all banners
export const getAllBanners = async () => {
  try {
    const response = await api.get('/api/banners');
    return response.data;
  } catch (error) {
    console.error('Error fetching banners:', error);
    throw error;
  }
};

// Get single banner
export const getBannerById = async (id) => {
  try {
    const response = await api.get(`/api/banners/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching banner:', error);
    throw error;
  }
};

// Create banner
export const createBanner = async (bannerData) => {
  try {
    const formData = new FormData();

    // Append all fields to FormData
    Object.keys(bannerData).forEach(key => {
      if (bannerData[key] !== null && bannerData[key] !== undefined) {
        formData.append(key, bannerData[key]);
      }
    });

    const response = await api.post('/api/banners', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error creating banner:', error);
    throw error;
  }
};

// Update banner
export const updateBanner = async (id, bannerData) => {
  try {
    const formData = new FormData();

    // Append all fields to FormData
    Object.keys(bannerData).forEach(key => {
      if (bannerData[key] !== null && bannerData[key] !== undefined) {
        formData.append(key, bannerData[key]);
      }
    });

    // Add _method field for Laravel to recognize PUT request
    formData.append('_method', 'PUT');

    const response = await api.post(`/api/banners/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error updating banner:', error);
    throw error;
  }
};

// Delete banner
export const deleteBanner = async (id) => {
  try {
    const response = await api.delete(`/api/banners/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting banner:', error);
    throw error;
  }
};

// Toggle banner status
export const toggleBannerStatus = async (id) => {
  try {
    const response = await api.patch(`/api/banners/${id}/toggle-status`);
    return response.data;
  } catch (error) {
    console.error('Error toggling banner status:', error);
    throw error;
  }
};
