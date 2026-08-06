// Este componente representa el botón de perfil en la barra de navegación. Muestra las iniciales del usuario, su nombre y rol, 
// y un icono de flecha que indica si el menú de perfil está abierto o cerrado. Al hacer clic en el botón, se alterna la visibilidad 
// del menú de perfil.

import IconChevron from "../icons/IconChevron";

function ProfileButton({ user, showProfileMenu, setShowProfileMenu }) {
  const initial = user?.name ? user.name.charAt(0).toUpperCase() : "U";

  return (
    <button
      type="button"
      onClick={() => setShowProfileMenu(!showProfileMenu)}
      className={`flex items-center gap-3 rounded-full border px-3 py-1.5 transition duration-200 focus:outline-none ${
        showProfileMenu
          ? "border-primary/40 bg-primary/10 shadow-sm"
          : "border-gray-200/90 bg-background-paper hover:border-primary/30 hover:bg-primary/5"
      }`}
    >
      {/* Avatar destacado en gradiente primary */}
      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary-dark font-bold text-white shadow-soft">
        {initial}
      </div>

      <div className="hidden text-left md:block">
        <div className="text-xs font-bold leading-tight text-text-primary">
          {user?.name}
        </div>
        <div className="text-[10px] font-extrabold uppercase tracking-wider text-primary">
          {user?.role}
        </div>
      </div>

      <span
        className={`text-text-secondary transition-transform duration-200 ${
          showProfileMenu ? "rotate-180 text-primary" : ""
        }`}
      >
        <IconChevron />
      </span>
    </button>
  );
}

export default ProfileButton;