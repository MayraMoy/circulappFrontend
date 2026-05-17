import { useState, useEffect } from "react";
import API from "../services/Api";
import { AuthContext } from "./AuthContext";

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setUser(null);
    };

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        const token = localStorage.getItem("token");

        if (storedUser && token) {
            try {
                const parsedUser = JSON.parse(storedUser);
                setUser(parsedUser);
            } catch (err) {
                console.error("Error al parsear usuario:", err);
                logout();
            }
        }

        setLoading(false);
    }, []);

    const login = async (email, password) => {
        const res = await API.post("/auth/login", { email, password });
        const { token, user: userData } = res.data;

        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(userData));
        setUser(userData);
    };

    const register = async (name, email, password) => {
        const res = await API.post("/auth/register", {
            name,
            email,
            password,
            role: "user"
        });

        const { token, user: userData } = res.data;

        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(userData));
        setUser(userData);
    };

    const updateUser = (updatedUser) => {
        setUser(updatedUser);
        localStorage.setItem("user", JSON.stringify(updatedUser));
    };

    return (
        <AuthContext.Provider value={{
            user,
            loading,
            login,
            register,
            logout,
            updateUser
        }}>
            {children}
        </AuthContext.Provider>
    );
};