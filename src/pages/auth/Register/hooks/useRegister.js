import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../../../contexts/AuthContext";

export default function useRegister() {
    const { register } = useContext(AuthContext);
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();

        setError("");

        if (password !== confirmPassword) {
            setError("Las contraseñas no coinciden.");
            return;
        }

        setIsLoading(true);

        try {
            await register(name, email, password);
            navigate("/dashboard");
        } catch (error) {
            setError(
                error.message || "Error al registrarse."
            );
        } finally {
            setIsLoading(false);
        }
    };

    return {
        name,
        email,
        password,
        confirmPassword,

        showPassword,
        showConfirmPassword,

        isLoading,
        error,

        setName,
        setEmail,
        setPassword,
        setConfirmPassword,

        setShowPassword,
        setShowConfirmPassword,

        handleSubmit,
    };
}