// Este componente representa la barra de navegación de la aplicación. Utiliza el contexto de autenticación para obtener información 
// sobre el usuario actual y su rol, y renderiza los elementos de navegación correspondientes según los permisos del usuario. 
// También maneja la navegación entre rutas y la funcionalidad de cierre de sesión.

import { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import AuthContext from "../../../contexts/AuthContext";

import Logo from "./components/Logo";
import DesktopMenu from "./components/DesktopMenu";
import MobileMenu from "./components/MobileMenu";
import ProfileButton from "./components/ProfileButton";
import ProfileDropdown from "./components/ProfileDropdown";

import { NAVBAR_LINKS } from "./data/NavbarLinks";

import DevRoleSwitcher from "../../dev/DevRoleSwitcher";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  const navigate = useNavigate();
  const location = useLocation();

  const [showProfileMenu, setShowProfileMenu] = useState(false);

  if (!user) return null;

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const navItems = NAVBAR_LINKS.filter(
    (item) => !item.roles || item.roles.includes(user.role)
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b border-primary/15 bg-background-paper/90 backdrop-blur-md shadow-soft">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-2.5">
        <Logo onClick={() => navigate("/dashboard")} />

        <DesktopMenu
          navItems={navItems}
          pathname={location.pathname}
          navigate={navigate}
        />

        <div className="flex items-center gap-3">
          <DevRoleSwitcher />

          <div className="relative">
            <ProfileButton
              user={user}
              showProfileMenu={showProfileMenu}
              setShowProfileMenu={setShowProfileMenu}
            />

            {showProfileMenu && (
              <ProfileDropdown
                user={user}
                navigate={navigate}
                handleLogout={handleLogout}
                closeMenu={() => setShowProfileMenu(false)}
              />
            )}
          </div>
        </div>
      </div>

      <MobileMenu
        navItems={navItems}
        pathname={location.pathname}
        navigate={navigate}
      />
    </header>
  );
};

export default Navbar;
