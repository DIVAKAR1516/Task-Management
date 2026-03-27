import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:8000/api/", // change after deployment
});

export default API;