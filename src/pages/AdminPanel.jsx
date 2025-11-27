import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useToast } from '../components/Toast'
import styles from '../styles/AdminPanel.module.css'

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState('locations') 
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
    if (!currentUser) {
      showToast('Debes iniciar sesión para acceder', 'warning', 3000)
      setTimeout(() => navigate('/login'), 1500)
      return
    }

    if (!isAdmin) {
      showToast('No tienes permisos de administrador', 'error', 3000)
      setTimeout(() => navigate('/'), 1500)
      return
    }

    const fetchData = async () => {
        try {
            const resLoc = await fetch('/api/locations');
            if (resLoc.ok) setLocations(await resLoc.json());

            const resAct = await fetch('/api/activities');
            if (resAct.ok) setActivities(await resAct.json());
        } catch (e) {
            console.error(e);
        }
    }
    fetchData();
  }, [currentUser, isAdmin, navigate])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!formData.name || !formData.description || !formData.lat || !formData.lng) {
      showToast('Por favor completa todos los campos obligatorios', 'error', 3000)
      return
    }

    const payload = {
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
    };

    if (isEditing) {
        showToast('Edición no implementada en esta versión SQL', 'warning', 3000);
    } else {
        const res = await fetch('/api/locations', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(payload)
        });

        if (res.ok) {
            const newLoc = await res.json();
            setLocations([...locations, newLoc]);
            showToast('Ubicación agregada exitosamente', 'success', 3000)
            resetForm();
        }
    }
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

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar esta ubicación?')) {
      await fetch(`/api/locations/${id}`, { method: 'DELETE' });
      setLocations(locations.filter(loc => loc.id !== id))
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

  const handleActivityInputChange = (e) => {
    const { name, value } = e.target
    setActivityFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleActivitySubmit = async (e) => {
    e.preventDefault()

    if (!activityFormData.title || !activityFormData.description || !activityFormData.day || !activityFormData.month) {
      showToast('Por favor completa todos los campos obligatorios', 'error', 3000)
      return
    }

    const payload = {
        category: activityFormData.category,
        title: activityFormData.title,
        description: activityFormData.description,
        day: activityFormData.day,
        month: activityFormData.month,
        year: activityFormData.year,
        time: activityFormData.time,
        location: activityFormData.location,
        capacity: activityFormData.capacity
    };

    if (isEditing) {
        showToast('Edición no implementada', 'warning', 3000);
    } else {
        const res = await fetch('/api/activities', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(payload)
        });

        if (res.ok) {
            const newActivity = await res.json();
            // Ajustamos para visualización rápida
            setActivities([...activities, { ...newActivity, day: payload.day, month: payload.month, year: payload.year }]);
            showToast('Actividad agregada exitosamente', 'success', 3000)
            resetActivityForm();
        }
    }
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
      time: activity.time_range || activity.time,
      location: activity.location,
      capacity: activity.capacity
    })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleActivityDelete = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar esta actividad?')) {
      await fetch(`/api/activities/${id}`, { method: 'DELETE' });
      setActivities(activities.filter(act => act.id !== id))
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

  if (!currentUser) {
    return null
  }

  return (
    <div className={styles.adminPage}>
      <section className={styles.pageHeader}>
        <div className={styles.container}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <h1>🔧 Panel de Administración</h1>
              <p>Gestiona ubicaciones del mapa y actividades pastorales</p>
            </div>
          </div>
        </div>
      </section>

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
        {activeTab === 'locations' && (
        <div className={styles.adminGrid}>
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
          </div>

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
                    </div>
                    <div className={styles.cardActions}>
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

        {activeTab === 'activities' && (
        <div className={styles.adminGrid}>
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
          </div>

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
                      <p>⏰ {activity.time || activity.time_range}</p>
                      <p>📍 {activity.location}</p>
                    </div>
                    <div className={styles.cardActions}>
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