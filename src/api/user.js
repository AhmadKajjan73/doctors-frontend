import { api, mainConfig } from "./client";

const endpoint = "/user";

const registerUserEndPoint = "/register";
const loginUserEndPoint = "/login";
const getCurrentUserEndPoint = "/getCurrentUser";
const logoutUserEndPoint = "/logout";

const config = {
  headers: {
    "content-type": "multipart/form-data",
  },
};

const registerUser = (data) =>
  api.post(endpoint + registerUserEndPoint, data, {
    ...config,
    ...mainConfig,
  });

const logingUser = (data) =>
  api.post(endpoint + loginUserEndPoint, data, { ...config, ...mainConfig });

const logoutUser = () =>
  api.get(endpoint + logoutUserEndPoint, null, { ...mainConfig });

const getCurrentUser = () => api.get(getCurrentUserEndPoint, null, mainConfig);
export default {
  registerUser,
  logingUser,
  logoutUser,
  getCurrentUser,
};
