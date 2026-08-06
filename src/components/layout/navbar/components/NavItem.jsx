// Este componente representa un elemento de navegación en el menú de escritorio. Recibe un objeto "item" que contiene 
// información sobre el elemento de navegación, un booleano "isActive" que indica si el elemento está activo o no, y una 
// función "onClick" que se ejecuta cuando se hace clic en el elemento. Renderiza un botón con un icono y un nombre, y 
// aplica estilos diferentes según si el elemento está activo o no.

function NavItem({ item, isActive, onClick }) {
  const Icon = item.icon;

  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 active:scale-95 ${
        isActive
          ? "bg-primary-dark text-white shadow-soft"
          : "text-text-secondary hover:bg-primary/10 hover:text-primary"
      }`}
    >
      <span className="flex h-5 w-5 items-center justify-center text-base">
        <Icon />
      </span>
      <span>{item.name}</span>
    </button>
  );
}

export default NavItem;