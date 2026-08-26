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

export default function PasswordFields({
    password,
    confirmPassword,
    showPassword,
    showConfirmPassword,
    setPassword,
    setConfirmPassword,
    setShowPassword,
    setShowConfirmPassword,
}) {
    // Evaluación en tiempo real de seguridad de contraseña
    const hasMinLength = password.length >= 8;
    const hasUpper = /[A-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSymbol = /[!@#$%^&*(),.?":{}|<>\-_=+\\[\]~`]/.test(password);

    const score = [hasMinLength, hasUpper, hasNumber, hasSymbol].filter(Boolean).length;

    const getStrengthConfig = () => {
        if (!password) return null;
        if (score <= 1) return { label: 'Débil', color: '#EF4444', percent: '25%', bg: 'bg-red-500', text: 'text-red-600' };
        if (score === 2) return { label: 'Regular', color: '#F97316', percent: '50%', bg: 'bg-orange-500', text: 'text-orange-600' };
        if (score === 3) return { label: 'Buena', color: '#F59E0B', percent: '75%', bg: 'bg-amber-500', text: 'text-amber-600' };
        return { label: 'Muy Fuerte 🛡️', color: '#10B981', percent: '100%', bg: 'bg-emerald-500', text: 'text-emerald-600' };
    };

    const strength = getStrengthConfig();

    return (
        <>
            {/* Contraseña */}
            <div>
                <div className="flex justify-between items-center mb-1.5">
                    <label
                        htmlFor="password"
                        className={labelClasses}
                        style={{ marginBottom: 0 }}
                    >
                        Contraseña
                    </label>

                    {strength && (
                        <span className={`text-[11px] font-semibold ${strength.text}`}>
                            Seguridad: {strength.label}
                        </span>
                    )}
                </div>

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
                        autoComplete="new-password"
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
                            flex
                            shrink-0
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

                {/* Barra de progreso de seguridad */}
                {password.length > 0 && (
                    <div className="mt-2">
                        <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
                            <div
                                className={`h-full transition-all duration-300 ${strength.bg}`}
                                style={{ width: strength.percent }}
                            />
                        </div>

                        {/* Recomendaciones en vivo */}
                        <div className="mt-2 grid grid-cols-2 gap-1.5 text-[11px] text-text-secondary">
                            <div className={`flex items-center gap-1.5 ${hasMinLength ? 'text-emerald-600 font-medium' : 'text-gray-400'}`}>
                                <span>{hasMinLength ? '✓' : '○'}</span> 8+ caracteres
                            </div>
                            <div className={`flex items-center gap-1.5 ${hasUpper ? 'text-emerald-600 font-medium' : 'text-gray-400'}`}>
                                <span>{hasUpper ? '✓' : '○'}</span> Una mayúscula (A-Z)
                            </div>
                            <div className={`flex items-center gap-1.5 ${hasNumber ? 'text-emerald-600 font-medium' : 'text-gray-400'}`}>
                                <span>{hasNumber ? '✓' : '○'}</span> Un número (0-9)
                            </div>
                            <div className={`flex items-center gap-1.5 ${hasSymbol ? 'text-emerald-600 font-medium' : 'text-gray-400'}`}>
                                <span>{hasSymbol ? '✓' : '○'}</span> Un símbolo (!@#$...)
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Confirmar contraseña */}
            <div>
                <label
                    htmlFor="confirmPassword"
                    className={labelClasses}
                >
                    Confirmar contraseña
                </label>

                <div className={fieldClasses}>
                    <span className="flex shrink-0 text-text-secondary">
                        <LockIcon />
                    </span>

                    <input
                        id="confirmPassword"
                        type={
                            showConfirmPassword
                                ? "text"
                                : "password"
                        }
                        value={confirmPassword}
                        onChange={(event) =>
                            setConfirmPassword(event.target.value)
                        }
                        placeholder="••••••••"
                        autoComplete="new-password"
                        required
                        className={inputClasses}
                    />

                    <button
                        type="button"
                        onClick={() =>
                            setShowConfirmPassword(
                                !showConfirmPassword
                            )
                        }
                        aria-label={
                            showConfirmPassword
                                ? "Ocultar contraseña"
                                : "Mostrar contraseña"
                        }
                        className="
                            flex
                            shrink-0
                            cursor-pointer
                            border-none
                            bg-transparent
                            p-0
                            text-text-secondary
                            transition-colors
                            hover:text-primary
                        "
                    >
                        <EyeIcon
                            open={showConfirmPassword}
                        />
                    </button>
                </div>
            </div>
        </>
    );
}