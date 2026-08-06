// Este archivo define el proveedor de contexto de autenticación de la aplicación.
// El proveedor AuthProvider envuelve los componentes de la aplicación y proporciona acceso al contexto de autenticación.
// Maneja el estado del usuario autenticado, el estado de carga y las funciones para iniciar sesión, registrarse, cerrar sesión y 
// actualizar el usuario.

import { useEffect, useState } from "react";
import AuthContext from "./AuthContext";

import { loginUser, registerUser } from "./services/authService";
import {
    saveSession,
    clearSession,
    updateStoredUser,
} from "./services/sessionService";

import initializeAuth from "./utils/initializeAuth";

export default function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const logout = () => {
        clearSession();
        setUser(null);
    };

    useEffect(() => {
        initializeAuth(setUser, setLoading, logout);
    }, []);

    const login = async (email, password) => {
        const data = await loginUser(email, password);

        saveSession(data.token, data.user);

        setUser(data.user);

        return data.user;
    };

    const register = async (name, email, password) => {
        const data = await registerUser(name, email, password);

        saveSession(data.token, data.user);

        setUser(data.user);

        return data.user;
    };

    const updateUser = (updatedUser) => {
        updateStoredUser(updatedUser);
        setUser(updatedUser);
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
}