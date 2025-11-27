import { useState, useMemo, useEffect } from 'react'
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
  const [misInscripciones, setMisInscripciones] = useState([])

  useEffect(() => {
    if (!currentUser) {
      navigate('/login')
      return
    }

    const fetchRegistrations = async () => {
        try {
            const res = await fetch(`/api/my-registrations/${currentUser.id}`);
            if (res.ok) {
                const data = await res.json();
                setMisInscripciones(data);
            }
        } catch (error) {
            console.error(error);
        }
    }
    fetchRegistrations();
  }, [currentUser, navigate])

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const eventosCalendario = useMemo(() => {
    return misInscripciones.map(inscripcion => {
      // Reconstruir objeto fecha
      const monthIndex = ['ENE', 'FEB', 'MAR', 'ABR', 'MAY', 'JUN', 'JUL', 'AGO', 'SEP', 'OCT', 'NOV', 'DIC'].indexOf(inscripcion.month);
      const start = new Date(parseInt(inscripcion.year), monthIndex, parseInt(inscripcion.day));
      
      // Asignar horas (simple estimación ya que time_range es texto)
      start.setHours(12); 
      
      return {
          title: inscripcion.title,
          start: start,
          end: new Date(start.getTime() + 60 * 60 * 1000),
          resource: {
            category: inscripcion.category,
            location: inscripcion.location,
            description: inscripcion.description,
            time: inscripcion.time_range,
            capacity: inscripcion.capacity,
            registrationId: inscripcion.registration_id
          }
      }
    })
  }, [misInscripciones])

  const handleSelectEvent = (event) => {
    setSelectedEvent(event)
  }

  const closeModal = () => {
    setSelectedEvent(null)
  }

  const handleCancelarInscripcion = async (registrationId) => {
    if (window.confirm('¿Estás seguro de que deseas cancelar tu inscripción?')) {
      try {
          await fetch(`/api/registrations/${registrationId}`, { method: 'DELETE' });
          setMisInscripciones(misInscripciones.filter(i => i.registration_id !== registrationId));
      } catch (error) {
          console.error(error);
      }
    }
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

  if (!currentUser) return null;

  return (
    <div className={styles.perfilPage}>
      <section className={styles.perfilHeader}>
        <div className={styles.container}>
          <div className={styles.userInfo}>
            <div className={styles.avatarCircle}>
              {currentUser.nombre.charAt(0)}{currentUser.apellido.charAt(0)}
            </div>
            <div className={styles.userDetails}>
              <h1>{currentUser.nombre} {currentUser.apellido}</h1>
              <p>{currentUser.email}</p>
              {currentUser.is_admin && <span className={styles.adminBadge}>Administrador</span>}
            </div>
          </div>
          <button className={`${styles.btn} ${styles.btnSecondary}`} onClick={handleLogout}>
            Cerrar Sesión
          </button>
        </div>
      </section>

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

      {view === 'lista' && (
        <section className={styles.inscripcionesSection}>
          <div className={styles.container}>
            <h2>Mis Inscripciones</h2>
            {misInscripciones.length > 0 ? (
              <div className={styles.inscripcionesGrid}>
                {misInscripciones.map((inscripcion) => {
                  return (
                    <div key={inscripcion.registration_id} className={styles.inscripcionCard}>
                      <div className={styles.cardHeader}>
                        <h3>{inscripcion.title}</h3>
                        <span className={`${styles.categoryBadge} ${styles[inscripcion.category]}`}>
                          {inscripcion.category}
                        </span>
                      </div>
                      <div className={styles.cardBody}>
                        <p><span className={styles.icon}>📅</span> {inscripcion.day} {inscripcion.month} {inscripcion.year}</p>
                        <p><span className={styles.icon}>⏰</span> {inscripcion.time_range}</p>
                        <p><span className={styles.icon}>📍</span> {inscripcion.location}</p>
                        <p className={styles.inscritoDate}>
                          <span className={styles.icon}>✅</span> 
                          Inscrito el: {new Date(inscripcion.fecha).toLocaleDateString()}
                        </p>
                      </div>
                      <div className={styles.cardFooter}>
                        <button 
                          className={`${styles.btn} ${styles.btnDanger}`}
                          onClick={() => handleCancelarInscripcion(inscripcion.registration_id)}
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