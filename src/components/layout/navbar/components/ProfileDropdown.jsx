// Este componente representa el menú desplegable de perfil en la barra de navegación. Muestra el nombre y correo electrónico del usuario, 
// y proporciona botones para navegar al perfil del usuario, al material educativo y para cerrar sesión. Cada botón tiene un icono 
// correspondiente y aplica estilos de transición al pasar el cursor sobre ellos.

import IconUser from "../icons/IconUser";
import IconBook from "../icons/IconBook";
import IconLogout from "../icons/IconLogout";

function ProfileDropdown({ user, navigate, handleLogout, closeMenu }) {
  return (
    <div className="absolute right-0 top-full z-50 mt-2 w-64 sm:w-72 max-w-[calc(100vw-1.5rem)] overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-medium">
      <div className="border-b border-gray-100 bg-primary/5 px-4 py-3">
        <div className="truncate text-sm font-bold text-text-primary">{user.name}</div>
        <div className="truncate text-xs text-text-secondary">{user.email}</div>
      </div>

      <div className="flex flex-col gap-1 p-2">
        <button
          type="button"
          onClick={() => {
            navigate("/profile");
            closeMenu();
          }}
          className="flex items-center gap-3 rounded-xl px-3 py-2 text-left text-sm font-medium text-text-primary transition hover:bg-primary/10 hover:text-primary"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <IconUser />
          </span>
          <span>Mi Perfil</span>
        </button>

        <button
          type="button"
          onClick={() => {
            navigate("/educational");
            closeMenu();
          }}
          className="flex items-center gap-3 rounded-xl px-3 py-2 text-left text-sm font-medium text-text-primary transition hover:bg-primary/10 hover:text-primary"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <IconBook />
          </span>
          <span>Material Educativo</span>
        </button>

        <div className="my-1 h-px bg-gray-100" />

        <button
          type="button"
          onClick={() => {
            handleLogout();
            closeMenu();
          }}
          className="flex items-center gap-3 rounded-xl px-3 py-2 text-left text-sm font-medium text-error transition hover:bg-error/10"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-error/10 text-error">
            <IconLogout />
          </span>
          <span>Cerrar Sesión</span>
        </button>
      </div>
    </div>
  );
}

export default ProfileDropdown;