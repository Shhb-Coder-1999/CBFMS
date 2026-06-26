import axios from "axios";

const baseURL = "http://192.168.137.188:3000";
// const baseURL = "http://87.236.166.45:3000";

export const login = ({ username, password }) => {
  return axios({
    method: "POST",
    baseURL,
    url: "/auth/login",
    headers: { "User-Agent": "request" },
    data: {
      username,
      password,
    },
  });
};

export const forgetPassword = (username) => {
  return axios({
    method: "POST",
    baseURL,
    url: "/auth/forgetPassword",
    data: {
      username,
    },
  });
};

export const resetPassword = (password, tmpPassword, resetPasswordToken) => {
  return axios({
    method: "POST",
    baseURL,
    url: "/auth/resetPassword",
    data: {
      password,
      tmpPassword,
      resetPasswordToken,
    },
  });
};

export const signup = ({ username, password, confirmation }) => {
  return axios({
    method: "POST",
    baseURL,
    url: "/auth/signup",
    headers: { "User-Agent": "request" },
    data: {
      username,
      password,
      confirmation,
    },
  });
};

export const getAllUsers = () => {
  return axios({
    method: "GET",
    baseURL,
    url: "/users",
    headers: { "User-Agent": "request" },
  });
};

export const removeUser = (username) => {
  return axios({
    method: "DELETE",
    baseURL,
    url: `/users/${username}`,
    headers: { "User-Agent": "request" },
  });
};

export const getAllAlgos = () => {
  return axios({
    method: "GET",
    baseURL,
    url: `/users/algorithms/`,
    headers: { "User-Agent": "request" },
  });
};
