import axios from "axios";

const API = axios.create({
  baseURL: "https://task-management-2-2a87.onrender.com/api/",
  //baseURL: "http://127.0.0.1:8000/api/", // change after deployment
});

export default API;