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

    // Estado del Modal de Autenticación / Invitado
    const [authModalOpen, setAuthModalOpen] = useState(false);
    const [authModalTab, setAuthModalTab] = useState("login"); // 'login' | 'register'
    const [authModalPrompt, setAuthModalPrompt] = useState("");

    const logout = () => {
        clearSession();
        setUser(null);
    };

    useEffect(() => {
        initializeAuth((userData) => {
            setUser(userData);
            // Si no hay usuario y no ha elegido continuar como invitado, mostrar modal inicial
            if (!userData && sessionStorage.getItem("circulapp_guest_mode") !== "true") {
                setAuthModalOpen(true);
            }
        }, setLoading, logout);
    }, []);

    const openAuthModal = (tab = "login", prompt = "") => {
        setAuthModalTab(tab);
        setAuthModalPrompt(prompt);
        setAuthModalOpen(true);
    };

    const closeAuthModal = () => {
        setAuthModalOpen(false);
        setAuthModalPrompt("");
    };

    const continueAsGuest = () => {
        sessionStorage.setItem("circulapp_guest_mode", "true");
        setAuthModalOpen(false);
        setAuthModalPrompt("");
    };

    const login = async (email, password) => {
        const data = await loginUser(email, password);

        saveSession(data.token, data.user);

        setUser(data.user);
        setAuthModalOpen(false);

        return data.user;
    };

    const register = async (name, email, password) => {
        const data = await registerUser(name, email, password);

        saveSession(data.token, data.user);

        setUser(data.user);
        setAuthModalOpen(false);

        return data.user;
    };

    const updateUser = (updatedUser) => {
        updateStoredUser(updatedUser);
        setUser(updatedUser);
    };

    const switchRole = (newRole) => {
        if (!user) return;
        const updated = { ...user, role: newRole };
        updateStoredUser(updated);
        setUser(updated);
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                isGuest: !user,
                loading,
                authModalOpen,
                authModalTab,
                authModalPrompt,
                openAuthModal,
                closeAuthModal,
                continueAsGuest,
                login,
                register,
                logout,
                updateUser,
                switchRole,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}