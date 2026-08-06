import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthContext from "../../contexts/AuthContext";
import MailIcon from "../icons/MailIcon";
import LockIcon from "../icons/LockIcon";
import EyeIcon from "../icons/EyeIcon";
import ArrowRightIcon from "../icons/ArrowRightIcon";
import styles from "../ui/formStyles";
import AuthLayout from "./components/AuthLayout";

/* ── Componente principal ─────────────────────────────────── */
const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail]               = useState("");
    const [password, setPassword]         = useState("");
    const [isLoading, setIsLoading]       = useState(false);
    const [error, setError]               = useState("");
    const [focused, setFocused]           = useState(null);

    const { login } = useContext(AuthContext);
    const navigate  = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");
        try {
            await login(email, password);
            navigate("/dashboard");
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <AuthLayout 
            title="Bienvenido" 
            subtitle={<>Inicia sesión en <span style={{ color: "var(--primary)", fontWeight: 600 }}>Circulapp</span></>}
            error={error}
        >
            {/* Form */}
            <form style={{ display: "flex", flexDirection: "column", gap: "16px" }} onSubmit={handleSubmit}>

                {/* Email */}
                <div>
                    <label style={{ ...styles.label, display: "block", marginBottom: "6px" }}>
                        Correo electrónico
                    </label>
                    <div style={styles.field(focused, "email")}>
                        <MailIcon />
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="nombre@correo.com"
                            required
                            onFocus={() => setFocused("email")}
                            onBlur={() => setFocused(null)}
                            style={styles.input}
                        />
                    </div>
                </div>

                {/* Contraseña */}
                <div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
                        <label style={styles.label}>Contraseña</label>
                        <Link to="/forgot-password" style={{ fontSize: "12px", color: "var(--primary)", textDecoration: "none" }}>
                            ¿Olvidaste tu contraseña?
                        </Link>
                    </div>
                    <div style={styles.field(focused, "password")}>
                        <LockIcon />
                        <input
                            type={showPassword ? "text" : "password"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            required
                            onFocus={() => setFocused("password")}
                            onBlur={() => setFocused(null)}
                            style={styles.input}
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            style={{
                                background: "none",
                                border: "none",
                                cursor: "pointer",
                                padding: 0,
                                color: "var(--text-secondary)",
                                display: "flex",
                            }}
                        >
                            <EyeIcon open={showPassword} />
                        </button>
                    </div>
                </div>

                {/* Submit */}
                <button
                    type="submit"
                    disabled={isLoading}
                    style={{
                        width: "100%",
                        padding: "12px",
                        background: "linear-gradient(135deg, #2C3E50, var(--primary))",
                        color: "white",
                        border: "none",
                        borderRadius: "12px",
                        fontSize: "14px",
                        fontWeight: 600,
                        cursor: isLoading ? "not-allowed" : "pointer",
                        opacity: isLoading ? 0.7 : 1,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "8px",
                        transition: "opacity 0.2s, transform 0.1s",
                        marginTop: "4px",
                    }}
                    onMouseDown={(e) => { if (!isLoading) e.currentTarget.style.transform = "scale(0.98)"; }}
                    onMouseUp={(e) => { e.currentTarget.style.transform = "scale(1)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.transform = "scale(1)"; }}
                >
                    {isLoading ? (
                        <>
                            <svg width="16" height="16" fill="none" viewBox="0 0 24 24"
                                style={{ animation: "spin 0.8s linear infinite" }}>
                                <circle cx="12" cy="12" r="10" stroke="white"
                                    strokeWidth="3" strokeDasharray="60" strokeDashoffset="40" />
                            </svg>
                            Iniciando sesión...
                        </>
                    ) : (
                        <>
                            Iniciar sesión
                            <ArrowRightIcon />
                        </>
                    )}
                </button>
            </form>

            {/* Footer */}
            <p style={{ textAlign: "center", fontSize: "12px", color: "#ADB5BD", margin: "1.5rem 0 0" }}>
                ¿No tenés cuenta?{" "}
                <Link to="/register" style={{ color: "var(--primary)", fontWeight: 600, textDecoration: "none" }}>
                    Registrate
                </Link>
            </p>
        </AuthLayout>
    );
};

export default Login;