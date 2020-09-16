import axios from "axios";
import NProgress from "nprogress";

const api = axios.create({ baseURL: "https://ad2020-api.herokuapp.com/" });

api.interceptors.request.use(
  function (config) {
    NProgress.start();
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  function (response) {
    NProgress.done();
    return response;
  },
  function (error) {
    NProgress.done();
    return Promise.reject(error);
  }
);
export default api;
