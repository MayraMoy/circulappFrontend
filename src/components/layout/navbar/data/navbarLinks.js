// Este archivo define los enlaces de navegación que se mostrarán en la barra de navegación de la aplicación. 
// Cada enlace tiene un nombre, una ruta, un icono y una lista de roles que pueden acceder a él. Los enlaces se 
// utilizan para renderizar los elementos de navegación en el menú de escritorio y móvil. 

import IconDashboard from "../icons/IconDashboard";
import IconSearch from "../icons/IconSearch";
import IconPublish from "../icons/IconPublish";
import IconValidate from "../icons/IconValidate";

export const NAVBAR_LINKS = [
  {
    name: "Dashboard",
    path: "/dashboard",
    icon: IconDashboard,
    roles: ["usuario", "gestor", "coordinador", "admin"],
  },
  {
    name: "Explorar",
    path: "/search",
    icon: IconSearch,
    roles: ["usuario", "gestor", "coordinador", "admin"],
  },
  {
    name: "Publicar",
    path: "/publish",
    icon: IconPublish,
    roles: ["usuario", "gestor", "coordinador", "admin"],
  },
  {
    name: "Validar",
    path: "/validate",
    icon: IconValidate,
    roles: ["gestor"],
  },
];