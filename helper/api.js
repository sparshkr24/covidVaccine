import axios from 'axios';

const api = axios.create({
  baseURL: 'https://covid-vaccine-nine.vercel.app/api',
});

export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common['Authorization'];
  }
};

export default api;
