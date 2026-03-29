import axios from "axios";

// Determine base URL based on environment
const getBaseURL = () => {
  if (process.env.NODE_ENV === 'development') {
    return "http://localhost:8000/api/";
  }
  // Production - replace with your deployed backend URL
  return "https://your-backend-url.herokuapp.com/api/";
};

const API = axios.create({
  baseURL: getBaseURL(),
});

// Attach token automatically
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");

  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;
});

// Handle token expiration
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default API;