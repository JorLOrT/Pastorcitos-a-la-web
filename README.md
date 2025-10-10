# 🙏 Pastoral La Salle - Sistema de Gestión Pastoral Universitaria

![React](https://img.shields.io/badge/React-18.2.0-61dafb?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5.0.8-646cff?logo=vite&logoColor=white)
![Leaflet](https://img.shields.io/badge/Leaflet-1.9.4-199900?logo=leaflet&logoColor=white)
![License](https://img.shields.io/badge/license-MIT-green)

Sistema web completo para la gestión de actividades pastorales universitarias, desarrollado con **React 18** y **Vite**. Incluye gestión de testimonios, actividades, mapa interactivo de servicio social, calendario personal y panel de administración.

🔗 **Repositorio**: [github.com/JorLOrT/Pastorcitos-a-la-web](https://github.com/JorLOrT/Pastorcitos-a-la-web)

---

## 🚀 Inicio Rápido

### **Requisitos Previos**
- Node.js 16+ 
- npm o yarn
- Git

### **Instalación y Ejecución**

```bash
# 1. Clonar el repositorio
git clone https://github.com/JorLOrT/Pastorcitos-a-la-web.git

# 2. Navegar al directorio del proyecto
cd Pastorcitos-a-la-web

# 3. Instalar dependencias
npm install

# 4. Iniciar el servidor de desarrollo
npm run dev

# 5. Abrir en el navegador
# La aplicación se abrirá automáticamente en http://localhost:5173
```

### **Comandos Disponibles**

```bash
# Desarrollo
npm run dev          # Inicia servidor de desarrollo con hot-reload

# Producción
npm run build        # Compila el proyecto para producción
npm run preview      # Vista previa del build de producción

# Otros
npm run lint         # Verifica errores de código (si está configurado)
```

---

## ✨ Características Principales

### 🎯 **Para Usuarios**
- 📝 **Sistema de Autenticación** - Registro e inicio de sesión con validación completa
- 📅 **Gestión de Actividades** - Explorar y inscribirse a eventos pastorales
- 🗓️ **Calendario Personal** - Visualización de actividades suscritas con react-big-calendar
- 💬 **Testimonios** - Galería de experiencias de la comunidad
- 🗺️ **Mapa de Servicio Social** - Mapa interactivo con:
  - 🏠 Albergues para niños
  - 👴 Albergues para ancianos  
  - 🍲 Ollas comunes de Arequipa
- 👤 **Perfil de Usuario** - Dashboard personal con inscripciones y calendario

### 🔧 **Para Administradores**
- 🗺️ **Gestión de Ubicaciones** - CRUD completo para el mapa de servicio
- 📅 **Gestión de Actividades** - Crear, editar y eliminar eventos pastorales
- 📊 **Panel de Administración** - Interfaz dedicada con sistema de pestañas
- 🎨 **Sistema de Categorías** - Organización por tipo de actividad
- 🔄 **Reseteo de Datos** - Restaurar ubicaciones predeterminadas de Arequipa

---

## 🛠️ Tecnologías Utilizadas

### **Frontend Core**
- ⚛️ **React 18.2.0** - Biblioteca principal con hooks
- ⚡ **Vite 5.0.8** - Build tool ultrarrápido y dev server
- 🧭 **React Router DOM 6.20.0** - Navegación SPA
- 🎨 **CSS Modules** - Estilos con alcance local

### **Funcionalidades Avanzadas**
- 🗺️ **React Leaflet 4.2.1** - Mapas interactivos con Leaflet
- 📅 **React Big Calendar** - Calendario de eventos completo
- 🕐 **date-fns** - Manejo eficiente de fechas
- 🔄 **Context API** - Gestión de estado global
- 💾 **localStorage** - Persistencia de datos del lado del cliente

---

## 📂 Estructura del Proyecto

```
Pastorcitos-a-la-web/
├── 📁 src/
│   ├── 📁 components/          # Componentes reutilizables
│   │   ├── Header.jsx          # Navegación principal
│   │   └── Footer.jsx          # Pie de página
│   │
│   ├── 📁 context/             # Context API
│   │   └── AuthContext.jsx    # Autenticación y estado global
│   │
│   ├── 📁 pages/               # Páginas principales
│   │   ├── Home.jsx            # Página de inicio
│   │   ├── Testimonios.jsx    # Testimonios de la comunidad
│   │   ├── Actividades.jsx    # Lista de actividades
│   │   ├── MapaServicio.jsx   # Mapa interactivo
│   │   ├── Perfil.jsx         # Dashboard de usuario
│   │   ├── Login.jsx          # Inicio de sesión
│   │   ├── Registro.jsx       # Registro de usuarios
│   │   └── AdminPanel.jsx     # Panel de administración
│   │
│   ├── 📁 styles/              # CSS Modules
│   │   ├── index.css          # Variables globales y reset
│   │   └── *.module.css       # Estilos por componente
│   │
│   ├── App.jsx                 # Componente raíz con rutas
│   └── main.jsx                # Punto de entrada
│
├── 📁 public/                   # Archivos estáticos
├── 📁 legacy-html/             # Versión HTML anterior (referencia)
├── 📄 package.json             # Dependencias del proyecto
├── 📄 vite.config.js           # Configuración de Vite
├── 📄 .gitignore               # Archivos ignorados por Git
└── 📄 README.md                # Este archivo
```

---

## 🗺️ Rutas de la Aplicación

| Ruta | Componente | Descripción | Requiere Auth | Requiere Admin |
|------|------------|-------------|---------------|----------------|
| `/` | Home | Página de inicio | ❌ No | ❌ No |
| `/testimonios` | Testimonios | Testimonios de la comunidad | ❌ No | ❌ No |
| `/actividades` | Actividades | Lista de actividades pastorales | ❌ No | ❌ No |
| `/mapa-servicio` | MapaServicio | Mapa interactivo de servicio | ❌ No | ❌ No |
| `/login` | Login | Inicio de sesión | ❌ No | ❌ No |
| `/registro` | Registro | Registro de nuevos usuarios | ❌ No | ❌ No |
| `/perfil` | Perfil | Dashboard y calendario personal | ✅ Sí | ❌ No |
| `/admin` | AdminPanel | Panel de administración | ✅ Sí | ✅ Sí |

---

## 👥 Usuarios de Prueba

### **Usuario Administrador**
```
📧 Email:    admin@pastoral.com
🔑 Password: Admin2024!
```
**Permisos**: Acceso completo al panel de administración, gestión de ubicaciones y actividades

### **Usuario Regular**
Regístrate en `/registro` con tus datos:
```
Nombre, Apellido, Email, Carrera, Semestre, Teléfono, Contraseña
```
**Permisos**: Inscripción a actividades, perfil personal, calendario

---

## 🎨 Paleta de Colores

Diseño basado en azul institucional:

| Color | Código | Uso |
|-------|--------|-----|
| **Azul Principal** | `#0423A4` | Color institucional, botones primarios |
| **Azul Oscuro** | `#031a7a` | Variante oscura para hover |
| **Azul Claro** | `#3651b8` | Variante clara para highlights |
| **Azul Secundario** | `#0530c9` | Acentos y gradientes |
| **Rosa** | `#ec4899` | Actividades de servicio social |
| **Dorado** | `#fbbf24` | Actividades recreativas |

---

## 📅 Categorías de Actividades

| Categoría | Icono | Color | Ejemplos |
|-----------|-------|-------|----------|
| **Espiritual** | 🙏 | Azul `#0423A4` | Misas, retiros, adoración |
| **Servicio Social** | 🤝 | Rosa `#ec4899` | Voluntariados, visitas |
| **Formación** | 📚 | Azul claro `#2f5dd1` | Talleres, charlas |
| **Recreativa** | 🎉 | Dorado `#fbbf24` | Convivencias, juegos |

---

## 💾 Almacenamiento de Datos

El proyecto utiliza **localStorage** para persistencia:

| Clave | Contenido | Descripción |
|-------|-----------|-------------|
| `users` | Array de usuarios | Base de datos de usuarios registrados |
| `currentUser` | Objeto de usuario | Información de sesión actual |
| `inscripciones` | Array de inscripciones | Suscripciones a actividades por usuario |
| `mapaLocations` | Array de ubicaciones | Lugares en el mapa de servicio (Arequipa) |
| `adminActivities` | Array de actividades | Eventos creados por el administrador |

**Nota**: Los datos persisten en el navegador. Para resetear, limpia el localStorage o usa las opciones de admin.

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

## 📚 Documentación Adicional

El proyecto incluye guías detalladas en formato Markdown:

| Archivo | Descripción |
|---------|-------------|
| `ADMIN-ACTIVIDADES-GUIA.md` | Guía completa del panel de administración |
| `COMO-AGREGAR-ACTIVIDAD.md` | Tutorial paso a paso para crear actividades |
| `COLOR-AZUL-ACTUALIZADO.md` | Sistema de diseño y paleta de colores |
| `PESTAÑA-ADMIN-HEADER.md` | Navegación y acceso administrativo |
| `HEADER-LAYOUT-CORREGIDO.md` | Correcciones de UI/UX |
| `MAPA-AREQUIPA.md` | Ubicaciones y coordenadas del mapa |
| `SUBIR-A-GITHUB.md` | Guía para colaboradores |

---

## 🤝 Contribuir

¡Las contribuciones son bienvenidas! Para colaborar:

### **Proceso de Contribución**

1. **Fork** el repositorio
```bash
# En GitHub, haz click en "Fork"
```

2. **Clonar** tu fork
```bash
git clone https://github.com/TU_USUARIO/Pastorcitos-a-la-web.git
cd Pastorcitos-a-la-web
```

3. **Crear** una rama para tu feature
```bash
git checkout -b feature/nueva-funcionalidad
```

4. **Desarrollar** y hacer commits
```bash
git add .
git commit -m "Add: Nueva funcionalidad increíble"
```

5. **Push** a tu fork
```bash
git push origin feature/nueva-funcionalidad
```

6. **Abrir** un Pull Request en GitHub

### **Convenciones de Commits**
```
Add: Nueva funcionalidad
Fix: Corrección de bug
Update: Actualización de código existente
Docs: Cambios en documentación
Style: Cambios de formato (sin afectar lógica)
Refactor: Refactorización de código
Test: Agregar o modificar tests
```

---

## 🐛 Reportar Bugs

Si encuentras un error, abre un **Issue** en GitHub con:

- ✅ Descripción clara del problema
- ✅ Pasos para reproducir
- ✅ Comportamiento esperado vs actual
- ✅ Screenshots (si aplica)
- ✅ Navegador y versión
- ✅ Mensajes de error (consola)

---

## 🚀 Roadmap

### **Próximas Características**
- [ ] Backend con Node.js + Express
- [ ] Base de datos MongoDB/PostgreSQL
- [ ] Autenticación JWT
- [ ] Sistema de notificaciones por email
- [ ] Envío automático de recordatorios
- [ ] Dashboard de estadísticas para admin
- [ ] Sistema de comentarios en actividades
- [ ] Galería de fotos con upload
- [ ] Chat en tiempo real
- [ ] PWA (Progressive Web App)
- [ ] Dark mode
- [ ] Exportar calendario a .ics
- [ ] Integración con Google Calendar
- [ ] Certificados digitales de participación

---

## 📄 Licencia

Este proyecto está bajo la **Licencia MIT**.

```
MIT License

Copyright (c) 2025 Jorge

Se concede permiso, de forma gratuita, a cualquier persona que obtenga una copia
de este software y archivos de documentación asociados...
```

Ver [LICENSE](LICENSE) para más detalles.

---

## 👨‍💻 Autor

**Jorge** - Desarrollo Full Stack

- 🌐 GitHub: [@JorLOrT](https://github.com/JorLOrT)
- 📧 Email: pastoral@lasalle.edu
- 🔗 Repositorio: [Pastorcitos-a-la-web](https://github.com/JorLOrT/Pastorcitos-a-la-web)

---

## 🙏 Agradecimientos

- ⚛️ **React Team** - Por la increíble biblioteca
- ⚡ **Vite Team** - Por el build tool ultrarrápido  
- 🗺️ **Leaflet** - Por los mapas interactivos
- 📅 **React Big Calendar** - Por el componente de calendario
- 🎓 **La Salle** - Por la inspiración y apoyo
- 💙 **Comunidad Open Source** - Por las herramientas y recursos

---

## 📞 Contacto y Soporte

¿Necesitas ayuda o tienes preguntas?

- 📧 **Email**: pastoral@lasalle.edu
- 🌐 **Website**: [pastoral-lasalle.com](https://pastoral-lasalle.com)
- 💬 **Issues**: [GitHub Issues](https://github.com/JorLOrT/Pastorcitos-a-la-web/issues)
- 📖 **Wiki**: [Documentación](https://github.com/JorLOrT/Pastorcitos-a-la-web/wiki)

---

## 📊 Estadísticas del Proyecto

- 📁 **Archivos**: 52+
- 💻 **Líneas de código**: 14,000+
- ⚛️ **Componentes React**: 10+
- 🎨 **Módulos CSS**: 10+
- 📚 **Páginas**: 8
- 🗺️ **Ubicaciones en mapa**: 12 (Arequipa)

---

## ⭐ ¿Te Gusta el Proyecto?

Si este proyecto te ha sido útil:

1. ⭐ **Dale una estrella** en GitHub
2. 🍴 **Haz un fork** para tus propios proyectos
3. 📣 **Compártelo** con otros desarrolladores
4. 🤝 **Contribuye** con mejoras

---

<div align="center">

### **Hecho con ❤️ para la comunidad universitaria de La Salle**

[![GitHub](https://img.shields.io/badge/GitHub-JorLOrT-181717?logo=github)](https://github.com/JorLOrT)
[![React](https://img.shields.io/badge/React-18.2.0-61dafb?logo=react)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.0.8-646cff?logo=vite)](https://vitejs.dev/)

**⭐ Si te gusta este proyecto, dale una estrella en GitHub ⭐**

[🔗 Ver Repositorio](https://github.com/JorLOrT/Pastorcitos-a-la-web) | [📖 Documentación](https://github.com/JorLOrT/Pastorcitos-a-la-web/wiki) | [🐛 Reportar Bug](https://github.com/JorLOrT/Pastorcitos-a-la-web/issues)

</div>

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

## 💾 Almacenamiento de Datos

La aplicación usa **localStorage** del navegador para guardar:
- Usuarios registrados
- Sesión actual
- Inscripciones a actividades

**Nota**: Los datos se almacenan localmente en tu navegador. Si limpias el caché o los datos del navegador, se perderá la información.

## 📱 Responsive Design

La aplicación está optimizada para:
- 📱 Móviles (< 768px)
- 📱 Tablets (768px - 1024px)
- 💻 Escritorio (> 1024px)

## 🛠️ Tecnologías Utilizadas

- **HTML5**: Estructura semántica
- **CSS3**: Estilos modernos con Flexbox y Grid
- **JavaScript (Vanilla)**: Funcionalidades interactivas
- **LocalStorage**: Almacenamiento local de datos

## 🔐 Seguridad

**Importante**: Esta es una aplicación de demostración. Para un entorno de producción:
- Implementa un backend real con base de datos
- Usa autenticación segura (JWT, OAuth)
- Encripta las contraseñas (nunca las almacenes en texto plano)
- Implementa validación del lado del servidor
- Usa HTTPS

## 📝 Funcionalidades Futuras (Sugerencias)

- [ ] Backend con Node.js/Express
- [ ] Base de datos (MongoDB, MySQL)
- [ ] Sistema de notificaciones por email
- [ ] Calendario interactivo de actividades
- [ ] Panel de administración
- [ ] Chat en tiempo real
- [ ] Sistema de puntos/gamificación
- [ ] Integración con redes sociales
- [ ] Galería de fotos con upload
- [ ] Certificados digitales de participación

## 👥 Contribuir

Si deseas mejorar este proyecto:
1. Haz un fork del repositorio
2. Crea una rama para tu feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit tus cambios (`git commit -m 'Agregar nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto es de código abierto y está disponible para uso educativo.

## 📧 Contacto

Para más información sobre el proyecto, visita la sección de contacto en la aplicación web.

---

**Desarrollado con ❤️ para la Pastoral Universitaria La Salle**
