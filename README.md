<div align="center">

<img src="https://img.shields.io/badge/Estado-En%20desarrollo-orange?style=flat-square" alt="Estado">
<img src="https://img.shields.io/badge/Frontend-React%2019%20%-%20Vite-blue?style=flat-square&logo=react" alt="Frontend">
<img src="https://img.shields.io/badge/Estilos-Tailwind%20CSS%20v4-38bdf8?style=flat-square&logo=tailwindcss" alt="Estilos">

</div>

# CirculApp — Frontend

> **Plataforma Web Colaborativa de Reciclaje Vecinal y Economía Circular**  
> Interfaz moderna, accesible e intuitiva para que los vecinos publiquen, intercambien o donen materiales reciclables, además de contar con herramientas de educación ambiental y un panel administrativo integral.

---

## Descripción del Proyecto

**CirculApp Frontend** es la aplicación cliente que conecta a miembros de la comunidad con iniciativas de reciclaje e intercambio sostenible. Diseñada con un enfoque centrado en la experiencia de usuario (UX/UI), permite explorar publicaciones geolocalizadas, gestionar solicitudes en tiempo real, consultar contenido educativo sobre clasificación de residuos y acceder a paneles especializados según el rol del usuario (Vecino / Administrador).

---

## Tecnologías Principales

- **Core & Runtime:** [React 19] + [Vite].
- **Enrutamiento:** [React Router DOM v7].
- **Estilos & Animaciones:** [Tailwind CSS v4], [Heroicons], [Framer Motion].
- **Cliente HTTP:** [Axios].
- **Testing:** [Vitest], [React Testing Library], [jsdom].
- **Calidad de Código:** [ESLint 9].

---

## Características y Vistas

- **Autenticación y Perfiles:** Registro, inicio de sesión y gestión del perfil vecinal.
- **Gestión de Materiales:** Publicación, búsqueda, filtrado y solicitud de artículos reciclables o reutilizables.
- **Localización y Agenda:** Coordinación de puntos de encuentro y retiros.
- **Módulo Educativo:** Guías y buenas prácticas de separación en origen y reciclaje.
- **Panel de Administración:** Control de publicaciones, moderación de reportes, métricas y gestión de usuarios.
- **Sistema de Calificaciones e Historial:** Reputación comunitaria y registro de transacciones exitosas.

---

## Estructura del Proyecto

```text
circulappFrontend-main/
├── public/                 # Recursos estáticos públicos
├── src/
│   ├── assets/             # Imágenes, logos e íconos locales
│   ├── components/         # Componentes reutilizables (Navbar, Cards, Modales, etc.)
│   ├── contexts/           # Context API (AuthContext, ThemeContext, etc.)
│   ├── hooks/              # Custom Hooks
│   ├── pages/              # Vistas principales
│   │   ├── admin/          # Panel de administración
│   │   ├── agenda/         # Coordinación de entregas
│   │   ├── auth/           # Login y Registro
│   │   ├── dashboard/      # Panel principal del usuario
│   │   ├── educacion/      # Sección informativa y educativa
│   │   ├── historial/      # Historial de intercambios
│   │   └── items/          # Catálogo y detalle de publicaciones
│   ├── routes/             # Definición de rutas públicas y protegidas
│   ├── services/           # Conexión con endpoints del Backend (Axios)
│   ├── styles/             # Estilos globales y utilidades
│   ├── test/               # Pruebas unitarias y de integración
│   ├── App.jsx             # Componente raíz
│   └── main.jsx            # Punto de entrada de React
├── .env.example            # Plantilla de variables de entorno
├── tailwind.config.js      # Configuración de Tailwind CSS
├── vite.config.js          # Configuración del bundler Vite
└── package.json
