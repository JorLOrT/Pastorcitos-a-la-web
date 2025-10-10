# Pastoral Universitaria La Salle - React App

Aplicación web desarrollada en **React** para la Pastoral de una universidad, diseñada para fomentar la participación de estudiantes en actividades espirituales, de servicio social y comunitarias.

## 🌟 Características

- ⚛️ **Desarrollado con React 18** y Vite
- 🎨 **CSS Modules** para estilos encapsulados
- 🛣️ **React Router** para navegación SPA
- 🔐 **Sistema de Autenticación** con Context API
- 📱 **Diseño Responsivo** optimizado para todos los dispositivos
- 💾 **LocalStorage** para persistencia de datos
- 🎯 **Componentes Reutilizables** y código modular

## 📁 Estructura del Proyecto

```
SallePastoral/
│
├── src/
│   ├── components/          # Componentes reutilizables
│   │   ├── Header.jsx
│   │   └── Footer.jsx
│   │
│   ├── pages/              # Páginas principales
│   │   ├── Home.jsx
│   │   ├── Testimonios.jsx
│   │   ├── Actividades.jsx
│   │   ├── Login.jsx
│   │   └── Registro.jsx
│   │
│   ├── context/            # Context API
│   │   └── AuthContext.jsx
│   │
│   ├── styles/             # CSS Modules
│   │   ├── index.css
│   │   ├── Header.module.css
│   │   ├── Footer.module.css
│   │   ├── Home.module.css
│   │   ├── Testimonios.module.css
│   │   ├── Actividades.module.css
│   │   └── Auth.module.css
│   │
│   ├── App.jsx            # Componente principal
│   └── main.jsx           # Punto de entrada
│
├── index-react.html       # HTML template
├── package.json           # Dependencias del proyecto
├── vite.config.js         # Configuración de Vite
└── README.md             # Este archivo
```

## 🚀 Instalación y Configuración

### Prerrequisitos

- Node.js (versión 16 o superior)
- npm o yarn

### Pasos de Instalación

1. **Clonar o descargar el proyecto**

2. **Instalar dependencias**
```bash
npm install
```

3. **Iniciar el servidor de desarrollo**
```bash
npm run dev
```

4. **Abrir en el navegador**
El proyecto se abrirá automáticamente en `http://localhost:5173`

## 📦 Scripts Disponibles

```bash
# Modo desarrollo
npm run dev

# Construir para producción
npm run build

# Vista previa de la construcción
npm run preview
```

## 🎨 Características Técnicas

### Componentes Principales

- **Header**: Navegación responsiva con menú hamburguesa
- **Footer**: Información de contacto y horarios
- **Home**: Página principal con hero, misión y actividades destacadas
- **Testimonios**: Galería de fotos y testimonios de estudiantes
- **Actividades**: Lista filtrable de actividades con inscripción
- **Login/Registro**: Sistema completo de autenticación

### Context API - AuthContext

Maneja el estado global de autenticación:
- `currentUser`: Usuario actualmente logueado
- `login()`: Función para iniciar sesión
- `register()`: Función para registrar nuevos usuarios
- `logout()`: Función para cerrar sesión

### React Router

Rutas configuradas:
- `/` - Página de inicio
- `/testimonios` - Testimonios y galería
- `/actividades` - Lista de actividades
- `/login` - Inicio de sesión
- `/registro` - Registro de usuarios

## 💾 Gestión de Datos

La aplicación usa **localStorage** del navegador para:
- Usuarios registrados (`users`)
- Sesión actual (`currentUser`)
- Inscripciones a actividades (`inscripciones`)

```javascript
// Ejemplo de estructura de datos
{
  users: [
    {
      id: 1234567890,
      nombre: "Juan",
      apellido: "Pérez",
      email: "juan@email.com",
      carrera: "ingeniería",
      semestre: "3",
      telefono: "+123456789",
      password: "password123",
      fechaRegistro: "2025-10-09T..."
    }
  ]
}
```

## 🎯 Uso de la Aplicación

### Para Estudiantes

1. **Registro**
   - Ir a "Iniciar Sesión" → "Regístrate aquí"
   - Completar el formulario con datos personales
   - Aceptar términos y condiciones

2. **Explorar Actividades**
   - Navegar a la sección "Actividades"
   - Filtrar por categoría (Espiritual, Servicio, Formación, Recreativa)
   - Hacer clic en "Inscribirse"

3. **Ver Testimonios**
   - Navegar a "Testimonios"
   - Ver galería de fotos
   - Leer experiencias de otros estudiantes

## 🔧 Personalización

### Cambiar Colores

Edita las variables CSS en `src/styles/index.css`:

```css
:root {
  --primary-color: #2c5aa0;      /* Azul principal */
  --secondary-color: #5c8fd6;    /* Azul secundario */
  --accent-color: #f4a261;       /* Color de acento */
}
```

### Agregar Nuevas Actividades

Edita el array en `src/pages/Actividades.jsx`:

```javascript
const actividades = [
  {
    category: 'espiritual',
    day: '15',
    month: 'OCT',
    year: '2025',
    title: 'Nueva Actividad',
    description: 'Descripción...',
    // ...
  }
]
```

### Agregar Nuevos Testimonios

Edita el array en `src/pages/Testimonios.jsx`:

```javascript
const testimonios = [
  {
    initial: 'M',
    text: 'Mi testimonio...',
    name: 'María González',
    career: 'Estudiante de...'
  }
]
```

## 🛠️ Tecnologías Utilizadas

- **React 18.2** - Biblioteca de UI
- **Vite 5.0** - Build tool y dev server
- **React Router DOM 6.20** - Navegación
- **CSS Modules** - Estilos encapsulados
- **Context API** - Gestión de estado global
- **LocalStorage API** - Persistencia de datos

## 📱 Responsive Design

Breakpoints:
- Móviles: < 768px
- Tablets: 768px - 1024px
- Escritorio: > 1024px

## 🔐 Seguridad

**⚠️ Importante**: Esta es una aplicación de demostración educativa.

Para producción, implementa:
- Backend con Node.js/Express o similar
- Base de datos (MongoDB, PostgreSQL, MySQL)
- Autenticación JWT o OAuth
- Encriptación de contraseñas (bcrypt)
- Validación del lado del servidor
- HTTPS

## 🚀 Deploy

### Construcción para Producción

```bash
npm run build
```

Esto genera una carpeta `dist/` con los archivos optimizados.

### Opciones de Deploy

- **Vercel**: `vercel deploy`
- **Netlify**: Arrastra la carpeta `dist` o conecta con Git
- **GitHub Pages**: Usar `gh-pages` package
- **Firebase Hosting**: `firebase deploy`

## 📝 Próximas Mejoras

- [ ] Backend con API REST
- [ ] Base de datos real
- [ ] Autenticación con JWT
- [ ] Upload de imágenes
- [ ] Sistema de notificaciones
- [ ] Panel de administración
- [ ] Tests unitarios (Jest/Vitest)
- [ ] TypeScript
- [ ] PWA (Progressive Web App)
- [ ] Internacionalización (i18n)

## 🤝 Contribuir

Las contribuciones son bienvenidas. Para cambios importantes:

1. Fork el proyecto
2. Crea una rama (`git checkout -b feature/nueva-funcionalidad`)
3. Commit tus cambios (`git commit -m 'Agregar funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto es de código abierto y está disponible para uso educativo.

## 👥 Soporte

Para preguntas o problemas:
- Abre un issue en GitHub
- Contacta a través del formulario en la aplicación

---

**Desarrollado con ❤️ y ⚛️ React para la Pastoral Universitaria La Salle**
