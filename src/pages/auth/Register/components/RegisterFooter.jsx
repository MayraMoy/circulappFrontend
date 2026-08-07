import { Link } from "react-router-dom";

export default function RegisterFooter() {
    return (
        <p className="mt-6 text-center text-xs text-gray-500">
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
    );
}