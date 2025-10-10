import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import styles from '../styles/Actividades.module.css'

const Actividades = () => {
  const [activeFilter, setActiveFilter] = useState('all')
  const [adminActivities, setAdminActivities] = useState([])
  const { currentUser } = useAuth()
  const navigate = useNavigate()

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
      day: '15',
      month: 'OCT',
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
      day: '20',
      month: 'OCT',
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
      day: '25',
      month: 'OCT',
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
      day: '28',
      month: 'OCT',
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
      day: '02',
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
      day: '08',
      month: 'NOV',
      year: '2025',
      title: 'Visita a Asilos y Hospitales',
      description: 'Acompañamiento a personas mayores en asilos y visita a niños en hospitales. Llevaremos alegría, compañía y amor a quienes más lo necesitan.',
      time: '10:00 AM - 2:00 PM',
      location: 'Transporte desde la Universidad',
      capacity: 'Cupo limitado: 25 personas'
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

  const filteredActividades = activeFilter === 'all' 
    ? allActividades
    : allActividades.filter(a => a.category === activeFilter)

  const getBadgeClass = (category) => {
    return `${styles.activityBadge} ${styles[category]}`
  }

  const handleInscripcion = (actividadTitle) => {
    if (!currentUser) {
      alert('Debes iniciar sesión para inscribirte a una actividad')
      navigate('/login')
      return
    }

    const inscripciones = JSON.parse(localStorage.getItem('inscripciones')) || []
    const yaInscrito = inscripciones.some(
      i => i.userId === currentUser.id && i.actividad === actividadTitle
    )

    if (yaInscrito) {
      alert('Ya estás inscrito en esta actividad')
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

    alert(`¡Inscripción exitosa!\n\nTe has inscrito en: ${actividadTitle}\n\nRecibirás un correo de confirmación a: ${currentUser.email}`)
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
          <div className={styles.filters}>
            <button 
              className={`${styles.filterBtn} ${activeFilter === 'all' ? styles.active : ''}`}
              onClick={() => setActiveFilter('all')}
            >
              Todas
            </button>
            <button 
              className={`${styles.filterBtn} ${activeFilter === 'espiritual' ? styles.active : ''}`}
              onClick={() => setActiveFilter('espiritual')}
            >
              Espirituales
            </button>
            <button 
              className={`${styles.filterBtn} ${activeFilter === 'servicio' ? styles.active : ''}`}
              onClick={() => setActiveFilter('servicio')}
            >
              Servicio Social
            </button>
            <button 
              className={`${styles.filterBtn} ${activeFilter === 'formacion' ? styles.active : ''}`}
              onClick={() => setActiveFilter('formacion')}
            >
              Formación
            </button>
            <button 
              className={`${styles.filterBtn} ${activeFilter === 'recreativa' ? styles.active : ''}`}
              onClick={() => setActiveFilter('recreativa')}
            >
              Recreativas
            </button>
          </div>
        </div>
      </section>

      {/* Lista de Actividades */}
      <section className={styles.activitiesList}>
        <div className={styles.container}>
          <div className={styles.activitiesGridFull}>
            {filteredActividades.map((actividad, index) => (
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
    </div>
  )
}

export default Actividades
