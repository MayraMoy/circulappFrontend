import { useState, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export const useLogin = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [focused, setFocused] = useState(null);

    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        try {
            await login(email, password);
            navigate("/dashboard");
        } catch {
            setError("Error al iniciar sesión. Verifica tus credenciales.");
        } finally {
            setIsLoading(false);
        }
    };

    return {
        showPassword, setShowPassword,
        email, setEmail,
        password, setPassword,
        isLoading,
        error,
        focused, setFocused,
        handleSubmit
    };
};