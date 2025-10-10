# 🎯 GUÍA RÁPIDA: Cómo Agregar una Actividad

## 📍 PASO A PASO

### **1️⃣ INICIA SESIÓN COMO ADMINISTRADOR**

Ve a: **http://localhost:5175/login**

**Credenciales de Administrador:**
```
📧 Email:    admin@pastoral.com
🔑 Password: Admin2024!
```

> ⚠️ **IMPORTANTE**: Debes usar estas credenciales exactas para tener permisos de administrador.

---

### **2️⃣ ACCEDE AL PANEL DE ADMINISTRACIÓN**

Una vez iniciado sesión, tienes **3 formas** de acceder:

#### Opción A: Desde el Header
- Busca tu nombre en la esquina superior derecha
- Verás un botón de **"Mi Perfil"** o similar
- Si eres admin, verás también acceso al panel

#### Opción B: URL Directa
- Ve directamente a: **http://localhost:5175/admin**

#### Opción C: Desde el Mapa de Servicio
- Ve a: **http://localhost:5175/mapa-servicio**
- En la parte superior verás un link **"🔧 Panel de Administración"**

---

### **3️⃣ SELECCIONA LA PESTAÑA DE ACTIVIDADES**

Una vez en el panel de administración (`/admin`), verás **2 pestañas** en la parte superior:

```
┌─────────────────────────────────────────────┐
│  🗺️ Mapa de Servicio  │  📅 Actividades Pastorales  │
└─────────────────────────────────────────────┘
```

**HAZ CLICK** en: **📅 Actividades Pastorales**

---

### **4️⃣ COMPLETA EL FORMULARIO**

Verás un formulario con estos campos:

#### **Categoría** (obligatorio)
Selecciona una opción:
- 🙏 Espiritual
- 🤝 Servicio Social
- 📚 Formación
- 🎉 Recreativa

#### **Título** (obligatorio)
Ejemplo: `Misa Universitaria`

#### **Descripción** (obligatorio)
Ejemplo: `Celebración eucarística especial para toda la comunidad universitaria.`

#### **Día** (obligatorio)
Solo el número: `15`

#### **Mes** (obligatorio)
Selecciona del dropdown: `Octubre (OCT)`

#### **Año** (obligatorio)
Ejemplo: `2025`

#### **Horario** (obligatorio)
Ejemplo: `12:00 PM - 1:00 PM`

#### **Lugar** (obligatorio)
Ejemplo: `Capilla Principal`

#### **Capacidad/Cupo** (obligatorio)
Opciones:
- `Abierto a todos`
- `Cupo limitado: 30 personas`

---

### **5️⃣ GUARDA LA ACTIVIDAD**

Haz click en el botón: **➕ Agregar Actividad**

✅ Verás un mensaje de confirmación
✅ La actividad aparecerá en la lista de la derecha
✅ También aparecerá automáticamente en `/actividades`

---

## 📱 EJEMPLO COMPLETO

Aquí un ejemplo completo que puedes copiar:

```
Categoría:    🙏 Espiritual
Título:       Misa Universitaria Mensual
Descripción:  Celebración eucarística especial para toda la 
              comunidad universitaria. Momento de encuentro 
              con Dios y fraternidad.
Día:          20
Mes:          NOV (Noviembre)
Año:          2025
Horario:      6:00 PM - 7:00 PM
Lugar:        Capilla del Campus - Edificio Principal
Capacidad:    Abierto a todos
```

---

## 🔍 VERIFICACIÓN

### **¿Cómo saber si funcionó?**

1. **En el panel admin**: La actividad aparece en la lista del lado derecho
2. **En la página pública**: Ve a **http://localhost:5175/actividades**
3. **Filtro**: Si creaste una actividad "Espiritual", filtra por "Espirituales"
4. **Inscripción**: Los usuarios podrán ver el botón "Inscribirse"

---

## ❓ SOLUCIÓN DE PROBLEMAS

### **No veo la pestaña de Actividades**
- ✅ Verifica que iniciaste sesión con `admin@pastoral.com`
- ✅ Asegúrate de estar en `/admin`
- ✅ Refresca la página (F5)

### **Dice "No tienes permisos"**
- ✅ Cierra sesión
- ✅ Vuelve a iniciar con las credenciales de admin
- ✅ El email debe ser exactamente: `admin@pastoral.com`

### **No encuentro el panel de admin**
URLs exactas:
- Login: `http://localhost:5175/login`
- Admin: `http://localhost:5175/admin`
- Actividades públicas: `http://localhost:5175/actividades`

### **El formulario no se ve**
- ✅ Verifica que hiciste click en la pestaña **"📅 Actividades Pastorales"**
- ✅ Debe estar resaltada en azul
- ✅ El formulario está en la columna izquierda

---

## 🎨 CAPTURA DE PANTALLA (REFERENCIA)

```
╔══════════════════════════════════════════════════════════╗
║  🔧 Panel de Administración                              ║
║  Gestiona ubicaciones del mapa y actividades pastorales  ║
╚══════════════════════════════════════════════════════════╝

┌──────────────────────────────────────────────────────────┐
│  🗺️ Mapa de Servicio  │  📅 Actividades Pastorales ←──  │
└──────────────────────────────────────────────────────────┘

┌─────────────────────┬────────────────────────────────┐
│                     │                                │
│ Agregar Nueva       │  Actividades Creadas (2)       │
│ Actividad           │                                │
│                     │  ┌──────────────────────────┐  │
│ Categoría:          │  │ [🙏 Espiritual]         │  │
│ [Espiritual ▼]      │  │ Misa Universitaria       │  │
│                     │  │                          │  │
│ Título:             │  │ Descripción...           │  │
│ [____________]      │  │                          │  │
│                     │  │ 📅 15 de OCT 2025       │  │
│ Descripción:        │  │ ⏰ 12:00 PM - 1:00 PM   │  │
│ [____________]      │  │ 📍 Capilla Principal    │  │
│ [____________]      │  │ 👥 Abierto a todos      │  │
│ [____________]      │  │                          │  │
│                     │  │ [✏️ Editar] [🗑️ Eliminar]│  │
│ Día: [__]           │  └──────────────────────────┘  │
│ Mes: [OCT ▼]        │                                │
│ Año: [2025]         │  ┌──────────────────────────┐  │
│                     │  │ [🤝 Servicio Social]    │  │
│ Horario:            │  │ Visita a Asilos          │  │
│ [____________]      │  │ ...                      │  │
│                     │  └──────────────────────────┘  │
│ Lugar:              │                                │
│ [____________]      │                                │
│                     │                                │
│ Capacidad:          │                                │
│ [____________]      │                                │
│                     │                                │
│ [➕ Agregar Act.]   │                                │
│                     │                                │
└─────────────────────┴────────────────────────────────┘
```

---

## 🚀 ACCESO DIRECTO

### **URL Completa del Panel:**
```
http://localhost:5175/admin
```

### **Después de hacer login como admin:**
1. ✅ Click en pestaña **"📅 Actividades Pastorales"**
2. ✅ Formulario aparece a la izquierda
3. ✅ Completa todos los campos marcados con *
4. ✅ Click en **"➕ Agregar Actividad"**
5. ✅ ¡Listo! La actividad está creada

---

## 💡 TIPS FINALES

### **Primera vez usando el panel:**
1. Crea una actividad de prueba
2. Ve a `/actividades` para verificarla
3. Prueba editarla
4. Prueba eliminarla
5. Luego crea las actividades reales

### **Mejores prácticas:**
- ✅ Usa títulos descriptivos
- ✅ Describe bien qué se hará
- ✅ Sé específico con fechas y horarios
- ✅ Indica si hay cupo limitado
- ✅ Menciona requisitos especiales si los hay

---

## ✨ ¡TODO LISTO!

Ahora tienes todo lo necesario para agregar actividades. 

**¿Problemas?** Verifica:
1. Servidor corriendo en puerto **5175**
2. Login con credenciales de **admin**
3. Estás en la URL **/admin**
4. Pestaña **"Actividades Pastorales"** seleccionada

**¡Empieza a crear actividades para tu comunidad! 🙏💙**
