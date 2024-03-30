import axios from "axios";

const axiosSetup = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND_URL}/api/`,
  withCredentials: true,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'multipart/form-data'
  }
});

axiosSetup.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token.trim().replace(/^"|"$/g, '')}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

export { axiosSetup };
