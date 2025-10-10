# 🔐 Credenciales de Administrador

## Usuario Administrador

Para acceder al **Panel de Administración** del Mapa de Servicio, usa las siguientes credenciales:

### 📧 Email
```
admin@pastoral.com
```

### 🔑 Contraseña
```
Admin2024!
```

---

## 🎯 Funcionalidades del Administrador

### ✅ Permisos
- ✔️ Acceso completo al Panel de Administración
- ✔️ Agregar nuevas ubicaciones al mapa
- ✔️ Editar ubicaciones existentes
- ✔️ Eliminar ubicaciones
- ✔️ Ver todas las ubicaciones registradas

### 🚫 Usuarios Regulares
Los usuarios que se registren normalmente **NO** tendrán permisos de administrador y serán redirigidos automáticamente si intentan acceder al panel de administración.

---

## 📋 Cómo Usar

1. **Ir a la página de Login**
   - Navega a: `/login` o haz clic en "Iniciar Sesión" en el menú

2. **Ver credenciales de admin**
   - Haz clic en el botón "ℹ️ Credenciales de Administrador"
   - Se mostrará un cuadro amarillo con las credenciales

3. **Iniciar sesión**
   - Ingresa el email: `admin@pastoral.com`
   - Ingresa la contraseña: `Admin2024!`
   - Haz clic en "Iniciar Sesión"

4. **Acceder al Panel de Administración**
   - Ve a "Mapa de Servicio" en el menú
   - Haz clic en "🔧 Panel de Administración" (solo visible para administradores)
   - O navega directamente a `/admin`

---

## 🗺️ Gestión de Ubicaciones

### Agregar Nueva Ubicación

1. En el Panel de Administración, completa el formulario:
   - **Tipo**: Albergue para Niños, Ancianos o Olla Común
   - **Nombre**: Nombre del lugar
   - **Descripción**: Descripción breve del servicio
   - **Capacidad Total**: Número máximo de personas
   - **Ocupación Actual**: Número actual de personas
   - **Coordenadas**: Latitud y Longitud (usa Google Maps)
   - **Horarios**: Días y horas de atención
   - **Contacto**: Dirección, teléfono y email

2. Haz clic en "➕ Agregar Ubicación"

### Editar Ubicación

1. En la lista de ubicaciones, haz clic en "✏️ Editar"
2. Se cargará la información en el formulario
3. Modifica los campos necesarios
4. Haz clic en "💾 Actualizar Ubicación"

### Eliminar Ubicación

1. En la lista de ubicaciones, haz clic en "🗑️ Eliminar"
2. Confirma la acción en el diálogo

---

## 💡 Consejos

### Obtener Coordenadas de Google Maps

1. Abre [Google Maps](https://maps.google.com)
2. Busca la ubicación que deseas agregar
3. Haz clic derecho sobre el punto exacto
4. Las coordenadas aparecerán en la parte superior (formato: `-12.0464, -77.0428`)
5. Haz clic para copiarlas
6. Pega la primera parte en "Latitud" y la segunda en "Longitud"

### Tipos de Ubicaciones

- 🏠 **Albergues para Niños**: Aparecen con marcador verde en el mapa
- 👴 **Albergues para Ancianos**: Aparecen con marcador azul en el mapa
- 🍲 **Ollas Comunes**: Aparecen con marcador naranja en el mapa

---

## 🔒 Seguridad

⚠️ **IMPORTANTE**: Estas credenciales son para desarrollo y demostración. En producción:
- Cambia la contraseña del administrador
- Implementa un backend seguro con base de datos
- Usa autenticación JWT o similar
- Nunca expongas contraseñas en el código fuente
- Implementa roles y permisos más robustos

---

## 📦 Almacenamiento de Datos

Actualmente, todas las ubicaciones se almacenan en **localStorage** del navegador con la clave `mapaLocations`.

Para ver los datos guardados:
1. Abre la consola del navegador (F12)
2. Ve a la pestaña "Application" > "Local Storage"
3. Busca la clave `mapaLocations`

---

## 🆘 Solución de Problemas

### No puedo acceder al Panel de Administración
- Verifica que hayas iniciado sesión con las credenciales correctas
- Asegúrate de usar exactamente: `admin@pastoral.com` y `Admin2024!`
- Si ya iniciaste sesión con otro usuario, cierra sesión primero

### Las ubicaciones no se guardan
- Verifica que el navegador no esté en modo privado/incógnito
- Asegúrate de que localStorage esté habilitado en tu navegador
- Revisa la consola del navegador por errores (F12)

### El mapa no carga
- Verifica tu conexión a internet (necesita cargar tiles de OpenStreetMap)
- Revisa la consola del navegador por errores
- Asegúrate de que las coordenadas sean válidas (números decimales)

---

**¡Listo para administrar el mapa de servicio social!** 🎉
