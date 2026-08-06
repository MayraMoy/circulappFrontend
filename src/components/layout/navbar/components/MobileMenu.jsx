// Este componente representa el menú de navegación para pantallas móviles. Recibe una lista de elementos de navegación, 
// la ruta actual y una función para navegar a una nueva ruta. Renderiza un contenedor <div> que contiene un conjunto de 
// elementos <MobileNavItem> para cada elemento de navegación. Cada <MobileNavItem> recibe información sobre si está activo 
// o no, y una función onClick que navega a la ruta correspondiente cuando se hace clic en él.

import MobileNavItem from "./MobileNavItem";

function MobileMenu({ navItems, pathname, navigate }) {
  return (
    <div className="md:hidden px-4 pb-3">
      <div className="flex w-full items-center justify-between gap-2 rounded-[1.5rem] border border-primary/20 bg-primary/5 px-2 py-2 shadow-soft">
        {navItems.map((item) => (
          <MobileNavItem
            key={item.path}
            item={item}
            isActive={pathname === item.path}
            onClick={() => navigate(item.path)}
          />
        ))}
      </div>
    </div>
  );
}

export default MobileMenu;
