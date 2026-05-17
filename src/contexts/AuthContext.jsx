// frontend/src/contexts/AuthContext.jsx
import React, { createContext, useState, useEffect } from 'react';
import API from '../services/Api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Cargar usuario desde localStorage al iniciar
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    if (storedUser && token) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (err) {
        console.error('Error al parsear usuario:', err);
        logout();
      }
    }

    setLoading(false);
  }, []);

  // 🔥 LOGIN CORREGIDO
  const login = async (email, password) => {
    try {
      const res = await API.post('/auth/login', {
        email,
        password,
      });

      const { token, user: userData } = res.data;

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(userData));

      setUser(userData);

      return userData;
    } catch (err) {
      throw err.response?.data?.msg || 'Error al iniciar sesión';
    }
  };

  // 🔥 REGISTER CORREGIDO
  const register = async (name, email, password) => {
    try {
      const res = await API.post('/auth/register', {
        name,
        email,
        password,
        role: 'user',
      });

      const { token, user: userData } = res.data;

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(userData));

      setUser(userData);

      return userData;
    } catch (err) {
      throw err.response?.data?.msg || 'Error al registrarse';
    }
  };

  // Cerrar sesión
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  // Actualizar usuario
  const updateUser = (updatedUser) => {
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
