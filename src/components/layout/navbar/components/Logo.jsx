// Este componente representa el logo de la aplicación en la barra de navegación. Es un botón que, al hacer clic, ejecuta la 
// función onClick pasada como prop. 
// El logo incluye un icono de reciclaje y el nombre de la aplicación "CirculApp" con un subtítulo "Gestión circular". 

// POSIBLE CAMBIO PORQUE NO ME GUSTO

import IconRecycle from "../icons/IconRecycle"
function Logo({ onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group flex items-center gap-3 rounded-2xl p-1.5 transition duration-200 focus:outline-none"
    >
      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary-dark text-white shadow-soft transition-transform duration-200 group-hover:scale-105">
        <IconRecycle className="h-5 w-5" />
      </span>

      <span className="flex flex-col text-left">
        <span className="text-base font-bold leading-tight text-text-primary group-hover:text-primary transition-colors">
          CirculApp
        </span>
        <span className="text-xs font-medium text-text-secondary">Gestión circular</span>
      </span>
    </button>
  );
}

export default Logo;