import { useState, useEffect } from "react";
import Navbar from "./navbar/Navbar";
import Footer from "./Footer";
import AuthModal from "../auth/AuthModal";
import ErrorToast from "../feedback/ErrorToast";

const Layout = ({ children }) => {
  const [globalError, setGlobalError] = useState("");

  useEffect(() => {
    const handleGlobalError = (e) => {
      setGlobalError(e.detail?.message || "Ocurrió un error inesperado.");
      setTimeout(() => setGlobalError(""), 6000);
    };

    window.addEventListener("app-global-error", handleGlobalError);
    return () => window.removeEventListener("app-global-error", handleGlobalError);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-grow">
        {children}
      </main>

      <Footer />

      {/* Notificación flotante de error global (P-006) */}
      <ErrorToast error={globalError} onClose={() => setGlobalError("")} />

      {/* Modal global de bienvenida / autenticación */}
      <AuthModal />
    </div>
  );
};

export default Layout;