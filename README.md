# Pastoral Universitaria La Salle

Aplicación web para la Pastoral de una universidad, diseñada para fomentar la participación de estudiantes en actividades espirituales, de servicio social y comunitarias.

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
