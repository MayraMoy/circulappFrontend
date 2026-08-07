import { Link } from "react-router-dom";

export default function LoginFooter() {
    return (
        <p className="mt-6 text-center text-xs text-gray-500">
            ¿No tenés cuenta?{" "}
            <Link
                to="/register"
                className="
                    font-semibold
                    text-primary
                    transition-colors
                    hover:text-primary-dark
                "
            >
                Registrate
            </Link>
        </p>
    );
}