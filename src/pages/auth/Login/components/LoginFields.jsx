import { Link } from "react-router-dom";

import MailIcon from "../../icons/MailIcon";
import LockIcon from "../../icons/LockIcon";
import EyeIcon from "../../icons/EyeIcon";

const fieldClasses = `
    flex items-center gap-2.5
    rounded-xl
    border border-gray-300
    bg-background
    px-3.5 py-2.5
    transition-all duration-200
    focus-within:border-primary
    focus-within:bg-background-paper
    focus-within:ring-4
    focus-within:ring-primary/10
`;

const inputClasses = `
    min-w-0 flex-1
    border-none
    bg-transparent
    text-sm
    text-text-primary
    outline-none
    placeholder:text-gray-400
`;

const labelClasses = `
    mb-1.5 block
    text-[11px]
    font-medium
    uppercase
    tracking-[0.06em]
    text-text-secondary
`;

export default function LoginFields({
    email,
    password,
    rememberMe,
    showPassword,
    setEmail,
    setPassword,
    setRememberMe,
    setShowPassword,
}) {
    return (
        <>
            {/* Email */}
            <div>
                <label
                    htmlFor="email"
                    className={labelClasses}
                >
                    Correo electrónico
                </label>

                <div className={fieldClasses}>
                    <span className="flex shrink-0 text-text-secondary">
                        <MailIcon />
                    </span>

                    <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(event) =>
                            setEmail(event.target.value)
                        }
                        placeholder="nombre@correo.com"
                        autoComplete="email"
                        required
                        className={inputClasses}
                    />
                </div>
            </div>

            {/* Contraseña */}
            <div>
                <label
                    htmlFor="password"
                    className={labelClasses}
                >
                    Contraseña
                </label>

                <div className={fieldClasses}>
                    <span className="flex shrink-0 text-text-secondary">
                        <LockIcon />
                    </span>

                    <input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(event) =>
                            setPassword(event.target.value)
                        }
                        placeholder="••••••••"
                        autoComplete="current-password"
                        required
                        className={inputClasses}
                    />

                    <button
                        type="button"
                        onClick={() =>
                            setShowPassword(!showPassword)
                        }
                        aria-label={
                            showPassword
                                ? "Ocultar contraseña"
                                : "Mostrar contraseña"
                        }
                        className="
                            flex shrink-0
                            cursor-pointer
                            border-none
                            bg-transparent
                            p-0
                            text-text-secondary
                            transition-colors
                            hover:text-primary
                        "
                    >
                        <EyeIcon open={showPassword} />
                    </button>
                </div>
            </div>

            {/* Opciones de inicio de sesión: Checkbox + Olvidaste tu contraseña */}
            <div className="flex flex-col gap-2 pt-1">
                <div className="flex items-center gap-2">
                    <input
                        id="rememberMe"
                        type="checkbox"
                        checked={rememberMe || false}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary cursor-pointer"
                    />
                    <label
                        htmlFor="rememberMe"
                        className="text-xs text-text-secondary cursor-pointer select-none font-medium"
                    >
                        Recordar mi correo y datos de acceso
                    </label>
                </div>

                <div className="text-right">
                    <Link
                        to="/forgot-password"
                        className="
                            text-xs
                            text-primary
                            font-medium
                            transition-colors
                            hover:text-primary-dark
                            hover:underline
                        "
                    >
                        ¿Olvidaste tu contraseña?
                    </Link>
                </div>
            </div>
        </>
    );
}