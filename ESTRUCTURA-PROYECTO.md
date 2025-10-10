# 📊 Estructura Completa del Proyecto React

## 🎯 Proyecto: Pastoral Universitaria La Salle

### 📁 Estructura de Carpetas

```
SallePastoral/
│
├── 📂 src/                          # Código fuente de React
│   │
│   ├── 📂 components/               # Componentes reutilizables
│   │   ├── Header.jsx              # Barra de navegación
│   │   └── Footer.jsx              # Pie de página
│   │
│   ├── 📂 pages/                    # Páginas de la aplicación
│   │   ├── Home.jsx                # Página principal
│   │   ├── Testimonios.jsx         # Galería y testimonios
│   │   ├── Actividades.jsx         # Lista de actividades
│   │   ├── Login.jsx               # Inicio de sesión
│   │   └── Registro.jsx            # Registro de usuarios
│   │
│   ├── 📂 context/                  # Context API
│   │   └── AuthContext.jsx         # Contexto de autenticación
│   │
│   ├── 📂 styles/                   # Estilos CSS Modules
│   │   ├── index.css               # Estilos globales
│   │   ├── Header.module.css       # Estilos del header
│   │   ├── Footer.module.css       # Estilos del footer
│   │   ├── Home.module.css         # Estilos de Home
│   │   ├── Testimonios.module.css  # Estilos de Testimonios
│   │   ├── Actividades.module.css  # Estilos de Actividades
│   │   └── Auth.module.css         # Estilos de Login/Registro
│   │
│   ├── App.jsx                      # Componente principal + Router
│   └── main.jsx                     # Punto de entrada de React
│
├── 📂 images/                       # Imágenes (vacío por defecto)
│
├── 📂 legacy-html/                  # Archivos HTML antiguos (respaldo)
│   ├── index.html
│   ├── testimonios.html
│   ├── actividades.html
│   ├── login.html
│   ├── registro.html
│   ├── 📂 css/
│   └── 📂 js/
│
├── index.html                       # Template HTML de React
├── package.json                     # Dependencias y scripts
├── vite.config.js                   # Configuración de Vite
├── .gitignore                       # Archivos ignorados por Git
│
├── 📄 README-REACT.md               # Documentación completa
├── 📄 INICIO-RAPIDO.md              # Guía de inicio rápido
└── 📄 ESTRUCTURA-PROYECTO.md        # Este archivo

```

## 🔧 Tecnologías Utilizadas

### Frontend
- **React 18.2.0** - Biblioteca de interfaz de usuario
- **React Router DOM 6.20.0** - Enrutamiento SPA
- **Vite 5.0.8** - Build tool ultra rápido
- **CSS Modules** - Estilos encapsulados por componente

### Dependencias de Desarrollo
- **@vitejs/plugin-react** - Plugin de React para Vite
- **@types/react** - Tipos de TypeScript para React
- **@types/react-dom** - Tipos de TypeScript para React DOM

## 🎨 Páginas y Características

### 🏠 Home (`/`)
- Hero section con llamada a la acción
- Sección "Nuestra Misión" (Fe, Comunidad, Servicio)
- Próximas 3 actividades destacadas
- CTA para registro

### 📸 Testimonios (`/testimonios`)
- Galería de fotos (6 items con placeholders)
- 6 testimonios de estudiantes
- Avatares con iniciales
- CTA para unirse

### 📅 Actividades (`/actividades`)
- 6 actividades detalladas
- Filtros por categoría:
  - Todas
  - Espirituales
  - Servicio Social
  - Formación
  - Recreativas
- Sistema de inscripción
- Sección de actividades regulares

### 🔐 Login (`/login`)
- Formulario de inicio de sesión
- Validación de campos
- Opción "Recordarme"
- Enlace a registro

### ✍️ Registro (`/registro`)
- Formulario completo de registro
- Campos: nombre, apellido, email, carrera, semestre, teléfono
- Validación en tiempo real
- Términos y condiciones

## 🧩 Componentes Principales

### Header.jsx
```jsx
- Logo
- Navegación responsive
- Menú hamburguesa (móvil)
- Botón de login/nombre de usuario
- Logout funcional
```

### Footer.jsx
```jsx
- 3 columnas de información
- Contacto
- Horarios
- Copyright
```

## 🌐 Context API

### AuthContext
```javascript
Proporciona:
- currentUser: Usuario actual
- login(email, password): Iniciar sesión
- register(userData): Registrar usuario
- logout(): Cerrar sesión
- loading: Estado de carga
```

## 💾 Gestión de Estado

### LocalStorage
```javascript
Almacena:
1. users: Array de usuarios registrados
2. currentUser: Usuario actualmente logueado
3. inscripciones: Inscripciones a actividades

Estructura de usuario:
{
  id: timestamp,
  nombre: string,
  apellido: string,
  email: string,
  carrera: string,
  semestre: string,
  telefono: string,
  password: string,
  fechaRegistro: ISOString
}
```

## 🎨 Sistema de Estilos

### Variables CSS Globales
```css
--primary-color: #2c5aa0 (Azul principal)
--secondary-color: #5c8fd6 (Azul secundario)
--accent-color: #f4a261 (Naranja)
--text-color: #333 (Texto)
--light-bg: #f8f9fa (Fondo claro)
```

### CSS Modules
Cada componente/página tiene su propio archivo CSS Module para evitar conflictos de nombres.

## 📱 Responsive Breakpoints

```css
Mobile: < 768px
Tablet: 768px - 1024px
Desktop: > 1024px
```

## 🚀 Scripts Disponibles

```bash
npm run dev      # Servidor de desarrollo
npm run build    # Construir para producción
npm run preview  # Preview de build
```

## 🔄 Flujo de Autenticación

1. Usuario va a `/registro`
2. Completa formulario
3. Sistema valida datos
4. Crea usuario en localStorage
5. Login automático
6. Redirección a home

## 📊 Rutas de la Aplicación

```javascript
/ ..................... Home
/testimonios .......... Testimonios y Galería
/actividades .......... Lista de Actividades
/login ................ Inicio de Sesión
/registro ............. Registro de Usuario
```

## 🎯 Características de Seguridad

⚠️ **Nota**: Esta es una aplicación de demostración.

En producción necesitarías:
- Backend con API REST
- Base de datos real
- JWT o OAuth
- Encriptación de contraseñas
- HTTPS
- Validación del servidor

## 📈 Próximos Pasos Sugeridos

1. ✅ Implementar backend (Node.js/Express)
2. ✅ Conectar a base de datos (MongoDB/PostgreSQL)
3. ✅ Agregar autenticación JWT
4. ✅ Sistema de upload de imágenes
5. ✅ Panel de administración
6. ✅ Tests unitarios
7. ✅ Migrar a TypeScript
8. ✅ Convertir a PWA

## 🎓 Conceptos de React Utilizados

- ✅ Functional Components
- ✅ Hooks (useState, useEffect, useContext)
- ✅ Context API
- ✅ React Router
- ✅ CSS Modules
- ✅ Controlled Components
- ✅ Event Handling
- ✅ Conditional Rendering
- ✅ Lists & Keys
- ✅ Props

---

**Creado con ❤️ para la Pastoral Universitaria La Salle**
