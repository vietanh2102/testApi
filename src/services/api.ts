import axios from "axios";
const instance = axios.create({
  baseURL: "http://localhost:3000/660/",
  headers: {
    "Content-Type": "application/json",
  },
});

export const publicInstance = axios.create({
  baseURL: "http://localhost:3000/",
  headers: {
    "Content-Type": "application/json",
  },
});
instance.interceptors.request.use(
  function (config) {
    config.headers["Authorization"] = "Bearer " + localStorage.getItem("token");
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error.status === 401) {
      window.location.href = "/";
    }
    return Promise.reject(error);
  }
);

export default instance;
