# 🙏 Pastoral La Salle - Sistema de Gestión Pastoral Universitaria

Sistema web para la gestión de actividades pastorales universitarias, desarrollado con **React 18** y **Vite**. Incluye gestión de testimonios, actividades, mapa interactivo de servicio social, calendario personal y panel de administración.![React](https://img.shields.io/badge/React-18.2.0-61dafb?logo=react&logoColor=white)

![Vite](https://img.shields.io/badge/Vite-5.0.8-646cff?logo=vite&logoColor=white)

---![Leaflet](https://img.shields.io/badge/Leaflet-1.9.4-199900?logo=leaflet&logoColor=white)

![License](https://img.shields.io/badge/license-MIT-green)

## 🚀 Inicio Rápido

Sistema web completo para la gestión de actividades pastorales universitarias, desarrollado con **React 18** y **Vite**. Incluye gestión de testimonios, actividades, mapa interactivo de servicio social, calendario personal y panel de administración.

### **Requisitos Previos**

- Node.js 16+ 🔗 **Repositorio**: [github.com/JorLOrT/Pastorcitos-a-la-web](https://github.com/JorLOrT/Pastorcitos-a-la-web)

- npm o yarn

---

### **Instalación y Ejecución**

## 🚀 Inicio Rápido

```bash

# 1. Clonar el repositorio### **Requisitos Previos**

## git clone "enlacito repo" Node.js 16+ 

- npm o yarn

# 2. Navegar al directorio del proyecto- Git

cd Pastorcitos-a-la-web

### **Instalación y Ejecución**

# 3. Instalar dependencias

npm install```bash

# 1. Clonar el repositorio

# 4. Iniciar el servidor de desarrollogit clone https://github.com/JorLOrT/Pastorcitos-a-la-web.git

npm run dev

```# 2. Navegar al directorio del proyecto

cd Pastorcitos-a-la-web

### **Comandos Disponibles**

# 3. Instalar dependencias

```bashnpm install

npm run dev          # Servidor de desarrollo

npm run build        # Compilar para producción# 4. Iniciar el servidor de desarrollo

npm run preview      # Vista previa del buildnpm run dev

```

# 5. Abrir en el navegador

---# La aplicación se abrirá automáticamente en http://localhost:5173

```

## ✨ Características Principales

### **Comandos Disponibles**

### 🎯 **Para Usuarios**

- 📝 Sistema de autenticación con validación completa```bash

- 📅 Explorar e inscribirse a actividades pastorales# Desarrollo

- 🗓️ Calendario personal con react-big-calendarnpm run dev          # Inicia servidor de desarrollo con hot-reload

- 💬 Galería de testimonios con fotos

- 🗺️ Mapa interactivo de servicio social (Arequipa)# Producción

- 👤 Perfil de usuario con dashboard personalnpm run build        # Compila el proyecto para producción

npm run preview      # Vista previa del build de producción

### 🔧 **Para Administradores**

- 🗺️ Gestión de ubicaciones en el mapa# Otros

- 📅 CRUD completo de actividades pastoralesnpm run lint         # Verifica errores de código (si está configurado)

- 📊 Panel de administración con sistema de pestañas```

- 🎨 Categorización de actividades

---

```

### **Frontend Core**

---- ⚛️ **React 18.2.0** - Biblioteca principal con hooks

- ⚡ **Vite 5.0.8** - Build tool ultrarrápido y dev server

## 🗺️ Rutas de la Aplicación- 🧭 **React Router DOM 6.20.0** - Navegación SPA

- 🎨 **CSS Modules** - Estilos con alcance local

| Ruta | Descripción | Requiere Auth | Requiere Admin |

|------|-------------|---------------|----------------|### **Funcionalidades Avanzadas**

| `/` | Página de inicio | ❌ | ❌ |- 🗺️ **React Leaflet 4.2.1** - Mapas interactivos con Leaflet

| `/testimonios` | Testimonios | ❌ | ❌ |- 📅 **React Big Calendar** - Calendario de eventos completo

| `/actividades` | Actividades | ❌ | ❌ |- 🕐 **date-fns** - Manejo eficiente de fechas

| `/mapa-servicio` | Mapa interactivo | ❌ | ❌ |- 🔄 **Context API** - Gestión de estado global

| `/login` | Inicio de sesión | ❌ | ❌ |- 💾 **localStorage** - Persistencia de datos del lado del cliente

| `/registro` | Registro | ❌ | ❌ |

| `/perfil` | Dashboard personal | ✅ | ❌ |---

| `/admin` | Panel admin | ✅ | ✅ |

---

## 📅 Categorías de Actividades

| Categoría | Icono | Color | Ejemplos |
|-----------|-------|-------|----------|
| **Espiritual** | 🙏 | Azul `#0423A4` | Misas, retiros, adoración |
| **Servicio Social** | 🤝 | Rosa `#ec4899` | Voluntariados, visitas |
| **Formación** | 📚 | Azul claro `#2f5dd1` | Talleres, charlas |
| **Recreativa** | 🎉 | Dorado `#fbbf24` | Convivencias, juegos |

---

## 📱 Diseño Responsive

Breakpoints optimizados:

- 📱 **Mobile**: < 768px
  - Menú hamburguesa
  - Layout vertical
  - Cards apiladas

- 📱 **Tablet**: 768px - 1200px  
  - Grid adaptativo
  - Elementos más compactos
  - Optimizado para touch

- 💻 **Desktop**: > 1200px
  - Layout completo
  - Navegación horizontal
  - Espaciado generoso

---

## 🗺️ Mapa de Servicio Social

### **Ubicaciones Predeterminadas de Arequipa**

El mapa incluye **12 ubicaciones reales** de Arequipa, Perú:

- **3 Albergues para Niños**:
  - Aldea Infantil SOS Arequipa
  - Hogar de Niños María Reina
  - Casa Hogar Niño Jesús

- **3 Albergues para Ancianos**:
  - Asilo de Ancianos Santa Ana
  - Hogar del Adulto Mayor San Vicente de Paul
  - Casa Hogar La Divina Providencia

- **6 Ollas Comunes**:
  - Olla Común Alto Selva Alegre
  - Olla Común Juan Pablo II
  - Olla Común Miraflores
  - Olla Común Paucarpata Unida
  - Olla Común Hunter Solidario
  - Olla Común Socabaya Unida

**Coordenadas**: Centrado en Arequipa (-16.4090, -71.5370)

---

## 🔐 Seguridad y Permisos

### **Niveles de Acceso**

1. **Visitante** (sin autenticación):
   - ✅ Ver actividades, testimonios, mapa
   - ❌ Inscribirse a actividades
   - ❌ Acceder al perfil

2. **Usuario Registrado**:
   - ✅ Todo lo anterior
   - ✅ Inscribirse a actividades
   - ✅ Ver perfil personal y calendario
   - ❌ Acceder al panel de administración

3. **Administrador** (`admin@pastoral.com`):
   - ✅ Todo lo anterior
   - ✅ Panel de administración
   - ✅ Crear/editar/eliminar actividades
   - ✅ Gestionar ubicaciones del mapa

### **Validaciones Implementadas**
- ✅ Email único (no duplicados)
- ✅ Contraseña mínimo 8 caracteres
- ✅ Validación de campos obligatorios
- ✅ Redirección automática si no hay permisos

---

## 🎯 Funcionalidades Destacadas

### **Panel de Administración**

Accesible en `/admin` (solo para administradores):

#### **Pestaña: Mapa de Servicio**
- ➕ Agregar nuevas ubicaciones
- ✏️ Editar ubicaciones existentes
- 🗑️ Eliminar ubicaciones
- 🔄 Resetear a ubicaciones predeterminadas de Arequipa
- 📍 Gestión de coordenadas (lat, lng)

#### **Pestaña: Actividades Pastorales**
- ➕ Crear nuevas actividades
- ✏️ Editar actividades existentes
- 🗑️ Eliminar actividades
- 🎨 Asignar categorías
- 📅 Configurar fecha, hora, lugar
- 👥 Definir capacidad/cupos

---

## 📄 Licencia

Este proyecto está bajo la **Licencia MIT**.

```
MIT License

Copyright (c) 2025 Toribianitos

Se concede permiso, de forma gratuita, a cualquier persona que obtenga una copia
de este software y archivos de documentación asociados...
```

Ver [LICENSE](LICENSE) para más detalles.

---

## 👨‍💻 Autor

**Toribianitos**

- 🔗 Repositorio: [Pastorcitos-a-la-web](https://github.com/JorLOrT/Pastorcitos-a-la-web)

---

## 🌟 Características

- **Página de Inicio**: Presentación de la misión pastoral y próximas actividades
- **Sección de Testimonios**: Galería de fotos y testimonios de estudiantes
- **Actividades**: Listado completo de actividades con filtros por categoría
- **Sistema de Autenticación**: Registro e inicio de sesión para estudiantes
- **Inscripción a Actividades**: Los usuarios pueden inscribirse a las actividades
- **Diseño Responsivo**: Optimizado para dispositivos móviles, tablets y escritorio

## 📁 Estructura del Proyecto

```
SallePastoral/
│
├── index.html              # Página principal
├── testimonios.html        # Galería de fotos y testimonios
├── actividades.html        # Lista de actividades pastorales
├── login.html              # Inicio de sesión
├── registro.html           # Registro de nuevos usuarios
│
├── css/
│   └── styles.css          # Estilos principales
│
├── js/
│   ├── main.js             # Funcionalidades principales
│   ├── auth.js             # Sistema de autenticación
│   └── actividades.js      # Gestión de actividades
│
├── images/                 # Carpeta para imágenes (vacía por defecto)
│
└── README.md               # Este archivo
```

## 🚀 Cómo Usar

1. **Abrir el proyecto**: Simplemente abre el archivo `index.html` en tu navegador web favorito.

2. **Navegar por el sitio**: 
   - Explora las diferentes secciones desde el menú de navegación
   - Lee testimonios de otros estudiantes
   - Revisa las actividades disponibles

3. **Registrarse**:
   - Haz clic en "Registrarse" o en el botón "Iniciar Sesión"
   - Completa el formulario de registro con tus datos
   - Acepta los términos y condiciones

4. **Iniciar Sesión**:
   - Una vez registrado, inicia sesión con tu correo y contraseña
   - Tus datos se guardan de forma local en tu navegador

5. **Inscribirse a Actividades**:
   - Una vez logueado, ve a la sección de Actividades
   - Haz clic en "Inscribirse" en la actividad de tu interés
   - Recibirás una confirmación

## 🎨 Personalización

### Colores
Los colores principales se definen en `css/styles.css` usando variables CSS:

```css
:root {
    --primary-color: #2c5aa0;      /* Azul principal */
    --secondary-color: #5c8fd6;    /* Azul secundario */
    --accent-color: #f4a261;       /* Color de acento (naranja) */
}
```

### Imágenes
Para agregar imágenes:
1. Coloca tus imágenes en la carpeta `images/`
2. En la galería de `testimonios.html`, reemplaza los placeholders con:
```html
<img src="images/tu-imagen.jpg" alt="Descripción">
```

### Actividades
Para agregar más actividades, edita el archivo `actividades.html` y añade un nuevo bloque:
```html
<div class="activity-full-card" data-category="tipo">
    <!-- Contenido de la actividad -->
</div>
```
## 📱 Responsive Design

La aplicación está optimizada para:
- 📱 Móviles (< 768px)
- 📱 Tablets (768px - 1024px)
- 💻 Escritorio (> 1024px)

## 🛠️ Tecnologías Utilizadas

- **HTML5**: Estructura semántica
- **CSS3**: Estilos modernos con Flexbox y Grid
- **JavaScript (Vanilla)**: Funcionalidades interactivas

**Desarrollado con ❤️ para la Pastoral Universitaria La Salle**
