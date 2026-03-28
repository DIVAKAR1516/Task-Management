import axios from "axios";

const API = axios.create({
  baseURL: "https://task-management-2-2a87.onrender.com/api/",
});

// 🔐 Attach token automatically
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");

  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;
});

export default API;