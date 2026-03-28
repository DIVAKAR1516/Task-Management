import API from "./api";

// 🔐 Signup
export const signupUser = (data) => {
  return API.post("signup/", data);
};

// 🔐 Login
export const loginUser = (data) => {
  return API.post("login/", data);
};