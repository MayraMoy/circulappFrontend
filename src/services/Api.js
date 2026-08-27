// Este archivo configura una instancia de Axios para realizar solicitudes HTTP a la API de la aplicación.

import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
});

// Interceptor para incluir token en peticiones
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Interceptor para capturar expiración de sesión (401) o bloqueo de cuenta (403)
API.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    const msg = error.response?.data?.msg || '';

    // Si el token expiró o la cuenta fue desactivada
    if (status === 401 || (status === 403 && msg.toLowerCase().includes('desactivada'))) {
      const currentPath = window.location.pathname;
      if (currentPath !== '/login' && currentPath !== '/register') {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/login?session_expired=true';
      }
    }

    return Promise.reject(error);
  }
);

export default API;
