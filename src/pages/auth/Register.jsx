import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import AuthLayout from "./components/AuthLayout";
import UserIcon from "./components/icons/UserIcon";
import MailIcon from "./components/icons/MailIcon";
import LockIcon from "./components/icons/LockIcon";
import ShieldIcon from "./components/icons/ShieldIcon";
import EyeIcon from "./components/icons/EyeIcon";
import PasswordStrength from "./components/PasswordStrength";
import styles from "./components/ui/formStyles";

/* ── Componente principal ────────────────────────────────── */
const Register = () => {
    const [form, setForm]           = useState({ name: "", email: "", password: "", confirm: "" });
    const [showPass, setShowPass] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [focused, setFocused] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [agreed, setAgreed] = useState(false);
    const [error, setError] = useState("");

    const { register } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
    const passwordMatch = form.confirm && form.password !== form.confirm;

    const validateForm = () => {
        if (!form.name.trim()) {
            setError("El nombre es obligatorio");
            return false;
        }

        if (!form.email.includes("@")) {
            setError("Email inválido");
            return false;
        }

        if (form.password.length < 6) {
            setError("Mínimo 6 caracteres");
            return false;
        }

        if (form.password !== form.confirm) {
            setError("Las contraseñas no coinciden");
            return false;
        }

        if (!agreed) {
            setError("Debes aceptar los términos");
            return false;
        }

        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) return;
        setIsLoading(true);
        setError("");

        try {
            await register(form.name, form.email, form.password);
            navigate("/dashboard");
        } catch (err) {
            setError(err.response?.data?.msg || "Error al registrarse");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <AuthLayout
            title="Crear cuenta"
            subtitle={<>Unite a la red de <span style={{ color: "var(--primary)", fontWeight: 600 }}>reciclaje colaborativo</span></>}
            error={error}
        >
            {/* Form */}
            <form style={{ display: "flex", flexDirection: "column", gap: "16px" }} onSubmit={handleSubmit}>

                {/* Nombre */}
                <div>
                    <label style={{ ...styles.label, display: "block", marginBottom: "6px" }}>Nombre completo</label>
                    <div style={styles.field(focused, "name")}>
                        <UserIcon />
                        <input type="text" name="name" placeholder="Tu nombre"
                            value={form.name} onChange={handleChange}
                            onFocus={() => setFocused("name")} onBlur={() => setFocused(null)}
                            style={styles.input} />
                    </div>
                </div>

                {/* Email */}
                <div>
                    <label style={{ ...styles.label, display: "block", marginBottom: "6px" }}>Correo electrónico</label>
                    <div style={styles.field(focused, "email")}>
                        <MailIcon />
                        <input type="email" name="email" placeholder="ejemplo@email.com"
                            value={form.email} onChange={handleChange}
                            onFocus={() => setFocused("email")} onBlur={() => setFocused(null)}
                            style={styles.input} />
                    </div>
                </div>

                {/* Contraseña */}
                <div>
                    <label style={{ ...styles.label, display: "block", marginBottom: "6px" }}>Contraseña</label>
                    <div style={styles.field(focused, "password")}>
                        <LockIcon />
                        <input type={showPass ? "text" : "password"} name="password"
                            placeholder="••••••••" value={form.password}
                            onChange={handleChange}
                            onFocus={() => setFocused("password")} onBlur={() => setFocused(null)}
                            style={styles.input} />
                        <button type="button" onClick={() => setShowPass(!showPass)}
                            style={{ background: "none", border: "none", cursor: "pointer",
                                padding: 0, color: "var(--text-secondary)", display: "flex" }}>
                            <EyeIcon open={showPass} />
                        </button>
                    </div>
                    <PasswordStrength password={form.password} />
                </div>

                {/* Confirmar contraseña */}
                <div>
                    <label style={{ ...styles.label, display: "block", marginBottom: "6px" }}>Confirmar contraseña</label>
                    <div style={{
                        ...styles.field(focused, "confirm"),
                        borderColor: passwordMatch ? "var(--error)" : focused === "confirm" ? "var(--primary)" : "#DEE2E6",
                        boxShadow: passwordMatch ? "0 0 0 3px rgba(231,76,60,0.12)" : focused === "confirm" ? "0 0 0 3px rgba(22,160,133,0.12)" : "none"
                    }}>
                        <ShieldIcon />
                        <input type={showConfirm ? "text" : "password"} name="confirm"
                            placeholder="••••••••" value={form.confirm}
                            onChange={handleChange}
                            onFocus={() => setFocused("confirm")} onBlur={() => setFocused(null)}
                            style={styles.input} />
                        <button type="button" onClick={() => setShowConfirm(!showConfirm)}
                            style={{ background: "none", border: "none", cursor: "pointer",
                                padding: 0, color: "var(--text-secondary)", display: "flex" }}>
                            <EyeIcon open={showConfirm} />
                        </button>
                    </div>

                    {passwordMatch && (
                        <p style={{ fontSize: "12px", color: "var(--error)", display: "flex",
                            alignItems: "center", gap: "4px", margin: "6px 0 0" }}>
                            <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                    d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            Las contraseñas no coinciden
                        </p>
                    )}
                    {form.confirm && !passwordMatch && (
                        <p style={{ fontSize: "12px", color: "var(--success)", display: "flex",
                            alignItems: "center", gap: "4px", margin: "6px 0 0" }}>
                            <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            Las contraseñas coinciden
                        </p>
                    )}
                </div>

                {/* Términos */}
                <label style={{ display: "flex", alignItems: "flex-start", gap: "10px",
                    cursor: "pointer", marginTop: "2px" }}>
                    <div style={{ position: "relative", marginTop: "1px", flexShrink: 0 }}>
                        <input type="checkbox" checked={agreed}
                            onChange={(e) => setAgreed(e.target.checked)}
                            style={{ position: "absolute", opacity: 0, width: 0, height: 0 }} />
                        <div style={{
                            width: 18, height: 18, borderRadius: "5px",
                            border: `2px solid ${agreed ? "var(--primary)" : "#CED4DA"}`,
                            background: agreed ? "var(--primary)" : "transparent",
                            display: "flex", alignItems: "center", justifyContent: "center",
                            transition: "all 0.2s",
                        }}>
                            {agreed && (
                                <svg width="11" height="11" fill="none" viewBox="0 0 24 24" stroke="white">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                </svg>
                            )}
                        </div>
                    </div>
                    <span style={{ fontSize: "12px", color: "var(--text-secondary)", lineHeight: 1.6 }}>
                        Acepto los{" "}
                        <span style={{ color: "var(--primary)", fontWeight: 500, cursor: "pointer" }}>
                            términos de servicio
                        </span>{" "}
                        y la{" "}
                        <span style={{ color: "var(--primary)", fontWeight: 500, cursor: "pointer" }}>
                            política de privacidad
                        </span>
                    </span>
                </label>

                {/* Botón submit */}
                <button
                    type="submit"
                    disabled={isLoading || !!passwordMatch || !agreed}
                    style={{
                        width: "100%",
                        padding: "12px",
                        background: "linear-gradient(135deg, #2C3E50, var(--primary))",
                        color: "white",
                        border: "none",
                        borderRadius: "12px",
                        fontSize: "14px",
                        fontWeight: 600,
                        cursor: isLoading || !!passwordMatch || !agreed ? "not-allowed" : "pointer",
                        opacity: isLoading || !!passwordMatch || !agreed ? 0.55 : 1,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "8px",
                        transition: "opacity 0.2s, transform 0.1s",
                        marginTop: "4px",
                    }}
                    onMouseDown={(e) => { if (!isLoading) e.currentTarget.style.transform = "scale(0.98)"; }}
                    onMouseUp={(e) => { e.currentTarget.style.transform = "scale(1)"; }}
                >
                    {isLoading ? (
                        <>
                            <svg width="16" height="16" fill="none" viewBox="0 0 24 24"
                                style={{ animation: "spin 0.8s linear infinite" }}>
                                <circle cx="12" cy="12" r="10" stroke="white"
                                    strokeWidth="3" strokeDasharray="60" strokeDashoffset="40" />
                            </svg>
                            Creando cuenta...
                        </>
                    ) : (
                        <>
                            <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                    d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                            </svg>
                            Crear cuenta
                        </>
                    )}
                </button>

                {/* Divider */}
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <div style={{ flex: 1, height: "1px", background: "#E9ECEF" }} />
                    <span style={{ fontSize: "12px", color: "#ADB5BD", fontWeight: 500 }}>
                        ¿ya tenés cuenta?
                    </span>
                    <div style={{ flex: 1, height: "1px", background: "#E9ECEF" }} />
                </div>

                {/* Ir a login */}
                <button
                    type="button"
                    onClick={() => navigate("/login")}
                    style={{
                        width: "100%",
                        padding: "10px",
                        borderRadius: "12px",
                        border: "1px solid #DEE2E6",
                        background: "transparent",
                        fontSize: "14px",
                        fontWeight: 600,
                        color: "var(--text-secondary)",
                        cursor: "pointer",
                        transition: "border-color 0.2s, color 0.2s",
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = "var(--primary)";
                        e.currentTarget.style.color = "var(--primary)";
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = "#DEE2E6";
                        e.currentTarget.style.color = "var(--text-secondary)";
                    }}
                >
                    Iniciá sesión aquí
                </button>

            </form>
        </AuthLayout>
    );
};

export default Register;