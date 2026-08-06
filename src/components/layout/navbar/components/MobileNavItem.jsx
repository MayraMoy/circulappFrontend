// Este componente representa un elemento de navegación en el menú móvil. Recibe un objeto "item" que contiene información 
// sobre el elemento de navegación, un booleano "isActive" que indica si el elemento está activo o no, y una función "onClick" 
// que se ejecuta cuando se hace clic en el elemento. Renderiza un botón con un icono y un nombre, y aplica estilos diferentes 
// según si el elemento está activo o no.

function MobileNavItem({ item, isActive, onClick }) {
  const Icon = item.icon;

  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full flex-col items-center gap-1 rounded-2xl px-2 py-2.5 text-[0.7rem] font-medium transition duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 active:scale-[0.97]"
    >
      <span
        className={`flex h-9 w-9 items-center justify-center rounded-full text-lg transition duration-200 ${
          isActive ? "bg-primary text-white shadow-soft" : "text-text-secondary"
        }`}
      >
        <Icon />
      </span>
      <span className={`whitespace-nowrap ${isActive ? "text-primary" : "text-text-secondary"}`}>
        {item.name}
      </span>
    </button>
  );
}

export default MobileNavItem;
