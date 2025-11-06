import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { useToast } from '../components/Toast'
import styles from '../styles/Actividades.module.css'

const Actividades = () => {
  const [activeFilter, setActiveFilter] = useState('all')
  const [dateFilter, setDateFilter] = useState('all') // 'all', 'proximas', 'mes'
  const [adminActivities, setAdminActivities] = useState([])
  const { currentUser } = useAuth()
  const navigate = useNavigate()
  const { showToast, ToastContainer } = useToast()

  // Cargar actividades creadas por el admin
  useEffect(() => {
    const savedActivities = localStorage.getItem('adminActivities')
    if (savedActivities) {
      setAdminActivities(JSON.parse(savedActivities))
    }
  }, [])

  const actividades = [
    {
      id: 1,
      category: 'espiritual',
      day: '06',
      month: 'NOV',
      year: '2025',
      title: 'Misa Universitaria',
      description: 'Celebración eucarística especial para toda la comunidad universitaria. Un momento de encuentro con Dios y de fraternidad entre estudiantes.',
      time: '12:00 PM - 1:00 PM',
      location: 'Capilla Principal',
      capacity: 'Abierto a todos'
    },
    {
      id: 2,
      category: 'servicio',
      day: '09',
      month: 'NOV',
      year: '2025',
      title: 'Jornada de Servicio en Comunidades',
      description: 'Visitaremos comunidades necesitadas para llevar ayuda material y espiritual. Actividades de construcción, enseñanza y acompañamiento.',
      time: '9:00 AM - 4:00 PM',
      location: 'Punto de encuentro - Entrada Principal',
      capacity: 'Cupo limitado: 30 personas'
    },
    {
      id: 3,
      category: 'espiritual',
      day: '13',
      month: 'NOV',
      year: '2025',
      title: 'Retiro Espiritual',
      description: 'Un día completo de reflexión, oración y encuentro personal con Dios. Incluye momentos de silencio, charlas formativas y celebración eucarística.',
      time: '8:00 AM - 6:00 PM',
      location: 'Casa de Retiros "El Buen Pastor"',
      capacity: 'Cupo limitado: 40 personas'
    },
    {
      id: 4,
      category: 'formacion',
      day: '16',
      month: 'NOV',
      year: '2025',
      title: 'Taller: Liderazgo Cristiano',
      description: 'Taller interactivo sobre los principios del liderazgo desde una perspectiva cristiana. Aprende a liderar con valores y servicio.',
      time: '4:00 PM - 6:00 PM',
      location: 'Sala de Conferencias - Edificio B',
      capacity: 'Abierto a todos'
    },
    {
      id: 5,
      category: 'recreativa',
      day: '20',
      month: 'NOV',
      year: '2025',
      title: 'Tarde de Convivencia',
      description: 'Tarde de juegos, música y convivencia fraterna. Un espacio para conocernos mejor y fortalecer los lazos de amistad en nuestra comunidad.',
      time: '3:00 PM - 7:00 PM',
      location: 'Áreas Verdes del Campus',
      capacity: 'Abierto a todos'
    },
    {
      id: 6,
      category: 'servicio',
      day: '25',
      month: 'NOV',
      year: '2025',
      title: 'Visita a Asilos y Hospitales',
      description: 'Acompañamiento a personas mayores en asilos y visita a niños en hospitales. Llevaremos alegría, compañía y amor a quienes más lo necesitan.',
      time: '10:00 AM - 2:00 PM',
      location: 'Transporte desde la Universidad',
      capacity: 'Cupo limitado: 25 personas'
    },
    {
      id: 7,
      category: 'formacion',
      day: '28',
      month: 'NOV',
      year: '2025',
      title: 'Charla: Fe y Ciencia',
      description: 'Diálogo sobre la relación entre fe y ciencia en el mundo contemporáneo. Con invitados especiales del ámbito académico.',
      time: '5:00 PM - 7:00 PM',
      location: 'Auditorio Principal',
      capacity: 'Abierto a todos'
    },
    {
      id: 8,
      category: 'espiritual',
      day: '02',
      month: 'DIC',
      year: '2025',
      title: 'Adviento: Preparación Navideña',
      description: 'Inicio del tiempo de Adviento con oración especial y reflexión sobre el significado de la Navidad.',
      time: '6:00 PM - 7:30 PM',
      location: 'Capilla Principal',
      capacity: 'Abierto a todos'
    },
    {
      id: 9,
      category: 'recreativa',
      day: '06',
      month: 'DIC',
      year: '2025',
      title: 'Noche de Villancicos',
      description: 'Celebración navideña con villancicos, chocolate caliente y compartir fraterno. Trae tu alegría y voz para cantar juntos.',
      time: '7:00 PM - 9:00 PM',
      location: 'Plaza Central del Campus',
      capacity: 'Abierto a todos'
    },
    {
      id: 10,
      category: 'servicio',
      day: '10',
      month: 'DIC',
      year: '2025',
      title: 'Recaudación de Juguetes',
      description: 'Campaña solidaria de recolección de juguetes para niños en situación vulnerable. Tu donación puede alegrar la Navidad de un niño.',
      time: '9:00 AM - 5:00 PM',
      location: 'Stand en Entrada Principal',
      capacity: 'Todos pueden participar'
    }
  ]

  const regularActivities = [
    {
      title: 'Grupo de Oración',
      frequency: 'Todos los miércoles',
      time: '6:00 PM - 7:00 PM',
      location: 'Capilla del Campus'
    },
    {
      title: 'Estudio Bíblico',
      frequency: 'Todos los jueves',
      time: '5:00 PM - 6:30 PM',
      location: 'Sala Pastoral'
    },
    {
      title: 'Adoración Eucarística',
      frequency: 'Primer viernes de mes',
      time: '7:00 PM - 8:00 PM',
      location: 'Capilla Principal'
    }
  ]

  // Combinar actividades predeterminadas con las creadas por el admin
  const allActividades = [...actividades, ...adminActivities]

  // Función para convertir mes abreviado a número
  const getMonthNumber = (monthStr) => {
    const months = {
      'ENE': 0, 'FEB': 1, 'MAR': 2, 'ABR': 3, 'MAY': 4, 'JUN': 5,
      'JUL': 6, 'AGO': 7, 'SEP': 8, 'OCT': 9, 'NOV': 10, 'DIC': 11
    }
    return months[monthStr] || 0
  }

  // Función para obtener fecha de actividad
  const getActivityDate = (actividad) => {
    const monthNum = getMonthNumber(actividad.month)
    const year = parseInt(actividad.year)
    const day = parseInt(actividad.day)
    return new Date(year, monthNum, day)
  }

  // Filtrar por categoría
  const categoryFilteredActividades = activeFilter === 'all' 
    ? allActividades
    : allActividades.filter(a => a.category === activeFilter)

  // Filtrar por fecha
  const filteredActividades = (() => {
    const now = new Date()
    const sevenDaysFromNow = new Date()
    sevenDaysFromNow.setDate(now.getDate() + 7)
    
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0)

    switch(dateFilter) {
      case 'proximas':
        // Próximos 7 días
        return categoryFilteredActividades.filter(a => {
          const actDate = getActivityDate(a)
          return actDate >= now && actDate <= sevenDaysFromNow
        })
      case 'mes':
        // Este mes
        return categoryFilteredActividades.filter(a => {
          const actDate = getActivityDate(a)
          return actDate >= now && actDate <= endOfMonth
        })
      default:
        return categoryFilteredActividades
    }
  })()

  // Ordenar por fecha
  const sortedActividades = [...filteredActividades].sort((a, b) => {
    return getActivityDate(a) - getActivityDate(b)
  })

  const getBadgeClass = (category) => {
    return `${styles.activityBadge} ${styles[category]}`
  }

  const handleInscripcion = (actividadTitle) => {
    if (!currentUser) {
      showToast('Debes iniciar sesión para inscribirte a una actividad', 'warning', 4000)
      setTimeout(() => navigate('/login'), 1500)
      return
    }

    const inscripciones = JSON.parse(localStorage.getItem('inscripciones')) || []
    const yaInscrito = inscripciones.some(
      i => i.userId === currentUser.id && i.actividad === actividadTitle
    )

    if (yaInscrito) {
      showToast('Ya estás inscrito en esta actividad', 'info', 3000)
      return
    }

    const nuevaInscripcion = {
      id: Date.now(),
      userId: currentUser.id,
      userName: `${currentUser.nombre} ${currentUser.apellido}`,
      userEmail: currentUser.email,
      actividad: actividadTitle,
      fecha: new Date().toISOString()
    }

    inscripciones.push(nuevaInscripcion)
    localStorage.setItem('inscripciones', JSON.stringify(inscripciones))

    showToast(`✅ ¡Inscripción exitosa a ${actividadTitle}! Revisa tu perfil para ver todas tus actividades.`, 'success', 5000)
  }

  return (
    <div className={styles.actividadesPage}>
      {/* Page Header */}
      <section className={styles.pageHeader}>
        <div className={styles.container}>
          <h1>Nuestras Actividades</h1>
          <p>Descubre todas las actividades que tenemos para ti</p>
        </div>
      </section>

      {/* Filtros */}
      <section className={styles.activitiesFilters}>
        <div className={styles.container}>
          <div className={styles.filterWrapper}>
            {/* Filtro por Categoría */}
            <div className={styles.filterCard}>
              <div className={styles.filterHeader}>
                <span className={styles.filterIcon}>📂</span>
                <h3 className={styles.filterTitle}>Categoría</h3>
              </div>
              <div className={styles.filterButtons}>
                <button 
                  className={`${styles.filterBtn} ${activeFilter === 'all' ? styles.active : ''}`}
                  onClick={() => setActiveFilter('all')}
                >
                  <span className={styles.btnIcon}>🎯</span>
                  <span className={styles.btnText}>Todas</span>
                </button>
                <button 
                  className={`${styles.filterBtn} ${styles.espiritual} ${activeFilter === 'espiritual' ? styles.active : ''}`}
                  onClick={() => setActiveFilter('espiritual')}
                >
                  <span className={styles.btnIcon}>🙏</span>
                  <span className={styles.btnText}>Espirituales</span>
                </button>
                <button 
                  className={`${styles.filterBtn} ${styles.servicio} ${activeFilter === 'servicio' ? styles.active : ''}`}
                  onClick={() => setActiveFilter('servicio')}
                >
                  <span className={styles.btnIcon}>❤️</span>
                  <span className={styles.btnText}>Servicio</span>
                </button>
                <button 
                  className={`${styles.filterBtn} ${styles.formacion} ${activeFilter === 'formacion' ? styles.active : ''}`}
                  onClick={() => setActiveFilter('formacion')}
                >
                  <span className={styles.btnIcon}>📚</span>
                  <span className={styles.btnText}>Formación</span>
                </button>
                <button 
                  className={`${styles.filterBtn} ${styles.recreativa} ${activeFilter === 'recreativa' ? styles.active : ''}`}
                  onClick={() => setActiveFilter('recreativa')}
                >
                  <span className={styles.btnIcon}>🎉</span>
                  <span className={styles.btnText}>Recreativas</span>
                </button>
              </div>
            </div>

            {/* Filtro por Fecha */}
            <div className={styles.filterCard}>
              <div className={styles.filterHeader}>
                <span className={styles.filterIcon}>📅</span>
                <h3 className={styles.filterTitle}>Fecha</h3>
              </div>
              <div className={styles.filterButtons}>
                <button 
                  className={`${styles.filterBtn} ${dateFilter === 'all' ? styles.active : ''}`}
                  onClick={() => setDateFilter('all')}
                >
                  <span className={styles.btnIcon}>📋</span>
                  <span className={styles.btnText}>Todas</span>
                </button>
                <button 
                  className={`${styles.filterBtn} ${dateFilter === 'proximas' ? styles.active : ''}`}
                  onClick={() => setDateFilter('proximas')}
                >
                  <span className={styles.btnIcon}>⚡</span>
                  <span className={styles.btnText}>Próximos 7 días</span>
                </button>
                <button 
                  className={`${styles.filterBtn} ${dateFilter === 'mes' ? styles.active : ''}`}
                  onClick={() => setDateFilter('mes')}
                >
                  <span className={styles.btnIcon}>📆</span>
                  <span className={styles.btnText}>Este mes</span>
                </button>
              </div>
            </div>
          </div>
          
          {/* Contador de resultados */}
          <div className={styles.resultsInfo}>
            <div className={styles.resultsCount}>
              <span className={styles.resultsIcon}>�</span>
              <span className={styles.resultsText}>
                Mostrando <strong>{sortedActividades.length}</strong> {sortedActividades.length === 1 ? 'actividad' : 'actividades'}
              </span>
            </div>
            {(activeFilter !== 'all' || dateFilter !== 'all') && (
              <button 
                className={styles.clearFilters}
                onClick={() => {
                  setActiveFilter('all')
                  setDateFilter('all')
                }}
              >
                <span>🔄</span> Limpiar filtros
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Lista de Actividades */}
      <section className={styles.activitiesList}>
        <div className={styles.container}>
          <div className={styles.activitiesGridFull}>
            {sortedActividades.map((actividad, index) => (
              <div key={index} className={styles.activityFullCard}>
                <div className={styles.activityHeader}>
                  <div className={styles.activityDateLarge}>
                    <span className={styles.day}>{actividad.day}</span>
                    <span className={styles.month}>{actividad.month}</span>
                    <span className={styles.year}>{actividad.year}</span>
                  </div>
                  <div className={styles.activityTitleSection}>
                    <span className={getBadgeClass(actividad.category)}>
                      {actividad.category.charAt(0).toUpperCase() + actividad.category.slice(1)}
                    </span>
                    <h3>{actividad.title}</h3>
                  </div>
                </div>
                <div className={styles.activityBody}>
                  <p className={styles.activityDescription}>{actividad.description}</p>
                  <div className={styles.activityDetails}>
                    <div className={styles.detailItem}>
                      <span className={styles.icon}>⏰</span>
                      <span>{actividad.time}</span>
                    </div>
                    <div className={styles.detailItem}>
                      <span className={styles.icon}>📍</span>
                      <span>{actividad.location}</span>
                    </div>
                    <div className={styles.detailItem}>
                      <span className={styles.icon}>👥</span>
                      <span>{actividad.capacity}</span>
                    </div>
                  </div>
                  <button 
                    className={`${styles.btn} ${styles.btnPrimary}`}
                    onClick={() => handleInscripcion(actividad.title)}
                  >
                    Inscribirse
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Actividades Regulares */}
      <section className={styles.regularActivities}>
        <div className={styles.container}>
          <h2>Actividades Regulares</h2>
          <div className={styles.regularGrid}>
            {regularActivities.map((activity, index) => (
              <div key={index} className={styles.regularCard}>
                <h3>{activity.title}</h3>
                <p>{activity.frequency}</p>
                <p className={styles.time}>{activity.time}</p>
                <p className={styles.location}>{activity.location}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <ToastContainer />
    </div>
  )
}

export default Actividades
