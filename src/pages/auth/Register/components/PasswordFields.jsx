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
    return (
        <>
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