// Este archivo configura una instancia de Axios para realizar solicitudes HTTP a la API de la aplicación.

import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api',
});

// Interceptor para incluir token
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default API;
