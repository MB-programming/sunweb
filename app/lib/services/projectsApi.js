import Axios from '../Axios';

// Get all projects
export const getAllProjects = async (params = {}) => {
  try {
    const response = await Axios.get('/projects', { params });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Get single project by ID
export const getProjectById = async (id) => {
  try {
    const response = await Axios.get(`/projects/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Create new project (with FormData for file uploads)
export const createProject = async (projectData) => {
  try {
    const formData = new FormData();

    // Append all fields to FormData
    Object.keys(projectData).forEach(key => {
      if (key === 'images' && Array.isArray(projectData[key])) {
        // Handle multiple images
        projectData[key].forEach((image, index) => {
          formData.append(`images[${index}]`, image);
        });
      } else if (key === 'seo' && typeof projectData[key] === 'object') {
        // Handle SEO object
        Object.keys(projectData[key]).forEach(seoKey => {
          formData.append(`seo[${seoKey}]`, projectData[key][seoKey]);
        });
      } else {
        formData.append(key, projectData[key]);
      }
    });

    const response = await Axios.post('/projects', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Update project (with FormData for file uploads)
export const updateProject = async (id, projectData) => {
  try {
    const formData = new FormData();

    // Append all fields to FormData
    Object.keys(projectData).forEach(key => {
      if (key === 'images' && Array.isArray(projectData[key])) {
        projectData[key].forEach((image, index) => {
          formData.append(`images[${index}]`, image);
        });
      } else if (key === 'seo' && typeof projectData[key] === 'object') {
        Object.keys(projectData[key]).forEach(seoKey => {
          formData.append(`seo[${seoKey}]`, projectData[key][seoKey]);
        });
      } else {
        formData.append(key, projectData[key]);
      }
    });

    const response = await Axios.post(`/projects/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Delete project
export const deleteProject = async (id) => {
  try {
    const response = await Axios.delete(`/projects/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
