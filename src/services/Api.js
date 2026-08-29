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
      const publicPaths = ['/login', '/register', '/forgot-password', '/reset-password', '/search', '/items', '/educational', '/'];
      const isPublicRoute = publicPaths.some(p => currentPath === p || (p !== '/' && currentPath.startsWith(p)));

      // Si había un token guardado y no está en una ruta pública
      const hadToken = !!localStorage.getItem('token');
      localStorage.removeItem('token');
      localStorage.removeItem('user');

      if (hadToken && !isPublicRoute) {
        window.location.href = '/login?session_expired=true';
      }
    }

    return Promise.reject(error);
  }
);

export default API;
