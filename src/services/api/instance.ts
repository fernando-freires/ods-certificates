import axios from "axios";
import { storage } from "./storage";
import { IInitialRegistration, ILogin } from "@interfaces/index";

const url = import.meta.env.VITE_API_URL;

const axiosClient = axios.create({ baseURL: url });

axiosClient.interceptors.request.use(config => {
  config.headers["Authorization"] = `Bearer ${storage.getToken()}`;
  return config;
});

const login = (payload: ILogin) => {
  const axiosLogin = axios.create({ baseURL: url });
  return axiosLogin.post("/user/signin", payload);
};

const createUser = (payload: IInitialRegistration) => {
  return axiosClient.post("/users", payload);
};

export const client = {
  login,
  createUser,
  delete: axiosClient.delete,
  get: axiosClient.get,
  post: axiosClient.post,
  put: axiosClient.put,
  patch: axiosClient.patch,
};
