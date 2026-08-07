import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../../../contexts/AuthContext";

export default function useLogin() {
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();

        setIsLoading(true);
        setError("");

        try {
            await login(email, password);
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
        showPassword,
        isLoading,
        error,

        setEmail,
        setPassword,
        setShowPassword,

        handleSubmit,
    };
}