import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useToast } from '../components/Toast'
import styles from '../styles/AdminPanel.module.css'

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState('locations') // 'locations' o 'activities'
  const [locations, setLocations] = useState([])
  const [activities, setActivities] = useState([])
  const [isEditing, setIsEditing] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [formData, setFormData] = useState({
    type: 'ninos',
    name: '',
    description: '',
    capacity: '',
    current: '',
    lat: '',
    lng: '',
    schedule: '',
    phone: '',
    email: '',
    address: ''
  })
  const [activityFormData, setActivityFormData] = useState({
    category: 'espiritual',
    day: '',
    month: '',
    year: '',
    title: '',
    description: '',
    time: '',
    location: '',
    capacity: ''
  })

  const { currentUser, isAdmin } = useAuth()
  const navigate = useNavigate()
  const { showToast, ToastContainer } = useToast()

  useEffect(() => {
    // Verificar si el usuario está logueado
    if (!currentUser) {
      showToast('Debes iniciar sesión para acceder al panel de administración', 'warning', 3000)
      setTimeout(() => navigate('/login'), 1500)
      return
    }

    // Verificar si el usuario es administrador
    if (!isAdmin) {
      showToast('No tienes permisos de administrador para acceder a esta página', 'error', 3000)
      setTimeout(() => navigate('/'), 1500)
      return
    }

    // Cargar ubicaciones
    const savedLocations = localStorage.getItem('mapaLocations')
    if (savedLocations) {
      setLocations(JSON.parse(savedLocations))
    }

    // Cargar actividades
    const savedActivities = localStorage.getItem('adminActivities')
    if (savedActivities) {
      setActivities(JSON.parse(savedActivities))
    }
  }, [currentUser, isAdmin, navigate])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    // Validaciones
    if (!formData.name || !formData.description || !formData.lat || !formData.lng) {
      showToast('Por favor completa todos los campos obligatorios', 'error', 3000)
      return
    }

    if (isEditing) {
      // Editar ubicación existente
      const updatedLocations = locations.map(loc => 
        loc.id === editingId 
          ? {
              ...loc,
              type: formData.type,
              name: formData.name,
              description: formData.description,
              capacity: parseInt(formData.capacity),
              current: parseInt(formData.current),
              lat: parseFloat(formData.lat),
              lng: parseFloat(formData.lng),
              schedule: formData.schedule,
              contact: {
                phone: formData.phone,
                email: formData.email,
                address: formData.address
              }
            }
          : loc
      )
      setLocations(updatedLocations)
      localStorage.setItem('mapaLocations', JSON.stringify(updatedLocations))
      showToast('Ubicación actualizada exitosamente', 'success', 3000)
    } else {
      // Agregar nueva ubicación
      const newLocation = {
        id: Date.now(),
        type: formData.type,
        name: formData.name,
        description: formData.description,
        capacity: parseInt(formData.capacity),
        current: parseInt(formData.current),
        lat: parseFloat(formData.lat),
        lng: parseFloat(formData.lng),
        schedule: formData.schedule,
        contact: {
          phone: formData.phone,
          email: formData.email,
          address: formData.address
        }
      }
      const updatedLocations = [...locations, newLocation]
      setLocations(updatedLocations)
      localStorage.setItem('mapaLocations', JSON.stringify(updatedLocations))
      showToast('Ubicación agregada exitosamente', 'success', 3000)
    }

    // Resetear formulario
    resetForm()
  }

  const handleEdit = (location) => {
    setIsEditing(true)
    setEditingId(location.id)
    setFormData({
      type: location.type,
      name: location.name,
      description: location.description,
      capacity: location.capacity.toString(),
      current: location.current.toString(),
      lat: location.lat.toString(),
      lng: location.lng.toString(),
      schedule: location.schedule,
      phone: location.contact.phone,
      email: location.contact.email,
      address: location.contact.address
    })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleDelete = (id) => {
    if (window.confirm('¿Estás seguro de eliminar esta ubicación?')) {
      const updatedLocations = locations.filter(loc => loc.id !== id)
      setLocations(updatedLocations)
      localStorage.setItem('mapaLocations', JSON.stringify(updatedLocations))
      showToast('Ubicación eliminada exitosamente', 'success', 3000)
    }
  }

  const resetForm = () => {
    setFormData({
      type: 'ninos',
      name: '',
      description: '',
      capacity: '',
      current: '',
      lat: '',
      lng: '',
      schedule: '',
      phone: '',
      email: '',
      address: ''
    })
    setIsEditing(false)
    setEditingId(null)
  }

  // Funciones para manejar actividades
  const handleActivityInputChange = (e) => {
    const { name, value } = e.target
    setActivityFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleActivitySubmit = (e) => {
    e.preventDefault()

    if (!activityFormData.title || !activityFormData.description || !activityFormData.day || !activityFormData.month) {
      showToast('Por favor completa todos los campos obligatorios', 'error', 3000)
      return
    }

    if (isEditing) {
      // Editar actividad existente
      const updatedActivities = activities.map(act => 
        act.id === editingId 
          ? {
              ...act,
              category: activityFormData.category,
              day: activityFormData.day,
              month: activityFormData.month,
              year: activityFormData.year,
              title: activityFormData.title,
              description: activityFormData.description,
              time: activityFormData.time,
              location: activityFormData.location,
              capacity: activityFormData.capacity
            }
          : act
      )
      setActivities(updatedActivities)
      localStorage.setItem('adminActivities', JSON.stringify(updatedActivities))
      showToast('Actividad actualizada exitosamente', 'success', 3000)
    } else {
      // Agregar nueva actividad
      const newActivity = {
        id: Date.now(),
        category: activityFormData.category,
        day: activityFormData.day,
        month: activityFormData.month,
        year: activityFormData.year,
        title: activityFormData.title,
        description: activityFormData.description,
        time: activityFormData.time,
        location: activityFormData.location,
        capacity: activityFormData.capacity
      }
      const updatedActivities = [...activities, newActivity]
      setActivities(updatedActivities)
      localStorage.setItem('adminActivities', JSON.stringify(updatedActivities))
      showToast('Actividad agregada exitosamente', 'success', 3000)
    }

    resetActivityForm()
  }

  const handleActivityEdit = (activity) => {
    setIsEditing(true)
    setEditingId(activity.id)
    setActivityFormData({
      category: activity.category,
      day: activity.day,
      month: activity.month,
      year: activity.year,
      title: activity.title,
      description: activity.description,
      time: activity.time,
      location: activity.location,
      capacity: activity.capacity
    })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleActivityDelete = (id) => {
    if (window.confirm('¿Estás seguro de eliminar esta actividad?')) {
      const updatedActivities = activities.filter(act => act.id !== id)
      setActivities(updatedActivities)
      localStorage.setItem('adminActivities', JSON.stringify(updatedActivities))
      showToast('Actividad eliminada exitosamente', 'success', 3000)
    }
  }

  const resetActivityForm = () => {
    setActivityFormData({
      category: 'espiritual',
      day: '',
      month: '',
      year: '',
      title: '',
      description: '',
      time: '',
      location: '',
      capacity: ''
    })
    setIsEditing(false)
    setEditingId(null)
  }

  const getTypeLabel = (type) => {
    const labels = {
      ninos: 'Albergue para Niños',
      ancianos: 'Albergue para Ancianos',
      ollas: 'Olla Común'
    }
    return labels[type] || type
  }

  const resetToArequipaLocations = () => {
    if (!window.confirm('¿Estás seguro de resetear todas las ubicaciones a las predeterminadas de Arequipa? Esta acción no se puede deshacer.')) {
      return
    }

    const arequipaLocations = [
      {
        id: 1,
        type: 'ninos',
        name: 'Aldea Infantil SOS Arequipa',
        description: 'Casa hogar para niños en situación de vulnerabilidad. Brindamos educación, alimentación y cuidado integral.',
        capacity: 60,
        current: 48,
        lat: -16.3989,
        lng: -71.5370,
        schedule: 'Lunes a Domingo: 8:00 AM - 6:00 PM',
        contact: {
          phone: '+51 054 251 515',
          email: 'contacto@aldeasosarequipa.org',
          address: 'Urb. La Negrita, Arequipa'
        }
      },
      {
        id: 2,
        type: 'ninos',
        name: 'Hogar de Niños María Reina',
        description: 'Albergue para niñas en situación de abandono. Ofrecemos educación, valores y desarrollo integral.',
        capacity: 40,
        current: 35,
        lat: -16.4090,
        lng: -71.5440,
        schedule: 'Lunes a Viernes: 8:00 AM - 5:00 PM',
        contact: {
          phone: '+51 054 234 567',
          email: 'mariareina@arequipa.org',
          address: 'Av. Ejército 820, Cayma, Arequipa'
        }
      },
      {
        id: 3,
        type: 'ninos',
        name: 'Casa Hogar Niño Jesús',
        description: 'Centro de acogida para niños y adolescentes en riesgo. Brindamos educación, salud y acompañamiento.',
        capacity: 55,
        current: 42,
        lat: -16.4150,
        lng: -71.5300,
        schedule: 'Lunes a Domingo: 9:00 AM - 6:00 PM',
        contact: {
          phone: '+51 054 278 901',
          email: 'casaninojesus@gmail.com',
          address: 'Calle Bolívar 345, Cercado, Arequipa'
        }
      },
      {
        id: 4,
        type: 'ancianos',
        name: 'Asilo de Ancianos Santa Ana',
        description: 'Centro de cuidado para adultos mayores. Ofrecemos atención médica, actividades recreativas y compañía.',
        capacity: 45,
        current: 40,
        lat: -16.3950,
        lng: -71.5350,
        schedule: 'Visitas: Martes a Domingo: 10:00 AM - 5:00 PM',
        contact: {
          phone: '+51 054 223 344',
          email: 'asilosantaana@hotmail.com',
          address: 'Av. Independencia 567, Arequipa'
        }
      },
      {
        id: 5,
        type: 'ancianos',
        name: 'Hogar del Adulto Mayor San Vicente de Paul',
        description: 'Residencia para adultos mayores en situación de vulnerabilidad. Brindamos cuidado integral y acompañamiento.',
        capacity: 50,
        current: 48,
        lat: -16.4080,
        lng: -71.5250,
        schedule: 'Visitas: Lunes a Sábado: 9:00 AM - 4:00 PM',
        contact: {
          phone: '+51 054 245 678',
          email: 'sanvicenteaqp@gmail.com',
          address: 'Calle San Camilo 234, Cercado, Arequipa'
        }
      },
      {
        id: 6,
        type: 'ancianos',
        name: 'Casa Hogar La Divina Providencia',
        description: 'Albergue para ancianos desamparados. Ofrecemos alimentación, salud y cariño.',
        capacity: 35,
        current: 32,
        lat: -16.4200,
        lng: -71.5400,
        schedule: 'Visitas: Martes a Domingo: 10:00 AM - 3:00 PM',
        contact: {
          phone: '+51 054 267 890',
          email: 'divinaprovidencia@yahoo.com',
          address: 'Av. Parra 890, Yanahuara, Arequipa'
        }
      },
      {
        id: 7,
        type: 'ollas',
        name: 'Olla Común Alto Selva Alegre',
        description: 'Comedor comunitario que brinda desayuno y almuerzo a familias de bajos recursos del distrito.',
        capacity: 180,
        current: 145,
        lat: -16.3800,
        lng: -71.5100,
        schedule: 'Desayuno: 7:00-9:00 AM, Almuerzo: 12:00-2:00 PM',
        contact: {
          phone: '+51 987 234 567',
          email: 'ollaaltoselva@gmail.com',
          address: 'Jr. Los Incas Mz. D Lt. 5, Alto Selva Alegre, Arequipa'
        }
      },
      {
        id: 8,
        type: 'ollas',
        name: 'Olla Común Juan Pablo II',
        description: 'Comedor popular del Cono Norte. Servimos más de 120 raciones diarias a familias necesitadas.',
        capacity: 150,
        current: 128,
        lat: -16.3700,
        lng: -71.5200,
        schedule: 'Almuerzo: 11:30 AM - 1:30 PM',
        contact: {
          phone: '+51 987 345 678',
          email: 'ollajuanpablo@hotmail.com',
          address: 'Asoc. Juan Pablo II Mz. F Lt. 12, Cerro Colorado, Arequipa'
        }
      },
      {
        id: 9,
        type: 'ollas',
        name: 'Olla Común Miraflores',
        description: 'Comedor solidario que atiende a familias del distrito. Brindamos alimentos nutritivos y apoyo comunitario.',
        capacity: 200,
        current: 175,
        lat: -16.3950,
        lng: -71.5150,
        schedule: 'Desayuno: 7:30-9:00 AM, Almuerzo: 12:00-2:00 PM',
        contact: {
          phone: '+51 987 456 789',
          email: 'ollamiraflores@gmail.com',
          address: 'Calle Las Américas Mz. K Lt. 8, Miraflores, Arequipa'
        }
      },
      {
        id: 10,
        type: 'ollas',
        name: 'Olla Común Paucarpata Unida',
        description: 'Comedor comunitario del distrito de Paucarpata. Servimos 160 raciones diarias con solidaridad.',
        capacity: 160,
        current: 142,
        lat: -16.4300,
        lng: -71.5000,
        schedule: 'Almuerzo: 11:00 AM - 1:30 PM, Cena: 6:00 PM - 7:30 PM',
        contact: {
          phone: '+51 987 567 890',
          email: 'ollapaucarpata@yahoo.com',
          address: 'Av. Universitaria Mz. C Lt. 15, Paucarpata, Arequipa'
        }
      },
      {
        id: 11,
        type: 'ollas',
        name: 'Olla Común Hunter Solidario',
        description: 'Comedor popular que brinda alimentación balanceada a familias vulnerables del distrito de Hunter.',
        capacity: 140,
        current: 118,
        lat: -16.4450,
        lng: -71.5200,
        schedule: 'Desayuno: 7:00-8:30 AM, Almuerzo: 12:00-1:30 PM',
        contact: {
          phone: '+51 987 678 901',
          email: 'ollahunter@gmail.com',
          address: 'Jr. Los Libertadores Mz. A Lt. 22, Hunter, Arequipa'
        }
      },
      {
        id: 12,
        type: 'ollas',
        name: 'Olla Común Socabaya Unida',
        description: 'Comedor comunitario que apoya a más de 130 familias con alimentos preparados diariamente.',
        capacity: 170,
        current: 138,
        lat: -16.4600,
        lng: -71.5400,
        schedule: 'Almuerzo: 11:30 AM - 2:00 PM',
        contact: {
          phone: '+51 987 789 012',
          email: 'ollasocabaya@hotmail.com',
          address: 'Av. Principal Mz. H Lt. 18, Socabaya, Arequipa'
        }
      }
    ]

    setLocations(arequipaLocations)
    localStorage.setItem('mapaLocations', JSON.stringify(arequipaLocations))
    showToast('✅ Mapa reseteado con 12 ubicaciones de Arequipa (3 albergues de niños, 3 albergues de ancianos, 6 ollas comunes)', 'success', 5000)
    window.location.reload()
  }

  if (!currentUser) {
    return null
  }

  return (
    <div className={styles.adminPage}>
      {/* Header */}
      <section className={styles.pageHeader}>
        <div className={styles.container}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <h1>🔧 Panel de Administración</h1>
              <p>Gestiona ubicaciones del mapa y actividades pastorales</p>
            </div>
            {activeTab === 'locations' && (
              <button 
                onClick={resetToArequipaLocations}
                className={styles.btnReset}
                title="Resetear a ubicaciones predeterminadas de Arequipa"
              >
                🔄 Resetear Mapa (Arequipa)
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Tabs */}
      <section className={styles.tabsSection}>
        <div className={styles.container}>
          <div className={styles.tabs}>
            <button 
              className={`${styles.tabBtn} ${activeTab === 'locations' ? styles.active : ''}`}
              onClick={() => { setActiveTab('locations'); resetForm(); resetActivityForm(); setIsEditing(false); }}
            >
              🗺️ Mapa de Servicio
            </button>
            <button 
              className={`${styles.tabBtn} ${activeTab === 'activities' ? styles.active : ''}`}
              onClick={() => { setActiveTab('activities'); resetForm(); resetActivityForm(); setIsEditing(false); }}
            >
              📅 Actividades Pastorales
            </button>
          </div>
        </div>
      </section>

      <div className={styles.container}>
        {/* Contenido de la pestaña de Ubicaciones */}
        {activeTab === 'locations' && (
        <div className={styles.adminGrid}>
          {/* Formulario */}
          <div className={styles.formSection}>
            <h2>{isEditing ? 'Editar Ubicación' : 'Agregar Nueva Ubicación'}</h2>
            <form onSubmit={handleSubmit} className={styles.adminForm}>
              <div className={styles.formGroup}>
                <label>Tipo de Lugar *</label>
                <select 
                  name="type" 
                  value={formData.type} 
                  onChange={handleInputChange}
                  required
                >
                  <option value="ninos">🏠 Albergue para Niños</option>
                  <option value="ancianos">👴 Albergue para Ancianos</option>
                  <option value="ollas">🍲 Olla Común</option>
                </select>
              </div>

              <div className={styles.formGroup}>
                <label>Nombre del Lugar *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Ej: Albergue Santa María"
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label>Descripción *</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Breve descripción del lugar y sus servicios"
                  rows="3"
                  required
                />
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label>Capacidad Total *</label>
                  <input
                    type="number"
                    name="capacity"
                    value={formData.capacity}
                    onChange={handleInputChange}
                    placeholder="100"
                    min="1"
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <label>Ocupación Actual *</label>
                  <input
                    type="number"
                    name="current"
                    value={formData.current}
                    onChange={handleInputChange}
                    placeholder="75"
                    min="0"
                    required
                  />
                </div>
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label>Latitud *</label>
                  <input
                    type="number"
                    step="any"
                    name="lat"
                    value={formData.lat}
                    onChange={handleInputChange}
                    placeholder="-12.0464"
                    required
                  />
                  <small>Usa Google Maps para obtener las coordenadas</small>
                </div>

                <div className={styles.formGroup}>
                  <label>Longitud *</label>
                  <input
                    type="number"
                    step="any"
                    name="lng"
                    value={formData.lng}
                    onChange={handleInputChange}
                    placeholder="-77.0428"
                    required
                  />
                </div>
              </div>

              <div className={styles.formGroup}>
                <label>Horarios *</label>
                <input
                  type="text"
                  name="schedule"
                  value={formData.schedule}
                  onChange={handleInputChange}
                  placeholder="Lunes a Viernes: 9:00 AM - 5:00 PM"
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label>Dirección *</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="Av. Principal 123, Lima"
                  required
                />
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label>Teléfono *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+51 987 654 321"
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <label>Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="contacto@ejemplo.org"
                    required
                  />
                </div>
              </div>

              <div className={styles.formActions}>
                <button type="submit" className={styles.btnPrimary}>
                  {isEditing ? '💾 Actualizar Ubicación' : '➕ Agregar Ubicación'}
                </button>
                {isEditing && (
                  <button type="button" onClick={resetForm} className={styles.btnSecondary}>
                    ❌ Cancelar
                  </button>
                )}
              </div>
            </form>

            <div className={styles.helpBox}>
              <h3>💡 Ayuda</h3>
              <p><strong>Para obtener coordenadas:</strong></p>
              <ol>
                <li>Abre Google Maps</li>
                <li>Busca la ubicación</li>
                <li>Click derecho en el marcador</li>
                <li>Selecciona las coordenadas para copiarlas</li>
              </ol>
            </div>
          </div>

          {/* Lista de ubicaciones */}
          <div className={styles.listSection}>
            <h2>Ubicaciones Registradas ({locations.length})</h2>
            <div className={styles.locationsList}>
              {locations.length === 0 ? (
                <p className={styles.emptyState}>No hay ubicaciones registradas aún</p>
              ) : (
                locations.map(location => (
                  <div key={location.id} className={styles.adminCard}>
                    <div className={styles.cardHeader}>
                      <span className={styles.badge}>{getTypeLabel(location.type)}</span>
                      <h3>{location.name}</h3>
                    </div>
                    <p className={styles.description}>{location.description}</p>
                    <div className={styles.cardInfo}>
                      <p>📍 {location.contact.address}</p>
                      <p>👥 {location.current} / {location.capacity} personas</p>
                      <p>📞 {location.contact.phone}</p>
                    </div>
                    <div className={styles.cardActions}>
                      <button 
                        onClick={() => handleEdit(location)}
                        className={styles.btnEdit}
                      >
                        ✏️ Editar
                      </button>
                      <button 
                        onClick={() => handleDelete(location.id)}
                        className={styles.btnDelete}
                      >
                        🗑️ Eliminar
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
        )}

        {/* Contenido de la pestaña de Actividades */}
        {activeTab === 'activities' && (
        <div className={styles.adminGrid}>
          {/* Formulario de Actividades */}
          <div className={styles.formSection}>
            <h2>{isEditing ? 'Editar Actividad' : 'Agregar Nueva Actividad'}</h2>
            <form onSubmit={handleActivitySubmit} className={styles.adminForm}>
              <div className={styles.formGroup}>
                <label>Categoría *</label>
                <select 
                  name="category" 
                  value={activityFormData.category} 
                  onChange={handleActivityInputChange}
                  required
                >
                  <option value="espiritual">🙏 Espiritual</option>
                  <option value="servicio">🤝 Servicio Social</option>
                  <option value="formacion">📚 Formación</option>
                  <option value="recreativa">🎉 Recreativa</option>
                </select>
              </div>

              <div className={styles.formGroup}>
                <label>Título de la Actividad *</label>
                <input
                  type="text"
                  name="title"
                  value={activityFormData.title}
                  onChange={handleActivityInputChange}
                  placeholder="Ej: Misa Universitaria"
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label>Descripción *</label>
                <textarea
                  name="description"
                  value={activityFormData.description}
                  onChange={handleActivityInputChange}
                  placeholder="Descripción completa de la actividad"
                  rows="4"
                  required
                />
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label>Día *</label>
                  <input
                    type="text"
                    name="day"
                    value={activityFormData.day}
                    onChange={handleActivityInputChange}
                    placeholder="15"
                    maxLength="2"
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <label>Mes *</label>
                  <select
                    name="month"
                    value={activityFormData.month}
                    onChange={handleActivityInputChange}
                    required
                  >
                    <option value="">Seleccionar</option>
                    <option value="ENE">Enero</option>
                    <option value="FEB">Febrero</option>
                    <option value="MAR">Marzo</option>
                    <option value="ABR">Abril</option>
                    <option value="MAY">Mayo</option>
                    <option value="JUN">Junio</option>
                    <option value="JUL">Julio</option>
                    <option value="AGO">Agosto</option>
                    <option value="SEP">Septiembre</option>
                    <option value="OCT">Octubre</option>
                    <option value="NOV">Noviembre</option>
                    <option value="DIC">Diciembre</option>
                  </select>
                </div>

                <div className={styles.formGroup}>
                  <label>Año *</label>
                  <input
                    type="text"
                    name="year"
                    value={activityFormData.year}
                    onChange={handleActivityInputChange}
                    placeholder="2025"
                    maxLength="4"
                    required
                  />
                </div>
              </div>

              <div className={styles.formGroup}>
                <label>Horario *</label>
                <input
                  type="text"
                  name="time"
                  value={activityFormData.time}
                  onChange={handleActivityInputChange}
                  placeholder="Ej: 12:00 PM - 1:00 PM"
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label>Lugar *</label>
                <input
                  type="text"
                  name="location"
                  value={activityFormData.location}
                  onChange={handleActivityInputChange}
                  placeholder="Ej: Capilla Principal"
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label>Capacidad/Cupo *</label>
                <input
                  type="text"
                  name="capacity"
                  value={activityFormData.capacity}
                  onChange={handleActivityInputChange}
                  placeholder="Ej: Abierto a todos / Cupo limitado: 30 personas"
                  required
                />
              </div>

              <div className={styles.formActions}>
                <button type="submit" className={styles.btnPrimary}>
                  {isEditing ? '💾 Actualizar Actividad' : '➕ Agregar Actividad'}
                </button>
                {isEditing && (
                  <button type="button" onClick={resetActivityForm} className={styles.btnSecondary}>
                    ❌ Cancelar
                  </button>
                )}
              </div>
            </form>

            <div className={styles.helpBox}>
              <h3>💡 Consejos</h3>
              <p><strong>Para crear una actividad efectiva:</strong></p>
              <ul>
                <li>Usa un título claro y atractivo</li>
                <li>Describe en detalle qué se hará</li>
                <li>Especifica fecha, hora y lugar exactos</li>
                <li>Indica si hay límite de cupos</li>
              </ul>
            </div>
          </div>

          {/* Lista de Actividades */}
          <div className={styles.listSection}>
            <h2>Actividades Creadas ({activities.length})</h2>
            <div className={styles.locationsList}>
              {activities.length === 0 ? (
                <p className={styles.emptyState}>No hay actividades creadas aún</p>
              ) : (
                activities.map(activity => (
                  <div key={activity.id} className={styles.adminCard}>
                    <div className={styles.cardHeader}>
                      <span className={`${styles.badge} ${styles[activity.category]}`}>
                        {activity.category.charAt(0).toUpperCase() + activity.category.slice(1)}
                      </span>
                      <h3>{activity.title}</h3>
                    </div>
                    <p className={styles.description}>{activity.description}</p>
                    <div className={styles.cardInfo}>
                      <p>📅 {activity.day} de {activity.month} {activity.year}</p>
                      <p>⏰ {activity.time}</p>
                      <p>📍 {activity.location}</p>
                      <p>👥 {activity.capacity}</p>
                    </div>
                    <div className={styles.cardActions}>
                      <button 
                        onClick={() => handleActivityEdit(activity)}
                        className={styles.btnEdit}
                      >
                        ✏️ Editar
                      </button>
                      <button 
                        onClick={() => handleActivityDelete(activity.id)}
                        className={styles.btnDelete}
                      >
                        🗑️ Eliminar
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
        )}
      </div>
      <ToastContainer />
    </div>
  )
}

export default AdminPanel
