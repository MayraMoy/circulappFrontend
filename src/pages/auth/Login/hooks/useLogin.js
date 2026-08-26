import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../../../contexts/AuthContext";

export default function useLogin() {
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        const savedEmail = localStorage.getItem("remembered_email");
        const savedPassword = localStorage.getItem("remembered_password");
        if (savedEmail) {
            setEmail(savedEmail);
            if (savedPassword) setPassword(savedPassword);
            setRememberMe(true);
        }
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();

        setIsLoading(true);
        setError("");

        try {
            await login(email, password);
            if (rememberMe) {
                localStorage.setItem("remembered_email", email);
                localStorage.setItem("remembered_password", password);
            } else {
                localStorage.removeItem("remembered_email");
                localStorage.removeItem("remembered_password");
            }
            navigate("/dashboard");
        } catch (error) {
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    return {
        email,
        password,
        rememberMe,
        showPassword,
        isLoading,
        error,

        setEmail,
        setPassword,
        setRememberMe,
        setShowPassword,

        handleSubmit,
    };
}