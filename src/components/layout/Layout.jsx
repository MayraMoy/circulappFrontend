// Aca se define el layout de la aplicación, que incluye la barra de navegación y un contenedor para el contenido principal. 
// El layout se utiliza en todas las páginas de la aplicación para mantener una estructura consistente.

import Navbar from "./navbar/Navbar";
import AuthModal from "../auth/AuthModal";

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-grow">
        {children}
      </main>

      {/* Modal global de bienvenida / autenticación */}
      <AuthModal />
    </div>
  );
};

export default Layout;