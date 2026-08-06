// Este componente representa el menú de navegación para pantallas de escritorio. Recibe una lista de elementos de 
// navegación, la ruta actual y una función para navegar a una nueva ruta. Renderiza un elemento <nav> que contiene 
// un conjunto de elementos <NavItem> para cada elemento de navegación. Cada <NavItem> recibe información sobre si 
// está activo o no, y una función onClick que navega a la ruta correspondiente cuando se hace clic en él.

import NavItem from "./NavItem";

function DesktopMenu({ navItems, pathname, navigate }) {
  return (
    <nav className="hidden items-center gap-1 md:flex">
      {navItems.map((item) => (
        <NavItem
          key={item.path}
          item={item}
          isActive={pathname === item.path}
          onClick={() => navigate(item.path)}
        />
      ))}
    </nav>
  );
}

export default DesktopMenu;