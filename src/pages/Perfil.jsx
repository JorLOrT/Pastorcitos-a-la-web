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

  // Redirigir si no hay usuario logueado
  if (!currentUser) {
    navigate('/login')
    return null
  }

  // Obtener inscripciones del usuario
  const inscripciones = JSON.parse(localStorage.getItem('inscripciones')) || []
  const misInscripciones = inscripciones.filter(i => i.userId === currentUser.id)

  // Todas las actividades disponibles
  const todasLasActividades = [
    { id: 1, title: 'Misa Universitaria', date: new Date(2025, 9, 15, 12, 0), category: 'espiritual', location: 'Capilla Principal' },
    { id: 2, title: 'Jornada de Servicio en Comunidades', date: new Date(2025, 9, 20, 9, 0), category: 'servicio', location: 'Punto de encuentro' },
    { id: 3, title: 'Retiro Espiritual', date: new Date(2025, 9, 25, 8, 0), category: 'espiritual', location: 'Casa de Retiros' },
    { id: 4, title: 'Taller: Liderazgo Cristiano', date: new Date(2025, 9, 28, 16, 0), category: 'formacion', location: 'Sala de Conferencias' },
    { id: 5, title: 'Tarde de Convivencia', date: new Date(2025, 10, 2, 15, 0), category: 'recreativa', location: 'Áreas Verdes' },
    { id: 6, title: 'Visita a Asilos y Hospitales', date: new Date(2025, 10, 8, 10, 0), category: 'servicio', location: 'Transporte desde Universidad' },
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
            location: actividad.location
          }
        }
      }
      return null
    }).filter(e => e !== null)
  }, [misInscripciones])

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
