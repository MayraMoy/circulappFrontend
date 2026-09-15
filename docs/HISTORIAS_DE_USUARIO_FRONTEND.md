# Documento de Especificación de Historias de Usuario (HU) - Frontend CirculApp

**Proyecto:** CirculApp - Interfaz Web de Economía Circular y Gestión Comunitaria de Residuos  
**Fecha:** 30 de Agosto de 2026  
**Total de Historias de Usuario:** 40  
**Distribución:** 
- **Sprint 1 (HU-01 a HU-20):** Pantallas iniciales, flujos de autenticación (login/registro), navegación base, vistas principales del núcleo de la aplicación y componentes visuales core.
- **Sprint 2 (HU-21 a HU-40):** Vistas avanzadas, paneles de control (dashboards), formularios complejos, visualización de mapas o listados detallados, manejo de estados de carga/error visuales y notificaciones in-app.

---

## 📌 Tabla de Contenidos

1. [Sprint 1: Pantallas Iniciales, Autenticación, Navegación y Vistas Core](#-sprint-1-pantallas-iniciales-autenticación-navegación-y-vistas-core)
   - [HU-01: Formulario de Inicio de Sesión (Login)](#id-hu-01)
   - [HU-02: Formulario de Registro con Medidor de Fortaleza](#id-hu-02)
   - [HU-03: Pantalla de Solicitud de Recuperación de Contraseña](#id-hu-03)
   - [HU-04: Pantalla de Restablecimiento de Contraseña](#id-hu-04)
   - [HU-05: Modal Informativo Institucional "Acerca de CirculApp"](#id-hu-05)
   - [HU-06: Barra de Navegación Principal (Navbar) Responsiva](#id-hu-06)
   - [HU-07: Menú Desplegable de Perfil de Usuario](#id-hu-07)
   - [HU-08: Pie de Página Institucional (Footer)](#id-hu-08)
   - [HU-09: Catálogo Público de Materiales Reciclables](#id-hu-09)
   - [HU-10: Barra de Búsqueda y Filtros Rápidos por Categoría](#id-hu-10)
   - [HU-11: Componente Visual de Estado del Material (StateBadge)](#id-hu-11)
   - [HU-12: Vista Detallada de Publicación de Material](#id-hu-12)
   - [HU-13: Formulario Base de Publicación de Materiales](#id-hu-13)
   - [HU-14: Componente de Carga y Previsualización de Fotografías](#id-hu-14)
   - [HU-15: Vista y Edición del Perfil de Usuario](#id-hu-15)
   - [HU-16: Componente Guardián de Rutas Privadas (ProtectedRoute)](#id-hu-16)
   - [HU-17: Componente de Acceso Condicional por Roles (RoleRoute)](#id-hu-17)
   - [HU-18: Portal Educativo de Economía Circular](#id-hu-18)
   - [HU-19: Pantalla de Error 404 Personalizada](#id-hu-19)
   - [HU-20: Límite Visual de Captura de Errores (ErrorBoundary)](#id-hu-20)
2. [Sprint 2: Dashboards, Formularios Complejos, Notificaciones y Moderación](#-sprint-2-dashboards-formularios-complejos-notificaciones-y-moderación)
   - [HU-21: Panel de Control (Dashboard) Polimórfico por Rol](#id-hu-21)
   - [HU-22: Dashboard de Donante con Historial e Impacto](#id-hu-22)
   - [HU-23: Dashboard de Gestor Comunal y Flujo de Acopio](#id-hu-23)
   - [HU-24: Dashboard Administrativo con KPIs e Impacto Ambiental](#id-hu-24)
   - [HU-25: Asistente Interactivo de Geolocalización y Dirección](#id-hu-25)
   - [HU-26: Checklist Interactivo de Certificación de Fardos](#id-hu-26)
   - [HU-27: Acción Rápida de Fardado de Material](#id-hu-27)
   - [HU-28: Modal Interactivo de Calificación Comunitaria](#id-hu-28)
   - [HU-29: Visualización de Reputación y Reseñas en Perfil](#id-hu-29)
   - [HU-30: Modal de Reporte y Denuncia de Infracciones](#id-hu-30)
   - [HU-31: Bandeja de Moderación de Denuncias para Staff](#id-hu-31)
   - [HU-32: Tabla de Gestión y Auditoría de Usuarios (Admin)](#id-hu-32)
   - [HU-33: Modal de Modificación Administrativa de Usuarios](#id-hu-33)
   - [HU-34: Modal de Inspección de Publicaciones por Usuario](#id-hu-34)
   - [HU-35: Modal de Generación y Exportación de Reportes Excel](#id-hu-35)
   - [HU-36: Campana de Notificaciones en Navbar con Badge](#id-hu-36)
   - [HU-37: Centro Desplegable de Notificaciones In-App](#id-hu-37)
   - [HU-38: Vista de Planificación y Agenda de Recolección](#id-hu-38)
   - [HU-39: Vista de Archivo Histórico y Trazabilidad](#id-hu-39)
   - [HU-40: Widget Flotante de Conmutación de Roles (Dev)](#id-hu-40)

---

# 🚀 SPRINT 1: Pantallas Iniciales, Autenticación, Navegación y Vistas Core

---

### **ID: HU-01**
* **Sprint:** Sprint 1
* **Como:** Usuario registrado o visitante.
* **Quiero:** Visualizar e interactuar con la pantalla de inicio de sesión (`/login`).
* **Para que:** Pueda ingresar mi correo electrónico y contraseña con validaciones visuales inmediatas y acceder a mi cuenta.
* **Criterios de aceptación:**
  * Si el usuario deja campos vacíos o con formato inválido, mostrar mensajes de error inline y deshabilitar el botón de submit o resaltar los bordes en color rojo.
  * Mientras se procesa la solicitud con la API, transformar el botón de ingreso mostrando un spinner de carga (`LoadingSpinner`) e inhabilitar reenvíos duplicados.
  * Si el backend retorna un error de credenciales incorrectas o cuenta suspendida, desplegar una alerta visual superior (`ErrorToast` o banner rojo) con el mensaje de error correspondiente.

---

### **ID: HU-02**
* **Sprint:** Sprint 1
* **Como:** Nuevo usuario de la comunidad.
* **Quiero:** Completar el formulario de registro (`/register`) que incluye nombre, email, contraseña y medidor interactivo de seguridad.
* **Para que:** Pueda crear mi cuenta asegurando que cumpla con los estándares de seguridad requeridos de forma guiada.
* **Criterios de aceptación:**
  * Al escribir la contraseña, actualizar dinámicamente la barra de progreso `PasswordStrengthMeter` indicando el nivel de complejidad (débil, media, fuerte) con cambios de color.
  * Si las contraseñas ingresadas en "Contraseña" y "Confirmar Contraseña" no coinciden, mostrar una advertencia visual inmediata antes de permitir el envío.
  * Si el registro es exitoso, almacenar el token en el contexto de autenticación (`AuthContext`) y redirigir fluidamente al usuario a la vista principal o catálogo.

---

### **ID: HU-03**
* **Sprint:** Sprint 1
* **Como:** Usuario que ha olvidado sus credenciales.
* **Quiero:** Acceder a la vista de recuperación de contraseña (`/forgot-password`) e ingresar mi correo registrado.
* **Para que:** El sistema me confirme visualmente el despacho de las instrucciones de restablecimiento.
* **Criterios de aceptación:**
  * Validar en tiempo real que el formato de email sea válido antes de habilitar el botón "Enviar instrucciones".
  * Al procesar la solicitud con éxito, reemplazar el formulario por un estado visual de confirmación con ícono de correo y botón de retorno al login.
  * Ofrecer un enlace accesible y visible para regresar a la pantalla de inicio de sesión en caso de recordar la contraseña.

---

### **ID: HU-04**
* **Sprint:** Sprint 1
* **Como:** Usuario con token de recuperación recibido por correo.
* **Quiero:** Visualizar la pantalla de restablecimiento de contraseña (`/reset-password/:token`) con campos de nueva clave.
* **Para que:** Pueda ingresar y confirmar mi nueva credencial de forma segura en la interfaz.
* **Criterios de aceptación:**
  * Ocultar o mostrar los caracteres mediante un botón de alternancia de visibilidad (ícono de ojo).
  * Si el token presente en la URL ha expirado o es inválido al enviarse, desplegar un banner de error con opción para solicitar un nuevo enlace.
  * Tras un cambio exitoso, mostrar un mensaje de éxito y un botón que redirija automáticamente a `/login`.

---

### **ID: HU-05**
* **Sprint:** Sprint 1
* **Como:** Visitante o usuario de la plataforma.
* **Quiero:** Abrir el modal informativo "Acerca de CirculApp" desde las pantallas de autenticación o pie de página.
* **Para que:** Pueda conocer la misión, pilares ecológicos y beneficios de la economía circular promovida por la aplicación.
* **Criterios de aceptación:**
  * Desplegar el modal con animación suave, fondo desenfocado (*backdrop blur*) y contenido dividido en secciones ilustradas.
  * Permitir cerrar el modal haciendo clic en el botón de cierre (X), pulsando la tecla `Escape` o haciendo clic fuera del contenedor.
  * Adaptar la visualización del contenido en dispositivos móviles mediante scroll vertical interno sin desbordar la pantalla.

---

### **ID: HU-06**
* **Sprint:** Sprint 1
* **Como:** Usuario navegando en cualquier dispositivo (móvil, tablet o escritorio).
* **Quiero:** Disponer de una barra de navegación superior (`Navbar`) fija con enlaces contextuales y menú hamburguesa en pantallas pequeñas.
* **Para que:** Pueda desplazarme ágilmente entre el catálogo, publicaciones, validación, panel y centro educativo.
* **Criterios de aceptación:**
  * En pantallas de escritorio, renderizar el menú horizontal con íconos vectoriales SVG y resaltar visualmente la ruta activa (`NavLink active`).
  * En pantallas móviles (< 768px), contraer la navegación en un menú lateral/desplegable interactivo accionado por el botón hamburguesa.
  * Ajustar automáticamente las opciones visibles en la barra dependiendo de si el usuario es visitante o usuario autenticado (mostrando u ocultando accesos protegidos).

---

### **ID: HU-07**
* **Sprint:** Sprint 1
* **Como:** Usuario autenticado en la plataforma.
* **Quiero:** Hacer clic en mi avatar o nombre en la barra superior para abrir el menú desplegable (`ProfileDropdown`).
* **Para que:** Pueda acceder rápidamente a mi perfil, ver mi rol actual y cerrar sesión con un solo clic.
* **Criterios de aceptación:**
  * Mostrar en la cabecera del dropdown el nombre del usuario, su email y una etiqueta distintiva con su rol (`user`, `gestor`, `admin`).
  * Al hacer clic en "Cerrar Sesión", limpiar el estado global de autenticación, remover el token de `localStorage` y redirigir inmediatamente a `/login`.
  * Cerrar automáticamente el menú desplegable si el usuario hace clic en cualquier área externa de la pantalla.

---

### **ID: HU-08**
* **Sprint:** Sprint 1
* **Como:** Usuario que explora el sitio.
* **Quiero:** Visualizar el pie de página (`Footer`) en la parte inferior de todas las vistas públicas y privadas.
* **Para que:** Pueda consultar enlaces de navegación rápida, información sobre economía circular y créditos institucionales.
* **Criterios de aceptación:**
  * Estructurar el footer en columnas responsivas que incluyan accesos directos, políticas de sustentabilidad y enlaces de contacto.
  * Mantenerse siempre anclado al final del viewport utilizando la estructura de flexbox del layout base (`min-h-screen flex flex-col`).
  * Incluir un acceso directo para abrir el modal "Acerca de CirculApp" y redirigir a la sección `/educational`.

---

### **ID: HU-09**
* **Sprint:** Sprint 1
* **Como:** Donante, reciclador o gestor comunal.
* **Quiero:** Navegar por la pantalla de catálogo de materiales (`/search`) presentada en una cuadrícula responsiva de tarjetas.
* **Para que:** Pueda explorar visualmente los materiales reciclables disponibles con sus fotografías, títulos, ubicaciones y estados.
* **Criterios de aceptación:**
  * Renderizar cada publicación en una tarjeta que incluya foto de portada (o placeholder temático si no tiene imagen), título, categoría, dirección y badge de estado.
  * Si la consulta a la API está en proceso, mostrar esqueletos de carga (*skeletons*) o un indicador `LoadingSpinner` centrado.
  * Si no existen materiales que coincidan con la búsqueda, mostrar un estado vacío amigable con una ilustración y un botón para "Limpiar filtros".

---

### **ID: HU-10**
* **Sprint:** Sprint 1
* **Como:** Usuario que busca un material específico.
* **Quiero:** Utilizar la barra de búsqueda por texto y las píldoras de filtro por categoría (Plástico, Papel, Vidrio, Metal, Textil, Electrónico) en `/search`.
* **Para que:** El catálogo actualice automáticamente los resultados visuales sin necesidad de recargar la página.
* **Criterios de aceptación:**
  * Resaltar con color y fondo distintivo la categoría actualmente seleccionada en la botonera de filtros rápidos.
  * Permitir alternar entre categorías con un solo clic o seleccionar "Todas" para restablecer el catálogo completo.
  * Integrar un selector de estado de procesamiento (`sin_procesar`, `en_proceso`, `fardado`, `validado`) con etiquetas de color identificativas.

---

### **ID: HU-11**
* **Sprint:** Sprint 1
* **Como:** Usuario que visualiza listados o tarjetas de materiales.
* **Quiero:** Ver una insignia visual (`StateBadge`) con código de colores estandarizado en cada publicación.
* **Para que:** Pueda identificar instantáneamente la etapa en la que se encuentra el residuo en el circuito de reciclaje.
* **Criterios de aceptación:**
  * Mostrar el badge en gris para `"Sin procesar"`, ámbar para `"En proceso"`, azul para `"Fardado"` y verde esmeralda para `"Validado"`.
  * Incluir un punto de color (*status dot*) y texto en mayúscula o capitalizado legible acorde a las normas de diseño del proyecto.
  * Manejar estados desconocidos o no definidos mostrando una insignia neutra por defecto sin romper la interfaz.

---

### **ID: HU-12**
* **Sprint:** Sprint 1
* **Como:** Usuario interesado en un material reciclable.
* **Quiero:** Acceder a la vista de detalle de una publicación (`/items/:id`).
* **Para que:** Pueda ver la galería completa de imágenes, la descripción detallada, la ubicación en el mapa y la información de contacto del donante.
* **Criterios de aceptación:**
  * Presentar la fotografía principal con miniaturas secundarias seleccionables para alternar la imagen visible.
  * Mostrar una tarjeta con los datos del donante (nombre, teléfono directo, ubicación y promedio de estrellas de reputación).
  * Si el usuario autenticado es el propietario del material o administrador, mostrar visiblemente los botones de "Editar" y "Eliminar publicación".

---

### **ID: HU-13**
* **Sprint:** Sprint 1
* **Como:** Donante autenticado.
* **Quiero:** Completar el formulario de publicación de material reciclable (`/publish`).
* **Para que:** Pueda ingresar el título, descripción, categoría, dirección y fotos para ofrecer mi residuo a la comunidad.
* **Criterios de aceptación:**
  * Exigir de forma obligatoria los campos título, categoría y dirección, marcando los errores con texto en rojo si se intenta enviar vacío.
  * Desplegar un menú selector estilizado para las categorías de residuos con sus íconos representativos.
  * Al enviar exitosamente el formulario, mostrar una notificación de confirmación y redirigir al usuario al detalle de su nueva publicación o al catálogo.

---

### **ID: HU-14**
* **Sprint:** Sprint 1
* **Como:** Usuario que crea o edita un material en `/publish`.
* **Quiero:** Arrastrar o seleccionar hasta 5 imágenes y ver una previsualización inmediata en miniatura antes de guardar.
* **Para que:** Pueda comprobar la calidad visual de las fotografías y remover las que no correspondan antes de enviarlas al servidor.
* **Criterios de aceptación:**
  * Mostrar una cuadrícula con las miniaturas de las imágenes seleccionadas con un botón flotante de eliminación (ícono de papelera/cruz) en cada una.
  * Impedir la selección de más de 5 archivos simultáneos y advertir al usuario mediante un mensaje visual de error si excede la cantidad.
  * Validar en el cliente que los archivos correspondan a formatos de imagen válidos (PNG, JPG, WEBP) antes de procesar el formulario.

---

### **ID: HU-15**
* **Sprint:** Sprint 1
* **Como:** Usuario registrado.
* **Quiero:** Visualizar y editar mi perfil comunitario en la vista `/profile`.
* **Para que:** Pueda mantener actualizados mi nombre, teléfono de contacto, dirección barrial y breve biografía comunitaria.
* **Criterios de aceptación:**
  * Permitir alternar entre el modo de lectura del perfil y el formulario de edición interactivo.
  * Contabilizar visualmente los caracteres restantes del campo de biografía (máximo 500 caracteres).
  * Tras guardar cambios con éxito, actualizar los datos en el contexto global de usuario y mostrar un toast de confirmación verde.

---

### **ID: HU-16**
* **Sprint:** Sprint 1
* **Como:** Sistema de Enrutamiento Frontend (`App.jsx`).
* **Quiero:** Proteger las rutas privadas mediante el componente envoltorio `ProtectedRoute`.
* **Para que:** Cualquier usuario no autenticado que intente acceder a rutas como `/dashboard`, `/publish` o `/profile` sea interceptado y enviado a `/login`.
* **Criterios de aceptación:**
  * Si el estado de autenticación está cargando (verificando token en `localStorage`), mostrar un spinner centralizado para evitar parpadeos de interfaz (*flash of unauthenticated content*).
  * Si no existe un usuario autenticado válido, redirigir a `/login` preservando la ruta previa para redirección posterior.
  * Si el usuario está autenticado, renderizar el componente hijo (`<Outlet />`) dentro de la estructura base del layout.

---

### **ID: HU-17**
* **Sprint:** Sprint 1
* **Como:** Sistema de Enrutamiento Frontend (`App.jsx`).
* **Quiero:** Restringir el acceso a vistas especiales mediante el componente `RoleRoute` (`allowedRoles={['gestor', 'admin']}`).
* **Para que:** Solo los usuarios con permisos adecuados puedan visualizar pantallas de validación técnica o gestión de usuarios.
* **Criterios de aceptación:**
  * Si un usuario con rol estándar `user` intenta ingresar a `/validate` o `/admin/users`, denegar el acceso y redirigir a `/dashboard` o `/search`.
  * Permitir el acceso fluido sin restricciones a usuarios con roles `gestor`, `admin` o bandera `isDev: true`.
  * Mostrar una advertencia visual o notificación en caso de intento de acceso no autorizado a una vista restringida.

---

### **ID: HU-18**
* **Sprint:** Sprint 1
* **Como:** Ciudadano interesado en el reciclaje sustentable.
* **Quiero:** Explorar la sección educativa `/educational`.
* **Para que:** Pueda consultar guías visuales sobre cómo separar plásticos, metales, papeles y vidrios antes de su entrega.
* **Criterios de aceptación:**
  * Presentar tarjetas interactivas organizadas por tipo de material con consejos prácticos de limpieza y compactado.
  * Incluir infografías ilustradas sobre las etapas de la economía circular (Separación en origen -> Acopio -> Fardado -> Certificación).
  * Proveer un botón de llamada a la acción (*Call To Action*) que invite al usuario a publicar un material reciclable inmediatamente (`/publish`).

---

### **ID: HU-19**
* **Sprint:** Sprint 1
* **Como:** Usuario que ingresa a una URL inexistente o rota.
* **Quiero:** Visualizar una pantalla de error 404 personalizada y amigable (`NotFound`).
* **Para que:** Se me informe claramente que la página no existe y se me ofrezca un botón para regresar al catálogo principal.
* **Criterios de aceptación:**
  * Mostrar una ilustración alusiva a la economía circular y un mensaje claro como `"Página no encontrada"`.
  * Incluir un botón primario `"Volver al Catálogo"` que redirija a `/search`.
  * Mantener la barra de navegación superior y el pie de página para permitir continuar navegando sin quedar atrapado en la vista de error.

---

### **ID: HU-20**
* **Sprint:** Sprint 1
* **Como:** Desarrollador / Usuario final.
* **Quiero:** Contar con un componente envoltorio `ErrorBoundary` en el árbol de React.
* **Para que:** Si un componente genera un error crítico de renderizado en tiempo de ejecución, la aplicación no quede en pantalla en blanco.
* **Criterios de aceptación:**
  * Capturar excepciones no controladas en el ciclo de vida de los componentes hijos sin colapsar toda la aplicación.
  * Renderizar una pantalla de contingencia con mensaje amigable, ícono de advertencia y botón de `"Recargar aplicación"`.
  * En entorno de desarrollo, mostrar detalles técnicos del error para facilitar la depuración visual.

---

# 📦 SPRINT 2: Dashboards, Formularios Complejos, Notificaciones y Moderación

---

### **ID: HU-21**
* **Sprint:** Sprint 2
* **Como:** Usuario autenticado en `/dashboard`.
* **Quiero:** Que la vista de panel principal detecte mi rol en el `AuthContext` y renderice el dashboard correspondiente (`DashboardUsuario`, `DashboardGestor`, `DashboardAdmin`, `DashboardCoordinador`).
* **Para que:** Mi espacio de trabajo se adapte exactamente a mis responsabilidades dentro del circuito comunal.
* **Criterios de aceptación:**
  * Si el rol es `admin`, renderizar métricas globales, accesos de auditoría de usuarios y moderación de denuncias.
  * Si el rol es `gestor`, renderizar métricas operativas de fardado, materiales pendientes de acopio y acceso a validación técnica.
  * Si el rol es `user`, renderizar el resumen de mis materiales donados, su estado actual y el impacto ecológico individual.

---

### **ID: HU-22**
* **Sprint:** Sprint 2
* **Como:** Donante / Ciudadano en su panel personal (`DashboardUsuario`).
* **Quiero:** Visualizar tarjetas de estadísticas con el total de mis publicaciones activas, materiales procesados y el cálculo de CO₂ evitado.
* **Para que:** Pueda hacer seguimiento de mi contribución ambiental y administrar mis publicaciones desde una misma vista.
* **Criterios de aceptación:**
  * Desplegar tarjetas `StatCard` con cifras destacadas, íconos temáticos e indicadores de progreso.
  * Listar mis publicaciones con opciones directas para ver detalle, editar o eliminar con confirmación modal.
  * Si el usuario aún no ha publicado ningún material, mostrar una tarjeta de bienvenida con botón para crear su primera donación.

---

### **ID: HU-23**
* **Sprint:** Sprint 2
* **Como:** Gestor Comunal en `DashboardGestor`.
* **Quiero:** Disponer de una sección de materiales pendientes de recolección y acopio con acciones directas para cambiar de estado a "fardado".
* **Para que:** Pueda gestionar el flujo de trabajo diario de la planta de reciclaje de forma ágil y visual.
* **Criterios de aceptación:**
  * Mostrar una lista priorizada de materiales en estado `"sin_procesar"` y `"en_proceso"` con sus datos de contacto y ubicación.
  * Proveer un botón de acción rápida `"Marcar como Fardado"` con diálogo de confirmación inmediata.
  * Actualizar instantáneamente la lista y las métricas operativas tras completar el fardado sin requerir recargar la página.

---

### **ID: HU-24**
* **Sprint:** Sprint 2
* **Como:** Administrador Comunal en `DashboardAdmin`.
* **Quiero:** Visualizar métricas consolidadas (total de usuarios, gestores activos, fardos validados, tasa de reciclaje y CO₂ total).
* **Para que:** Pueda monitorear el desempeño global del programa comunal y fundamentar decisiones estratégicas.
* **Criterios de aceptación:**
  * Consultar y renderizar los datos del endpoint `GET /api/admin/metrics` en tarjetas de KPIs visualmente atractivas.
  * Mostrar indicadores de porcentaje de efectividad de reciclaje con barras de progreso o gráficos visuales.
  * Proveer botones de acceso directo a la gestión de usuarios, moderación de denuncias y descarga de reportes ejecutivos.

---

### **ID: HU-25**
* **Sprint:** Sprint 2
* **Como:** Usuario que publica un material en `/publish`.
* **Quiero:** Escribir una dirección en el campo de ubicación y presionar el botón de geocodificación o hacer clic en "Usar mi ubicación actual".
* **Para que:** La interfaz consulte las coordenadas mediante el servicio de ubicación y autocomplete la latitud, longitud y dirección normalizada.
* **Criterios de aceptación:**
  * Mostrar un indicador de carga en el campo de texto mientras se resuelve la geocodificación con la API de mapas.
  * Si se utiliza la geolocalización del navegador (`navigator.geolocation`), solicitar permisos y capturar las coordenadas del dispositivo.
  * Si la dirección no es localizada, mostrar una alerta visual `"No se encontró la dirección. Intenta con más detalles"` sin perder los datos previamente escritos.

---

### **ID: HU-26**
* **Sprint:** Sprint 2
* **Como:** Gestor Técnico Comunal en la vista `/validate`.
* **Quiero:** Seleccionar un fardo pendiente y completar un checklist de validación (limpieza, homogeneidad, compactado, etiquetado) con campo de observaciones.
* **Para que:** Pueda certificar formalmente la calidad técnica del lote de material reciclable en la plataforma.
* **Criterios de aceptación:**
  * Mostrar casillas de verificación interactivas para cada criterio de calidad calculando un puntaje de conformidad en tiempo real.
  * Requerir la aprobación de los criterios obligatorios antes de habilitar el botón de `"Aprobar y Certificar Fardo"`.
  * Tras confirmar la validación, mostrar un modal de éxito con el certificado generado y remover el ítem de la lista de pendientes.

---

### **ID: HU-27**
* **Sprint:** Sprint 2
* **Como:** Gestor Comunal en la vista de detalle de material (`ItemDetail`) o panel de gestor.
* **Quiero:** Disponer del botón `"Marcar como Fardado"` cuando el material se encuentra en estado inicial.
* **Para que:** Pueda registrar el cambio de estado físico del residuo con un solo clic.
* **Criterios de aceptación:**
  * Mostrar el botón únicamente a usuarios con rol `gestor`, `admin` o `dev` cuando el ítem esté en `"sin_procesar"` o `"en_proceso"`.
  * Abrir un diálogo modal de confirmación `ConfirmModal` antes de ejecutar la petición para prevenir clics accidentales.
  * Cambiar de inmediato el color y texto del `StateBadge` a azul `"Fardado"` tras la confirmación exitosa de la API.

---

### **ID: HU-28**
* **Sprint:** Sprint 2
* **Como:** Usuario que finalizó un intercambio o recolección.
* **Quiero:** Abrir el modal de calificación (`RateUserModal`) desde el perfil o detalle de material para evaluar al usuario con estrellas (1 a 5) y comentario.
* **Para que:** Pueda calificar la puntualidad y el estado del material entregado, fomentando la confianza comunitaria.
* **Criterios de aceptación:**
  * Ofrecer un selector interactivo de 5 estrellas con efecto hover y selección táctil/clic.
  * Incluir un área de texto con validación de hasta 500 caracteres para observaciones cualitativas.
  * Al enviar la calificación, deshabilitar el botón, mostrar spinner y cerrar el modal tras la confirmación con un toast de agradecimiento.

---

### **ID: HU-29**
* **Sprint:** Sprint 2
* **Como:** Usuario que visita el perfil de un recolector o donante (`/profile` o `/users/:id`).
* **Quiero:** Visualizar el resumen de reputación con el promedio de estrellas destacadas y la lista de comentarios recibidos.
* **Para que:** Pueda evaluar la seriedad y confiabilidad del usuario antes de coordinar una entrega.
* **Criterios de aceptación:**
  * Renderizar las estrellas doradas con el valor promedio numérico formateado (ej. `★ 4.8 / 5.0`) y el total de reseñas.
  * Mostrar cada opinión en una tarjeta con nombre del evaluador, fecha relativa y comentario descriptivo.
  * Si el usuario aún no posee calificaciones, mostrar el mensaje `"Este usuario aún no tiene calificaciones registradas"`.

---

### **ID: HU-30**
* **Sprint:** Sprint 2
* **Como:** Usuario que detecta una publicación sospechosa o inapropiada.
* **Quiero:** Hacer clic en el botón con ícono de bandera/alerta en el detalle del ítem para abrir el modal de denuncia (`ReportModal`).
* **Para que:** Pueda seleccionar un motivo (fraude, contenido inapropiado, spam, etc.) y describir la irregularidad para el equipo de moderación.
* **Criterios de aceptación:**
  * Proveer un selector de motivos estandarizados y un campo de texto obligatorio para detallar la denuncia.
  * Validar que el usuario esté autenticado para poder enviar el reporte; si no lo está, invitarlo a iniciar sesión.
  * Tras el envío exitoso, mostrar un mensaje de agradecimiento informando que el equipo comunal auditará el caso.

---

### **ID: HU-31**
* **Sprint:** Sprint 2
* **Como:** Administrador o Gestor de Moderación en el panel administrativo.
* **Quiero:** Visualizar la lista de reportes activos (`ReportModerationList`) con filtros por estado (`pendiente`, `revisado`, `desestimado`).
* **Para que:** Pueda auditar las quejas comunitarias y ejecutar acciones correctivas directamente desde la interfaz.
* **Criterios de aceptación:**
  * Mostrar cada denuncia con la información del denunciante, motivo, descripción, fecha y enlace directo al contenido reportado.
  * Proveer botones de acción para: `"Desestimar"`, `"Eliminar Publicación"` y `"Suspender Usuario"`.
  * Al ejecutar cualquier acción de moderación, solicitar confirmación modal y actualizar el estado de la fila en tiempo real.

---

### **ID: HU-32**
* **Sprint:** Sprint 2
* **Como:** Administrador del Sistema en `/admin/users`.
* **Quiero:** Disponer de una tabla completa de usuarios con buscador por nombre/email, selector de roles, estado activo y paginación.
* **Para que:** Pueda supervisar la base de usuarios de la comunidad y administrar sus permisos.
* **Criterios de aceptación:**
  * Permitir filtrar usuarios por término de búsqueda en tiempo real o paginar los resultados con controles de página anterior/siguiente.
  * Mostrar en cada fila el nombre, correo, teléfono, rol actual y un indicador visual de cuenta activa (verde) o suspendida (rojo).
  * Incluir botones de acción por fila para editar datos, cambiar rol, ver publicaciones asociadas y alternar estado activo/inactivo.

---

### **ID: HU-33**
* **Sprint:** Sprint 2
* **Como:** Administrador en la vista de gestión de usuarios.
* **Quiero:** Abrir el modal `EditAdminUserModal` para modificar el rol (`user`, `gestor`, `admin`), teléfono, ubicación o estado de un usuario.
* **Para que:** Pueda promover a miembros destacados a gestores comunales o corregir información de cuentas.
* **Criterios de aceptación:**
  * Cargar los datos actuales del usuario en los campos del formulario modal de forma predeterminada.
  * Validar las entradas antes de enviar y deshabilitar el botón de confirmación mientras se procesa la actualización.
  * Reflejar los cambios inmediatamente en la tabla de usuarios sin requerir una recarga completa del navegador.

---

### **ID: HU-34**
* **Sprint:** Sprint 2
* **Como:** Administrador en la gestión de usuarios.
* **Quiero:** Hacer clic en "Ver Publicaciones" de un usuario para abrir el modal `UserItemsModal`.
* **Para que:** Pueda inspeccionar todas las donaciones y materiales subidos por esa persona en una vista condensada.
* **Criterios de aceptación:**
  * Mostrar una lista de tarjetas de materiales del usuario con sus títulos, categorías, fechas y estados de procesamiento.
  * Si el usuario no tiene materiales registrados, mostrar un estado vacío `"El usuario no posee publicaciones registradas"`.
  * Permitir abrir el detalle de cualquier publicación en una pestaña nueva o editarla administrativamente.

---

### **ID: HU-35**
* **Sprint:** Sprint 2
* **Como:** Administrador o Gestor Comunal en el Dashboard.
* **Quiero:** Abrir el modal de reportes `AdminReportModal` y seleccionar el tipo de reporte (`Mensual`, `Ambiental`, `Validaciones`) en formato Excel (`.xlsx`).
* **Para que:** El frontend solicite la generación del archivo y dispare la descarga automática en mi equipo.
* **Criterios de aceptación:**
  * Ofrecer tarjetas de selección para los distintos tipos de reportes con descripciones claras de su contenido.
  * Mostrar un botón de descarga con spinner animado durante la generación del binario para indicar progreso.
  * Descargar automáticamente el archivo en el navegador con un nombre representativo (ej. `Reporte_Circulapp.xlsx`) y mostrar un toast de éxito.

---

### **ID: HU-36**
* **Sprint:** Sprint 2
* **Como:** Usuario autenticado.
* **Quiero:** Ver una campana de notificaciones (`NotificationBell`) en la barra superior con una insignia numérica roja de avisos no leídos.
* **Para que:** Pueda enterarme al instante de fardados, certificaciones de mis materiales o publicaciones cercanas.
* **Criterios de aceptación:**
  * Mostrar un contador numérico sobre la campana con la cantidad exacta de notificaciones pendientes (`unreadCount`).
  * Si no hay notificaciones nuevas, ocultar la insignia numérica roja manteniendo la campana accesible.
  * Actualizar el contador periódicamente o ante eventos clave a través del contexto global `NotificationContext`.

---

### **ID: HU-37**
* **Sprint:** Sprint 2
* **Como:** Usuario que hace clic en la campana de notificaciones.
* **Quiero:** Desplegar el menú de notificaciones in-app con la lista de alertas, botón "Marcar todas como leídas" y "Limpiar historial".
* **Para que:** Pueda leer los avisos, navegar directamente al ítem relacionado al hacer clic y vaciar mi bandeja.
* **Criterios de aceptación:**
  * Diferenciar visualmente las notificaciones no leídas (fondo resaltado y punto azul) de las ya leídas.
  * Al hacer clic sobre una notificación con enlace (`link`), redirigir a la vista del material y marcarla como leída automáticamente.
  * Proveer un botón `"Marcar todas como leídas"` que actualice todas las alertas y actualice el contador a 0 de forma instantánea.

---

### **ID: HU-38**
* **Sprint:** Sprint 2
* **Como:** Gestor Comunal o Coordinador de Recolección.
* **Quiero:** Acceder a la vista de Agenda de Recolección (`/agenda`).
* **Para que:** Pueda visualizar cronológicamente los turnos y puntos de retiro programados en la comuna.
* **Criterios de aceptación:**
  * Presentar un calendario o listado organizado por fechas y horarios con las direcciones de recolección y donantes asignados.
  * Proveer filtros para alternar entre turnos pendientes, completados o del día en curso.
  * Incluir botones de contacto rápido telefónico o por correo con los ofertantes de cada retiro programado.

---

### **ID: HU-39**
* **Sprint:** Sprint 2
* **Como:** Gestor o Administrador interesado en la trazabilidad.
* **Quiero:** Explorar la sección de Archivo Histórico (`/historial`).
* **Para que:** Pueda auditar el histórico completo de fardos procesados, fechas de certificación y gestores responsables.
* **Criterios de aceptación:**
  * Presentar una tabla histórica con buscador por código de fardo, categoría de material y rango de fechas.
  * Mostrar en cada registro el puntaje obtenido en la lista de chequeo de validación y las observaciones técnicas registradas.
  * Permitir exportar la vista filtrada actual a hoja de cálculo para auditorías comunales.

---

### **ID: HU-40**
* **Sprint:** Sprint 2
* **Como:** Desarrollador o Tester en entornos de desarrollo/staging.
* **Quiero:** Disponer del widget flotante `DevRoleSwitcher` anclado en la esquina inferior de la pantalla.
* **Para que:** Pueda alternar instantáneamente mi rol de usuario (`User` ⇄ `Gestor` ⇄ `Admin` ⇄ `Coordinador`) y validar la respuesta de la interfaz en caliente.
* **Criterios de aceptación:**
  * Renderizar el widget únicamente si el usuario autenticado posee la bandera `isDev: true` o `role: 'dev'`.
  * Al seleccionar un nuevo rol en el menú flotante, emitir la solicitud a `/api/auth/dev-switch-role`, renovar el token y recargar el contexto sin cerrar sesión.
  * Permitir minimizar o colapsar el widget flotante para que no interfiera con los elementos visuales de la aplicación.
