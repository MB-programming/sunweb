import axios from "axios";

const Axios = axios.create({
  baseURL: "https://sunwebsolution.com/api",
  timeout: 10000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  }
});

// Request interceptor to add CSRF token
Axios.interceptors.request.use(
  (config) => {
    // Get CSRF token from cookie
    const token = getCookie('XSRF-TOKEN');
    if (token) {
      config.headers['X-XSRF-TOKEN'] = decodeURIComponent(token);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
Axios.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error?.response?.data || error.message);

    if (error?.response?.status === 401) {
      // Handle unauthorized access
      console.error("Unauthorized access - please login");
    }

    if (error?.response?.status === 422) {
      // Handle validation errors
      console.error("Validation errors:", error.response.data);
    }

    return Promise.reject(error);
  }
);

// Helper function to get cookie
function getCookie(name) {
  if (typeof window === 'undefined') return null;

  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
  return null;
}

export default Axios;
