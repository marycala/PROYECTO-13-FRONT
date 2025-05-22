# 🎉 Eventify - Frontend

Este es el frontend de **Eventify**, una aplicación web fullstack para descubrir, crear y gestionar eventos. Incluye autenticación, roles (usuarios y admin), eventos con imágenes, favoritos, asistencia y administración desde un panel.

---

## Tecnologías

- React 18
- Chakra UI (Componentes y estilos)
- React Router DOM (Rutas y navegación)
- Vite (Build tool)

- **Despliegue:**
  - Entorno local con instrucciones abajo
  - Preparado para despliegue en servidores compatibles con Node.js

---

## Características principales

- Registro, login y autenticación con roles (usuario y admin)
- Visualización de eventos listados con filtros: categorías, título, precio, fecha, ubicación
- Creación, edición y borrado de eventos (solo admin o creador)
- Gestión de eventos favoritos por usuario (guardados en DB)
- Vista para eventos asistidos (gestión de asistencia)
- Diseño responsive con Chakra UI
- Confirmación en borrado con modal personalizado (`ConfirmDialog`)
- Navegación adaptable con menú hamburguesa
- Logo con imagen personalizada en header

---

## Estructura del proyecto

/src
├── components
│ ├── AttendButton
│ │ └── AttendButton.jsx
│ ├── ConfirmDialog
│ │ └── ConfirmDialog.jsx
│ ├── EventActionButtons
│ │ └── EventActionButtons.jsx
│ ├── EventCard
│ │ └── EventCard.jsx
│ ├── EventDetailContent
│ │ └── EventDetailContent.jsx
│ ├── EventForm
│ │ └── EventForm.jsx
│ ├── FavoriteButton
│ │ └── FavoriteButton.jsx
│ ├── Filters
│ │ └── Filters.jsx
│ ├── Footer
│ │ └── Footer.jsx
│ ├── GoBackButton
│ │ └── GoBackButton.jsx
│ ├── Header
│ │ └── Header.jsx
│ ├── LoadingSpinner
│ │ └── LoadingSpinner.jsx
│ ├── Logo
│ │ └── Logo.jsx
│ └── ScrollToTopButton
│ └── ScrollToTopButton.jsx
│
├── context
│ ├── useAttendance.jsx
│ └── useFavorites.jsx
│
├── hooks
│ ├── useAuthForm.js
│ ├── useCreateEventForm.js
│ ├── useEditEventForm.js
│ ├── useEventActions.js
│ ├── useEventDetail.js
│ ├── useEventFilters.js
│ └── useFetchEvents.js
│
├── pages
│ ├── Home
│ │ └── Home.jsx
│ ├── Events
│ │ └── Events.jsx
│ ├── EventDetail
│ │ └── EventDetail.jsx
│ ├── Login
│ │ └── Login.jsx
│ ├── Register
│ │ └── Register.jsx
│ ├── CreateEvent
│ │ └── CreateEvent.jsx
│ ├── Favorites
│ │ └── Favorites.jsx
│ ├── MyAttendances
│ │ └── MyAttendances.jsx
│ ├── EditEvent
│ │ └── EditEvent.jsx
│ └── NotFound
└── NotFound.jsx
│
├── store
│ ├── auth.jsx
│ └── attendance.jsx
│
├── router
│ └── index.jsx
│
├── theme
│ └── theme.js
│
├── utils
│ └── apiFetch.js
│
└── main.jsx

---

## Cómo correr el proyecto localmente

### Pre-requisitos

- Node.js 18+
- npm o yarn
- MongoDB en local o en la nube

### Pasos

1. Clona el repositorio

```bash
git clone https://github.com/MaryCala/PROYECTO-13-FRONT.git
cd PROYECTO-13-BACK
```

2. Instala dependencias

```bash
npm install
```

3. Corre el backend

```bash
npm run dev
```

4. Corre el frontend

```bash
npm run dev
```

5. Abre http://localhost:300 (o puerto que use vite) para usar la app

---

## Uso y rutas importantes

- / - Página principal con fondo fullscreen, texto y botón para explorar eventos
- /events - Listado general con filtros y paginación
- /events/create - Formulario para crear eventos (solo usuarios autenticados)
- /edit/:id - Edición de evento (solo admin o creador)
- /favorites - Eventos favoritos del usuario logueado
- /attendances - Eventos a los que el usuario asistirá
- /login - Login
- /register - Registro

---

## Componentes Clave

- Header: Navegación con menú responsive y logo imagen.
- Footer: Pie de página fijo con enlaces y derechos reservados.
- EventCard: Tarjeta para cada evento con imagen, detalles, botones de favoritos y acciones.
- EventActionButtons: Botones para editar/borrar solo para admin o creador, con confirmación.
- ConfirmDialog: Modal reutilizable para confirmar acciones importantes.
- Logo: Componente que muestra imagen personalizada en header.

---

## Estado Global y Contextos

- useAuth: Maneja autenticación y roles de usuario.
- AttendanceContext: Maneja la asistencia a eventos.
- FavoritesContext: Para manejar favoritos de forma global.

---

## Estilos y UI

- Chakra UI para componentes y diseño responsive
- Uso de Flex, Box, Button, Text para estructura y estilos
- overflow="hidden" en elementos específicos para evitar scroll no deseado
- Diseño adaptable con media queries integradas en Chakra UI

---

## Ideas y Próximos pasos

- Añadir notificaciones en tiempo real para eventos
- Añadir validaciones más estrictas en formularios
- Mejorar accesibilidad y tests automáticos
- Verificación por un administrador de un evento antes de poder subirlo a la página de eventos

---

## Contacto

Proyecto desarrollado por Mary Cala
Para dudas o colaboración, contactar por email: marycala87@gmail.com

---

## Licencia

MIT License © 2025 Mary Cala
