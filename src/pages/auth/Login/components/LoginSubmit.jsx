import ArrowRightIcon from "../../icons/ArrowRightIcon";

export default function LoginSubmit({ isLoading }) {
    return (
        <button
            type="submit"
            disabled={isLoading}
            className="
                mt-1
                flex w-full
                items-center justify-center
                gap-2
                rounded-xl
                border-none
                bg-gradient-to-br
                from-text-primary
                to-primary
                px-3 py-3
                text-sm font-semibold
                text-white
                transition-all duration-200

                hover:opacity-95
                active:scale-[0.98]

                disabled:cursor-not-allowed
                disabled:opacity-70
                disabled:active:scale-100
            "
        >
            {isLoading ? (
                <>
                    <svg
                        className="h-4 w-4 animate-spin"
                        fill="none"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                    >
                        <circle
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="3"
                            strokeDasharray="60"
                            strokeDashoffset="40"
                            className="text-white"
                        />
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
    );
}