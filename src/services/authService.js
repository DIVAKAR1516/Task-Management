import API from "./api";

// 🔐 Signup
export const signupUser = (data) => {
  return API.post("auth/signup/", data);
};

// 🔐 Login
export const loginUser = (data) => {
  return API.post("auth/login/", data);
};

// 🔐 Logout
export const logoutUser = (refreshToken) => {
  return API.post("auth/logout/", { refresh_token: refreshToken });
};

// 🔐 Get Current User
export const getCurrentUser = () => {
  return API.get("auth/me/");
};