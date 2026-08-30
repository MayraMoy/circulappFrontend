# ♻️ CirculApp — Frontend

> **Plataforma Web Colaborativa de Reciclaje Vecinal y Economía Circular**  
> Interfaz moderna, accesible e intuitiva para que los vecinos publiquen, intercambien o donen materiales reciclables, además de contar con herramientas de educación ambiental y un panel administrativo integral.

---

## 📋 Descripción del Proyecto

**CirculApp Frontend** es la aplicación cliente que conecta a miembros de la comunidad con iniciativas de reciclaje e intercambio sostenible. Diseñada con un enfoque centrado en la experiencia de usuario (UX/UI), permite explorar publicaciones geolocalizadas, gestionar solicitudes en tiempo real, consultar contenido educativo sobre clasificación de residuos y acceder a paneles especializados según el rol del usuario (Vecino / Administrador).

---

## 🚀 Tecnologías Principales

- **Core & Runtime:** [React 19](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Enrutamiento:** [React Router DOM v7](https://reactrouter.com/)
- **Estilos & Animaciones:** [Tailwind CSS v4](https://tailwindcss.com/), [Heroicons](https://heroicons.com/), [Framer Motion](https://www.framer.com/motion/)
- **Cliente HTTP:** [Axios](https://axios-http.com/)
- **Testing:** [Vitest](https://vitest.dev/), [React Testing Library](https://testing-library.com/), [jsdom](https://github.com/jsdom/jsdom)
- **Calidad de Código:** [ESLint 9](https://eslint.org/)

---

## ✨ Características y Vistas

- 🔐 **Autenticación y Perfiles:** Registro, inicio de sesión y gestión del perfil vecinal.
- 📦 **Gestión de Materiales:** Publicación, búsqueda, filtrado y solicitud de artículos reciclables o reutilizables.
- 📍 **Localización y Agenda:** Coordinación de puntos de encuentro y retiros.
- 🎓 **Módulo Educativo:** Guías y buenas prácticas de separación en origen y reciclaje.
- 📊 **Panel de Administración:** Control de publicaciones, moderación de reportes, métricas y gestión de usuarios.
- ⭐ **Sistema de Calificaciones e Historial:** Reputación comunitaria y registro de transacciones exitosas.

---

## 📁 Estructura del Proyecto

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
```

---

## ⚙️ Instalación y Configuración Local

### Prerrequisitos
- [Node.js](https://nodejs.org/) (versión 18 o superior recomendada)
- [npm](https://www.npmjs.com/) o [yarn](https://yarnpkg.com/)

### 1. Clonar el repositorio
```bash
git clone https://github.com/tu-usuario/circulappFrontend.git
cd circulappFrontend-main
```

### 2. Instalar dependencias
```bash
npm install
```

### 3. Configurar variables de entorno
Crea un archivo `.env` en la raíz del proyecto tomando como base `.env.example`:

```env
# URL base de la API del Backend
VITE_API_URL=http://localhost:5000/api
```

### 4. Iniciar el servidor de desarrollo
```bash
npm run dev
```
La aplicación estará disponible en `http://localhost:5173`.

---

## 🛠️ Scripts Disponibles

| Comando | Descripción |
| :--- | :--- |
| `npm run dev` | Inicia el entorno de desarrollo local con Hot Module Replacement (HMR). |
| `npm run build` | Compila y optimiza la aplicación para producción en la carpeta `dist/`. |
| `npm run preview` | Previsualiza localmente el build de producción. |
| `npm run test` | Ejecuta la suite de pruebas unitarias con Vitest. |
| `npm run lint` | Analiza el código en busca de advertencias y errores de sintaxis. |

---

## 👥 Equipo y Créditos

Este proyecto fue desarrollado colaborativamente por:

- **Mayra Moyano**
- **Ricardo Cejas**
- **Ana Luz Nieto**
- **Nahuel Aguero**

---

## 📄 Licencia

Distribuido bajo la Licencia MIT. Consulta el archivo `LICENSE` para más detalles.
