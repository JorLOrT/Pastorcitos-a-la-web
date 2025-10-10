# 🎯 Panel de Administración - Gestión de Actividades

## ✨ Nueva Funcionalidad Implementada

### **Sistema de Pestañas en el Panel de Administración**

El panel de administración ahora cuenta con **2 pestañas independientes**:

1. **🗺️ Mapa de Servicio** - Gestión de ubicaciones (albergues, ollas comunes)
2. **📅 Actividades Pastorales** - Gestión de eventos y actividades

---

## 🚀 Características Principales

### **Pestaña: Actividades Pastorales**

#### **Formulario de Creación/Edición**
El administrador puede crear actividades con los siguientes campos:

| Campo | Tipo | Descripción | Ejemplo |
|-------|------|-------------|---------|
| **Categoría** | Select | Tipo de actividad | Espiritual, Servicio, Formación, Recreativa |
| **Título** | Texto | Nombre de la actividad | "Misa Universitaria" |
| **Descripción** | Textarea | Detalles completos | Descripción de qué se hará |
| **Día** | Texto | Día del mes | "15" |
| **Mes** | Select | Mes del año | Octubre (OCT) |
| **Año** | Texto | Año del evento | "2025" |
| **Horario** | Texto | Hora de inicio y fin | "12:00 PM - 1:00 PM" |
| **Lugar** | Texto | Ubicación del evento | "Capilla Principal" |
| **Capacidad** | Texto | Cupo o disponibilidad | "Abierto a todos" / "Cupo: 30 personas" |

#### **Categorías de Actividades**
Cada actividad tiene una categoría con su color distintivo:

- 🙏 **Espiritual** - Azul institucional (#0423A4)
- 🤝 **Servicio Social** - Rosa (#ec4899)  
- 📚 **Formación** - Azul claro (#2f5dd1)
- 🎉 **Recreativa** - Dorado (#fbbf24)

---

## 📋 Funcionalidades del Admin

### **Crear Actividad**
1. Accede al panel de administración (`/admin`)
2. Haz clic en la pestaña "📅 Actividades Pastorales"
3. Completa el formulario con todos los datos
4. Haz clic en "➕ Agregar Actividad"
5. La actividad se guarda y aparece en la lista

### **Editar Actividad**
1. En la lista de actividades, busca la que quieres editar
2. Haz clic en el botón "✏️ Editar"
3. El formulario se llenará con los datos actuales
4. Modifica los campos necesarios
5. Haz clic en "💾 Actualizar Actividad"

### **Eliminar Actividad**
1. En la lista de actividades, busca la que quieres eliminar
2. Haz clic en el botón "🗑️ Eliminar"
3. Confirma la eliminación en el diálogo
4. La actividad se eliminará permanentemente

---

## 🔄 Integración con la Página de Actividades

### **Visualización Automática**
- Las actividades creadas por el admin se **muestran automáticamente** en la página `/actividades`
- Se combinan con las actividades predeterminadas del sistema
- Los usuarios pueden **inscribirse** a cualquier actividad (predeterminada o creada por admin)

### **Persistencia de Datos**
- Las actividades se guardan en **localStorage** con la clave `adminActivities`
- Los datos persisten incluso después de refrescar la página
- Compatible con el sistema de inscripciones existente

---

## 🎨 Diseño del Panel de Administración

### **Sistema de Pestañas**
```
┌─────────────────────────────────────┐
│  🗺️ Mapa de Servicio  │  📅 Actividades Pastorales  │
└─────────────────────────────────────┘
```

- **Pestañas sticky** - Se mantienen visibles al hacer scroll
- **Indicador visual** - Borde azul en la pestaña activa
- **Navegación fluida** - Cambio instantáneo entre secciones

### **Layout de Dos Columnas**
```
┌──────────────────┬───────────────┐
│                  │               │
│   Formulario     │    Lista de   │
│   de Creación    │  Actividades  │
│                  │               │
└──────────────────┴───────────────┘
```

- **Columna izquierda**: Formulario de creación/edición
- **Columna derecha**: Lista de actividades con scroll
- **Responsive**: En móviles se apila verticalmente

---

## 🎯 Tarjetas de Actividades en la Lista

Cada actividad muestra:

```
┌─────────────────────────────────────┐
│ [Badge Categoría]                   │
│ Título de la Actividad              │
│                                     │
│ Descripción completa...             │
│                                     │
│ 📅 15 de OCT 2025                  │
│ ⏰ 12:00 PM - 1:00 PM              │
│ 📍 Capilla Principal               │
│ 👥 Abierto a todos                 │
│                                     │
│  [✏️ Editar]  [🗑️ Eliminar]       │
└─────────────────────────────────────┘
```

---

## 💾 Estructura de Datos

### **Formato de Actividad en localStorage**
```json
{
  "id": 1636123456789,
  "category": "espiritual",
  "day": "15",
  "month": "OCT",
  "year": "2025",
  "title": "Misa Universitaria",
  "description": "Celebración eucarística especial...",
  "time": "12:00 PM - 1:00 PM",
  "location": "Capilla Principal",
  "capacity": "Abierto a todos"
}
```

### **Almacenamiento**
- **Clave**: `adminActivities`
- **Formato**: Array de objetos JSON
- **ID único**: Timestamp (`Date.now()`)

---

## 🔐 Seguridad y Acceso

### **Restricciones**
✅ Solo usuarios **administradores** pueden acceder al panel
✅ Validación de sesión activa
✅ Redirección automática si no hay permisos

### **Credenciales de Admin**
- **Email**: admin@pastoral.com
- **Contraseña**: Admin2024!

---

## 📱 Responsive Design

### **Desktop (> 1024px)**
- Layout de dos columnas
- Tabs horizontales completas
- Lista con scroll independiente

### **Tablet (768px - 1024px)**
- Columnas se apilan verticalmente
- Formulario primero, lista después
- Tabs mantienen diseño horizontal

### **Mobile (< 768px)**
- Layout vertical completo
- Formulario de una columna
- Botones de acción full-width

---

## 🎊 Consejos de Uso

### **Para Crear Actividades Efectivas:**

1. **Título Claro y Atractivo**
   - Usa nombres descriptivos
   - Evita abreviaciones confusas
   - Ejemplo: "Retiro Espiritual de Jóvenes" ✅

2. **Descripción Completa**
   - Explica qué se hará
   - Menciona beneficios
   - Incluye requisitos si los hay

3. **Fechas y Horarios Precisos**
   - Especifica inicio y fin
   - Usa formato de 12 horas (AM/PM)
   - Ejemplo: "2:00 PM - 5:00 PM" ✅

4. **Lugar Específico**
   - Nombre completo del lugar
   - Ubicación dentro del campus si aplica
   - Ejemplo: "Auditorio Principal - Piso 3" ✅

5. **Capacidad Clara**
   - Indica si hay límite de cupos
   - Especifica número exacto si es limitado
   - Opciones: "Abierto a todos" / "Cupo limitado: 40 personas"

---

## 🔄 Flujo de Trabajo Recomendado

### **Crear una Nueva Actividad**
```
1. Login como admin
2. Ir a /admin
3. Click en pestaña "Actividades Pastorales"
4. Completar formulario
5. Click "Agregar Actividad"
6. Verificar en la lista
7. Comprobar en página /actividades
```

### **Actualizar una Actividad**
```
1. Ir a /admin → Actividades
2. Buscar actividad en la lista
3. Click "Editar"
4. Modificar datos necesarios
5. Click "Actualizar Actividad"
6. Verificar cambios
```

### **Eliminar una Actividad**
```
1. Ir a /admin → Actividades
2. Buscar actividad obsoleta
3. Click "Eliminar"
4. Confirmar eliminación
5. Actividad removida del sistema
```

---

## ✅ Ventajas del Sistema

### **Para el Administrador:**
✨ Interfaz intuitiva y fácil de usar
✨ No requiere conocimientos técnicos
✨ Creación rápida de actividades
✨ Edición sin restricciones
✨ Vista previa inmediata

### **Para los Usuarios:**
✨ Actividades siempre actualizadas
✨ Información completa y clara
✨ Sistema de inscripción integrado
✨ Categorización por tipo de actividad
✨ Filtros para búsqueda rápida

---

## 🎨 Colores de las Badges por Categoría

| Categoría | Color Principal | Gradiente | Uso |
|-----------|----------------|-----------|-----|
| **Espiritual** | #0423A4 | #0423A4 → #0530c9 | Misas, retiros, oraciones |
| **Servicio** | #ec4899 | #ec4899 → #f472b6 | Voluntariados, ayuda social |
| **Formación** | #0423A4 | #0423A4 → #2f5dd1 | Talleres, charlas, cursos |
| **Recreativa** | #fbbf24 | #fbbf24 → #fcd34d | Juegos, convivencias |

---

## 📊 Estadísticas del Panel

El panel muestra:
- **Contador de actividades** en el título de la lista
- **Estado vacío** con mensaje motivacional
- **Iconos descriptivos** para cada dato
- **Cards con hover effect** para mejor UX

---

## 🚀 Acceso Rápido

### **URLs Importantes**
- **Panel Admin**: http://localhost:5174/admin
- **Ver Actividades**: http://localhost:5174/actividades
- **Login Admin**: http://localhost:5174/login

### **Navegación en la App**
```
Header → Iniciar Sesión → Login como Admin → Dashboard
Desde cualquier página (si eres admin) → Icono de perfil → Ver opciones admin
```

---

## 🎯 Casos de Uso Comunes

### **Caso 1: Crear Misa Semanal**
```
Categoría: Espiritual
Título: Misa Universitaria
Día: 15
Mes: OCT
Año: 2025
Horario: 12:00 PM - 1:00 PM
Lugar: Capilla Principal
Capacidad: Abierto a todos
```

### **Caso 2: Crear Retiro con Cupo Limitado**
```
Categoría: Espiritual
Título: Retiro de Fin de Semana
Día: 20
Mes: NOV
Año: 2025
Horario: Viernes 6:00 PM - Domingo 4:00 PM
Lugar: Casa de Retiros "El Buen Pastor"
Capacidad: Cupo limitado: 40 personas
```

### **Caso 3: Crear Actividad de Servicio**
```
Categoría: Servicio Social
Título: Jornada en Olla Común
Día: 05
Mes: DIC
Año: 2025
Horario: 9:00 AM - 2:00 PM
Lugar: Olla Común Miraflores
Capacidad: Cupo limitado: 25 voluntarios
```

---

## 💡 Tips y Mejores Prácticas

### **Nombres de Actividades**
✅ "Taller de Liderazgo Cristiano"
✅ "Visita a Asilos - Acompañamiento"
✅ "Misa de Acción de Gracias"
❌ "Taller" (muy genérico)
❌ "Actividad 1" (poco descriptivo)

### **Descripciones**
✅ Incluir objetivo, metodología y beneficios
✅ Mencionar si se requiere inscripción previa
✅ Especificar qué traer (si aplica)
❌ Descripciones de una sola línea
❌ Copiar y pegar sin personalizar

### **Horarios**
✅ "2:00 PM - 5:30 PM"
✅ "Sábado 9:00 AM - Domingo 3:00 PM"
❌ "Tarde" (impreciso)
❌ "14:00 - 17:30" (usar formato 12h con AM/PM)

---

## 🎊 ¡Listo para Usar!

Tu panel de administración está completamente funcional y listo para:

✅ Crear actividades ilimitadas
✅ Editar información en cualquier momento  
✅ Eliminar eventos pasados o cancelados
✅ Mantener la página de actividades siempre actualizada
✅ Ofrecer una experiencia profesional a los usuarios

**¡Empieza a crear actividades increíbles para tu comunidad pastoral! 🙏✨**
