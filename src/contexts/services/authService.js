// Este archivo contiene funciones para interactuar con la API de autenticación de la aplicación.

import API from "../../services/Api";

export const loginUser = async (email, password) => {
    try {
        const { data } = await API.post("/auth/login", {
            email,
            password,
        });

        return data;
    } catch (error) {
        throw new Error(
            error.response?.data?.msg || "Error al iniciar sesión"
        );
    }
};

export const registerUser = async (name, email, password) => {
    try {
        const { data } = await API.post("/auth/register", {
            name,
            email,
            password,
            role: "user",
        });

        return data;
    } catch (error) {
        throw new Error(
            error.response?.data?.msg || "Error al registrarse"
        );
    }
};