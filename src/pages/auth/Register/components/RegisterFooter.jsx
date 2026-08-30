import { Link, useNavigate } from "react-router-dom";

export default function RegisterFooter() {
    const navigate = useNavigate();

    const handleGuest = () => {
        sessionStorage.setItem("circulapp_guest_mode", "true");
        navigate("/search");
    };

    return (
        <div className="flex flex-col items-center gap-4 mt-6">
            <p className="text-center text-xs text-gray-500 m-0">
                ¿Ya tenés una cuenta?{" "}
                <Link
                    to="/login"
                    className="
                        font-semibold
                        text-primary
                        transition-colors
                        hover:text-primary-dark
                    "
                >
                    Iniciar sesión
                </Link>
            </p>

            <button
                type="button"
                onClick={handleGuest}
                className="
                    inline-flex items-center gap-1.5
                    text-xs font-semibold
                    text-gray-600 hover:text-emerald-800
                    bg-gray-100/90 hover:bg-emerald-50
                    px-4 py-2 rounded-full
                    border border-gray-200 hover:border-emerald-300
                    transition-all duration-150 cursor-pointer
                "
            >
                <span>Continuar como invitado</span>
                <span>→</span>
            </button>
        </div>
    );
}