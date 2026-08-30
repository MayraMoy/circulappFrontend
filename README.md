# CirculApp - Frontend

[![React](https://img.shields.io/badge/React-19.2.4-61DAFB?logo=react\&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8.0.4-646CFF?logo=vite\&logoColor=white)](https://vite.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.2.2-06B6D4?logo=tailwindcss\&logoColor=white)](https://tailwindcss.com/)
[![React Router](https://img.shields.io/badge/React_Router-7.14.1-CA4245?logo=reactrouter\&logoColor=white)](https://reactrouter.com/)
[![Axios](https://img.shields.io/badge/Axios-1.15.0-5A29E4?logo=axios\&logoColor=white)](https://axios-http.com/)
[![ESLint](https://img.shields.io/badge/ESLint-9.39.4-4B32C3?logo=eslint\&logoColor=white)](https://eslint.org/)
[![License](https://img.shields.io/badge/License-Academic-blue)](#)
[![Wiki](https://img.shields.io/badge/Documentation-Wiki-blue?logo=github)](https://github.com/MayraMoy/circulappFrontend/wiki)

Frontend de **CirculApp**, una plataforma web de economía colaborativa orientada a la gestión integral de materiales reciclables.

La aplicación permite a los usuarios interactuar con los servicios del backend para publicar, buscar y gestionar materiales, consultar perfiles, participar en procesos de validación y utilizar los diferentes módulos de la plataforma.

> [!NOTE]
> Este repositorio corresponde exclusivamente al frontend. El backend se encuentra en un repositorio independiente.

## Descripción

CirculApp propone una plataforma web responsive que centraliza la gestión comunitaria de materiales y facilita la interacción entre los diferentes usuarios del sistema.

El frontend proporciona la interfaz mediante la cual los usuarios acceden a las funcionalidades disponibles según su rol.

Dentro del alcance del proyecto se contempla una plataforma web responsiva con perfiles diferenciados y módulos de gestión, educación y validación.

## Tecnologías

### Core

| Tecnología       | Versión | Uso                         |
| ---------------- | ------: | --------------------------- |
| React            |  19.2.4 | Construcción de la interfaz |
| React DOM        |  19.2.4 | Renderizado                 |
| Vite             |   8.0.4 | Desarrollo y build          |
| React Router DOM |  7.14.1 | Enrutamiento                |

### UI

| Tecnología    | Versión | Uso               |
| ------------- | ------: | ----------------- |
| Tailwind CSS  |   4.2.2 | Estilos           |
| Framer Motion | 12.38.0 | Animaciones       |
| Lucide React  |   1.8.0 | Iconos            |
| PostCSS       |       — | Procesamiento CSS |

### Comunicación

| Tecnología | Versión | Uso                     |
| ---------- | ------: | ----------------------- |
| Axios      |  1.15.0 | Comunicación con la API |

### Desarrollo

| Tecnología         | Versión | Uso                |
| ------------------ | ------: | ------------------ |
| ESLint             |  9.39.4 | Calidad del código |
| ESLint React Hooks |       — | Reglas para Hooks  |
| Autoprefixer       |       — | Prefijos CSS       |

El stack frontend está documentado en la especificación técnica de CirculApp.

## Funcionalidades

### Autenticación

* Inicio de sesión.
* Registro de usuarios.
* Gestión de sesión.
* Acceso según rol.

### Dashboard

Panel principal desde el cual los usuarios pueden acceder a las funcionalidades disponibles según sus permisos.

### Publicación

Permite acceder a la interfaz para registrar nuevos materiales.

### Búsqueda

Permite consultar materiales publicados y aplicar diferentes filtros.

Entre ellos:

* Texto.
* Categoría.
* Estado de procesamiento.
* Propietario.
* Proximidad geográfica.

### Detalle

Cada material dispone de una vista específica para consultar su información y los datos relacionados con su propietario.

### Módulo educativo

Incluye contenido orientado al correcto procesamiento de materiales y procesos de compactación.

### Validación

Vista destinada a los usuarios con rol `gestor` para realizar procesos de validación.

### Perfil

Permite consultar y actualizar la información del usuario.

### Agenda

Los gestores disponen de una sección destinada a la gestión de recolecciones.

### Historial

Los gestores pueden consultar información histórica.

### Calificaciones

La plataforma incorpora un sistema de evaluaciones entre usuarios.

## Roles

| Rol      | Funcionalidades                                                    |
| -------- | ------------------------------------------------------------------ |
| `user`   | Publicar y buscar materiales y utilizar funcionalidades generales. |
| `gestor` | Validar materiales, marcar fardos, gestionar agenda e historial.   |
| `admin`  | Gestionar funcionalidades administrativas y reportes.              |

> [!IMPORTANT]
> Las vistas y operaciones disponibles dependen del rol del usuario autenticado.

Los roles se encuentran definidos en la documentación funcional del proyecto.

## Rutas

| Ruta           | Descripción             | Acceso      |
| -------------- | ----------------------- | ----------- |
| `/login`       | Inicio de sesión        | Público     |
| `/register`    | Registro                | Público     |
| `/dashboard`   | Panel principal         | Autenticado |
| `/publish`     | Publicar material       | Autenticado |
| `/search`      | Buscar materiales       | Autenticado |
| `/educational` | Módulo educativo        | Autenticado |
| `/validate`    | Validación              | Gestor      |
| `/profile`     | Perfil                  | Autenticado |
| `/items/:id`   | Detalle de material     | Autenticado |
| `/agenda`      | Agenda de recolecciones | Gestor      |
| `/historial`   | Historial               | Gestor      |
| `/rate`        | Evaluaciones            | Autenticado |

Estas rutas corresponden a las vistas documentadas actualmente para CirculApp.

## Comunicación con la API

El frontend utiliza **Axios** para comunicarse con el backend.

```text
┌──────────────────────┐
│        Usuario       │
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│      React + Vite    │
└──────────┬───────────┘
           │
         Axios
           │
           ▼
┌──────────────────────┐
│  Node.js + Express   │
│       REST API       │
└──────────┬───────────┘
           │
           ▼
      ┌──────────┐
      │ MongoDB  │
      └──────────┘
```

## Requisitos previos

Para ejecutar el frontend se necesita:

* Node.js.
* npm.
* Backend de CirculApp disponible.

## Instalación

### 1. Clonar el repositorio

```bash
git clone https://github.com/MayraMoy/circulappFrontend.git
```

### 2. Ingresar al proyecto

```bash
cd circulappFrontend
```

### 3. Instalar dependencias

```bash
npm install
```

## Variables de entorno

Si el proyecto utiliza una variable para definir la URL de la API, puede configurarse mediante un archivo `.env`.

Por ejemplo:

```env
VITE_API_URL=http://localhost:5000
```

> [!WARNING]
> Verificá que el nombre de la variable coincida exactamente con el utilizado actualmente en el código antes de agregarla al proyecto.

## Ejecución en desarrollo

```bash
npm run dev
```

La aplicación estará disponible en la dirección local indicada por Vite.

Habitualmente:

```text
http://localhost:5173
```

## Build de producción

Para generar la versión de producción:

```bash
npm run build
```

Para visualizar localmente el resultado:

```bash
npm run preview
```

## Estructura conceptual

```text
src/
├── components/
│   └── componentes reutilizables
│
├── pages/
│   ├── Login
│   ├── Register
│   ├── Dashboard
│   ├── Publish
│   ├── Search
│   ├── Educational
│   ├── Validate
│   ├── Profile
│   └── ...
│
├── contexts/
│   └── estado global
│
├── hooks/
│   └── hooks personalizados
│
├── services/
│   └── comunicación con API
│
└── ...
```

> [!NOTE]
> Esta estructura representa una organización conceptual. Los nombres de carpetas deben mantenerse alineados con la estructura real del repositorio.

## Flujo de autenticación

```text
Usuario
   │
   ▼
Login
   │
   ▼
Frontend
   │
   │ Credenciales
   ▼
Backend
   │
   │ JWT
   ▼
Frontend
   │
   ▼
Sesión autenticada
   │
   ▼
Acceso según rol
```

El backend utiliza JWT con una expiración de 7 días.

## Diseño responsive

CirculApp está planteado como una aplicación web responsive y accesible desde navegadores modernos.

El uso de Tailwind CSS permite construir interfaces adaptables a diferentes tamaños de pantalla.

El Plan de Gestión del Proyecto establece explícitamente como parte del alcance una plataforma web responsiva.


## Módulos

```text
CirculApp
│
├── Autenticación
│   ├── Login
│   └── Registro
│
├── Materiales
│   ├── Publicación
│   ├── Búsqueda
│   └── Detalle
│
├── Usuarios
│   └── Perfil
│
├── Procesamiento
│   ├── Validación
│   ├── Agenda
│   └── Historial
│
├── Educación
│   └── Módulo educativo
│
└── Comunidad
    └── Calificaciones
```

## Backend relacionado

El frontend consume la API desarrollada en:

[![Backend](https://img.shields.io/badge/Backend-CirculApp-000000?logo=github)](https://github.com/MayraMoy/backendCirculApp)

Repositorio:

https://github.com/MayraMoy/backendCirculApp

## Repositorio

[![GitHub](https://img.shields.io/badge/GitHub-CirculApp_Frontend-181717?logo=github)](https://github.com/MayraMoy/circulappFrontend)

Repositorio:

https://github.com/MayraMoy/circulappFrontend

## Proyecto

**CirculApp — Plataforma de Economía Colaborativa para Gestión Integral de Materiales**

Proyecto académico desarrollado en equipo.

