import { useState, useMemo } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { Calendar, dateFnsLocalizer } from 'react-big-calendar'
import { format, parse, startOfWeek, getDay } from 'date-fns'
import { es } from 'date-fns/locale'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import styles from '../styles/Perfil.module.css'

const locales = {
  'es': es,
}

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
})

const Perfil = () => {
  const { currentUser, logout } = useAuth()
  const navigate = useNavigate()
  const [view, setView] = useState('calendario')
  const [selectedEvent, setSelectedEvent] = useState(null)

  // Redirigir si no hay usuario logueado
  if (!currentUser) {
    navigate('/login')
    return null
  }

  // Obtener inscripciones del usuario
  const inscripciones = JSON.parse(localStorage.getItem('inscripciones')) || []
  const misInscripciones = inscripciones.filter(i => i.userId === currentUser.id)

  // Todas las actividades disponibles con descripciones completas
  const todasLasActividades = [
    { 
      id: 1, 
      title: 'Misa Universitaria', 
      date: new Date(2025, 10, 6, 12, 0), 
      category: 'espiritual', 
      location: 'Capilla Principal',
      description: 'Celebración eucarística especial para toda la comunidad universitaria. Un momento de encuentro con Dios y de fraternidad entre estudiantes.',
      time: '12:00 PM - 1:00 PM',
      capacity: 'Abierto a todos'
    },
    { 
      id: 2, 
      title: 'Jornada de Servicio en Comunidades', 
      date: new Date(2025, 10, 9, 9, 0), 
      category: 'servicio', 
      location: 'Punto de encuentro',
      description: 'Visitaremos comunidades necesitadas para llevar ayuda material y espiritual. Actividades de construcción, enseñanza y acompañamiento.',
      time: '9:00 AM - 4:00 PM',
      capacity: 'Cupo limitado: 30 personas'
    },
    { 
      id: 3, 
      title: 'Retiro Espiritual', 
      date: new Date(2025, 10, 13, 8, 0), 
      category: 'espiritual', 
      location: 'Casa de Retiros',
      description: 'Un día completo de reflexión, oración y encuentro personal con Dios. Incluye momentos de silencio, charlas formativas y celebración eucarística.',
      time: '8:00 AM - 6:00 PM',
      capacity: 'Cupo limitado: 40 personas'
    },
    { 
      id: 4, 
      title: 'Taller: Liderazgo Cristiano', 
      date: new Date(2025, 10, 16, 16, 0), 
      category: 'formacion', 
      location: 'Sala de Conferencias',
      description: 'Taller interactivo sobre los principios del liderazgo desde una perspectiva cristiana. Aprende a liderar con valores y servicio.',
      time: '4:00 PM - 6:00 PM',
      capacity: 'Abierto a todos'
    },
    { 
      id: 5, 
      title: 'Tarde de Convivencia', 
      date: new Date(2025, 10, 20, 15, 0), 
      category: 'recreativa', 
      location: 'Áreas Verdes',
      description: 'Tarde de juegos, música y convivencia fraterna. Un espacio para conocernos mejor y fortalecer los lazos de amistad en nuestra comunidad.',
      time: '3:00 PM - 7:00 PM',
      capacity: 'Abierto a todos'
    },
    { 
      id: 6, 
      title: 'Visita a Asilos y Hospitales', 
      date: new Date(2025, 10, 25, 10, 0), 
      category: 'servicio', 
      location: 'Transporte desde Universidad',
      description: 'Acompañamiento a personas mayores en asilos y visita a niños en hospitales. Llevaremos alegría, compañía y amor a quienes más lo necesitan.',
      time: '10:00 AM - 2:00 PM',
      capacity: 'Cupo limitado: 25 personas'
    },
    { 
      id: 7, 
      title: 'Charla: Fe y Ciencia', 
      date: new Date(2025, 10, 28, 17, 0), 
      category: 'formacion', 
      location: 'Auditorio Principal',
      description: 'Diálogo sobre la relación entre fe y ciencia en el mundo contemporáneo. Con invitados especiales del ámbito académico.',
      time: '5:00 PM - 7:00 PM',
      capacity: 'Abierto a todos'
    },
    { 
      id: 8, 
      title: 'Adviento: Preparación Navideña', 
      date: new Date(2025, 11, 2, 18, 0), 
      category: 'espiritual', 
      location: 'Capilla Principal',
      description: 'Inicio del tiempo de Adviento con oración especial y reflexión sobre el significado de la Navidad.',
      time: '6:00 PM - 7:30 PM',
      capacity: 'Abierto a todos'
    },
    { 
      id: 9, 
      title: 'Noche de Villancicos', 
      date: new Date(2025, 11, 6, 19, 0), 
      category: 'recreativa', 
      location: 'Plaza Central',
      description: 'Celebración navideña con villancicos, chocolate caliente y compartir fraterno. Trae tu alegría y voz para cantar juntos.',
      time: '7:00 PM - 9:00 PM',
      capacity: 'Abierto a todos'
    },
    { 
      id: 10, 
      title: 'Recaudación de Juguetes', 
      date: new Date(2025, 11, 10, 9, 0), 
      category: 'servicio', 
      location: 'Stand Entrada Principal',
      description: 'Campaña solidaria de recolección de juguetes para niños en situación vulnerable. Tu donación puede alegrar la Navidad de un niño.',
      time: '9:00 AM - 5:00 PM',
      capacity: 'Todos pueden participar'
    },
  ]

  // Convertir inscripciones a eventos del calendario
  const eventosCalendario = useMemo(() => {
    return misInscripciones.map(inscripcion => {
      const actividad = todasLasActividades.find(a => a.title === inscripcion.actividad)
      if (actividad) {
        return {
          title: actividad.title,
          start: actividad.date,
          end: new Date(actividad.date.getTime() + 60 * 60 * 1000), // +1 hora
          resource: {
            category: actividad.category,
            location: actividad.location,
            description: actividad.description,
            time: actividad.time,
            capacity: actividad.capacity,
            actividadCompleta: actividad
          }
        }
      }
      return null
    }).filter(e => e !== null)
  }, [misInscripciones])

  const handleSelectEvent = (event) => {
    setSelectedEvent(event)
  }

  const closeModal = () => {
    setSelectedEvent(null)
  }

  const handleCancelarInscripcion = (inscripcionId) => {
    if (window.confirm('¿Estás seguro de que deseas cancelar tu inscripción?')) {
      const todasInscripciones = JSON.parse(localStorage.getItem('inscripciones')) || []
      const nuevasInscripciones = todasInscripciones.filter(i => i.id !== inscripcionId)
      localStorage.setItem('inscripciones', JSON.stringify(nuevasInscripciones))
      window.location.reload()
    }
  }

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const eventStyleGetter = (event) => {
    const categoryColors = {
      espiritual: '#0423A4',
      servicio: '#ec4899',
      formacion: '#2f5dd1',
      recreativa: '#fbbf24'
    }
    
    const backgroundColor = categoryColors[event.resource?.category] || '#95a5a6'
    
    return {
      style: {
        backgroundColor,
        borderRadius: '5px',
        opacity: 0.9,
        color: 'white',
        border: '0px',
        display: 'block'
      }
    }
  }

  return (
    <div className={styles.perfilPage}>
      {/* Header del Perfil */}
      <section className={styles.perfilHeader}>
        <div className={styles.container}>
          <div className={styles.userInfo}>
            <div className={styles.avatarCircle}>
              {currentUser.nombre.charAt(0)}{currentUser.apellido.charAt(0)}
            </div>
            <div className={styles.userDetails}>
              <h1>{currentUser.nombre} {currentUser.apellido}</h1>
              <p>{currentUser.email}</p>
              {currentUser.id === 'admin-001' && <span className={styles.adminBadge}>Administrador</span>}
            </div>
          </div>
          <button className={`${styles.btn} ${styles.btnSecondary}`} onClick={handleLogout}>
            Cerrar Sesión
          </button>
        </div>
      </section>

      {/* Navegación de Vistas */}
      <section className={styles.viewToggle}>
        <div className={styles.container}>
          <div className={styles.toggleButtons}>
            <button 
              className={`${styles.toggleBtn} ${view === 'calendario' ? styles.active : ''}`}
              onClick={() => setView('calendario')}
            >
              📅 Calendario
            </button>
            <button 
              className={`${styles.toggleBtn} ${view === 'lista' ? styles.active : ''}`}
              onClick={() => setView('lista')}
            >
              📋 Mis Inscripciones
            </button>
          </div>
        </div>
      </section>

      {/* Vista de Calendario */}
      {view === 'calendario' && (
        <section className={styles.calendarSection}>
          <div className={styles.container}>
            <h2>Mi Calendario de Actividades</h2>
            {eventosCalendario.length > 0 ? (
              <>
                <div className={styles.calendarLegend}>
                  <div className={styles.legendItem}>
                    <span className={`${styles.legendColor} ${styles.espiritual}`}></span>
                    <span>Espiritual</span>
                  </div>
                  <div className={styles.legendItem}>
                    <span className={`${styles.legendColor} ${styles.servicio}`}></span>
                    <span>Servicio</span>
                  </div>
                  <div className={styles.legendItem}>
                    <span className={`${styles.legendColor} ${styles.formacion}`}></span>
                    <span>Formación</span>
                  </div>
                  <div className={styles.legendItem}>
                    <span className={`${styles.legendColor} ${styles.recreativa}`}></span>
                    <span>Recreativa</span>
                  </div>
                </div>
                <div className={styles.calendarWrapper}>
                  <Calendar
                    localizer={localizer}
                    events={eventosCalendario}
                    startAccessor="start"
                    endAccessor="end"
                    style={{ height: 600 }}
                    culture="es"
                    messages={{
                      next: "Siguiente",
                      previous: "Anterior",
                      today: "Hoy",
                      month: "Mes",
                      week: "Semana",
                      day: "Día",
                      agenda: "Agenda",
                      date: "Fecha",
                      time: "Hora",
                      event: "Actividad",
                      noEventsInRange: "No hay actividades en este rango",
                      showMore: (total) => `+ Ver más (${total})`
                    }}
                    eventPropGetter={eventStyleGetter}
                    onSelectEvent={handleSelectEvent}
                  />
                </div>
              </>
            ) : (
              <div className={styles.emptyState}>
                <p>No tienes actividades inscritas todavía.</p>
                <button className={`${styles.btn} ${styles.btnPrimary}`} onClick={() => navigate('/actividades')}>
                  Ver Actividades Disponibles
                </button>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Modal de Información de Actividad */}
      {selectedEvent && (
        <div className={styles.modalOverlay} onClick={closeModal}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button className={styles.closeBtn} onClick={closeModal}>×</button>
            <div className={styles.modalHeader}>
              <h2>{selectedEvent.title}</h2>
              <span className={`${styles.categoryBadge} ${styles[selectedEvent.resource?.category]}`}>
                {selectedEvent.resource?.category}
              </span>
            </div>
            <div className={styles.modalBody}>
              <div className={styles.infoRow}>
                <span className={styles.icon}>📅</span>
                <strong>Fecha:</strong>
                <span>{format(selectedEvent.start, "EEEE, d 'de' MMMM 'de' yyyy", { locale: es })}</span>
              </div>
              <div className={styles.infoRow}>
                <span className={styles.icon}>⏰</span>
                <strong>Horario:</strong>
                <span>{selectedEvent.resource?.time}</span>
              </div>
              <div className={styles.infoRow}>
                <span className={styles.icon}>📍</span>
                <strong>Ubicación:</strong>
                <span>{selectedEvent.resource?.location}</span>
              </div>
              <div className={styles.infoRow}>
                <span className={styles.icon}>👥</span>
                <strong>Capacidad:</strong>
                <span>{selectedEvent.resource?.capacity}</span>
              </div>
              <div className={styles.descriptionSection}>
                <strong>📝 Descripción:</strong>
                <p>{selectedEvent.resource?.description}</p>
              </div>
            </div>
            <div className={styles.modalFooter}>
              <button className={`${styles.btn} ${styles.btnPrimary}`} onClick={closeModal}>
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Vista de Lista */}
      {view === 'lista' && (
        <section className={styles.inscripcionesSection}>
          <div className={styles.container}>
            <h2>Mis Inscripciones</h2>
            {misInscripciones.length > 0 ? (
              <div className={styles.inscripcionesGrid}>
                {misInscripciones.map((inscripcion) => {
                  const actividad = todasLasActividades.find(a => a.title === inscripcion.actividad)
                  return (
                    <div key={inscripcion.id} className={styles.inscripcionCard}>
                      <div className={styles.cardHeader}>
                        <h3>{inscripcion.actividad}</h3>
                        <span className={`${styles.categoryBadge} ${styles[actividad?.category]}`}>
                          {actividad?.category || 'general'}
                        </span>
                      </div>
                      <div className={styles.cardBody}>
                        {actividad && (
                          <>
                            <p><span className={styles.icon}>📅</span> {format(actividad.date, "d 'de' MMMM 'de' yyyy", { locale: es })}</p>
                            <p><span className={styles.icon}>⏰</span> {format(actividad.date, 'HH:mm', { locale: es })}</p>
                            <p><span className={styles.icon}>📍</span> {actividad.location}</p>
                          </>
                        )}
                        <p className={styles.inscritoDate}>
                          <span className={styles.icon}>✅</span> 
                          Inscrito el: {format(new Date(inscripcion.fecha), "d/MM/yyyy 'a las' HH:mm", { locale: es })}
                        </p>
                      </div>
                      <div className={styles.cardFooter}>
                        <button 
                          className={`${styles.btn} ${styles.btnDanger}`}
                          onClick={() => handleCancelarInscripcion(inscripcion.id)}
                        >
                          Cancelar Inscripción
                        </button>
                      </div>
                    </div>
                  )
                })}
              </div>
            ) : (
              <div className={styles.emptyState}>
                <p>No tienes inscripciones activas.</p>
                <button className={`${styles.btn} ${styles.btnPrimary}`} onClick={() => navigate('/actividades')}>
                  Explorar Actividades
                </button>
              </div>
            )}
          </div>
        </section>
      )}
    </div>
  )
}

export default Perfil
