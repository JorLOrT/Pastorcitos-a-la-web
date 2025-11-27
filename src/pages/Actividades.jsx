import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { useToast } from '../components/Toast'
import styles from '../styles/Actividades.module.css'

const Actividades = () => {
  const [activeFilter, setActiveFilter] = useState('all')
  const [dateFilter, setDateFilter] = useState('all')
  const [actividades, setActividades] = useState([])
  const { currentUser } = useAuth()
  const navigate = useNavigate()
  const { showToast, ToastContainer } = useToast()

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const res = await fetch('/api/activities');
        if (res.ok) {
          const data = await res.json();
          setActividades(data);
        }
      } catch (error) {
        console.error("Error cargando actividades", error);
      }
    };
    fetchActivities();
  }, [])

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

  const getMonthNumber = (monthStr) => {
    const months = {
      'ENE': 0, 'FEB': 1, 'MAR': 2, 'ABR': 3, 'MAY': 4, 'JUN': 5,
      'JUL': 6, 'AGO': 7, 'SEP': 8, 'OCT': 9, 'NOV': 10, 'DIC': 11
    }
    return months[monthStr] || 0
  }

  const getActivityDate = (actividad) => {
    const monthNum = getMonthNumber(actividad.month)
    const year = parseInt(actividad.year)
    const day = parseInt(actividad.day)
    return new Date(year, monthNum, day)
  }

  const categoryFilteredActividades = activeFilter === 'all' 
    ? actividades
    : actividades.filter(a => a.category === activeFilter)

  const filteredActividades = (() => {
    const now = new Date()
    const sevenDaysFromNow = new Date()
    sevenDaysFromNow.setDate(now.getDate() + 7)
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0)

    switch(dateFilter) {
      case 'proximas':
        return categoryFilteredActividades.filter(a => {
          const actDate = getActivityDate(a)
          return actDate >= now && actDate <= sevenDaysFromNow
        })
      case 'mes':
        return categoryFilteredActividades.filter(a => {
          const actDate = getActivityDate(a)
          return actDate >= now && actDate <= endOfMonth
        })
      default:
        return categoryFilteredActividades
    }
  })()

  const sortedActividades = [...filteredActividades].sort((a, b) => {
    return getActivityDate(a) - getActivityDate(b)
  })

  const getBadgeClass = (category) => {
    return `${styles.activityBadge} ${styles[category]}`
  }

  const handleInscripcion = async (actividad) => {
    if (!currentUser) {
      showToast('Debes iniciar sesión para inscribirte', 'warning', 4000)
      setTimeout(() => navigate('/login'), 1500)
      return
    }

    try {
        const res = await fetch('/api/register-activity', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId: currentUser.id, activityId: actividad.id })
        });

        if (res.ok) {
            showToast(`✅ ¡Inscripción exitosa a ${actividad.title}!`, 'success', 5000);
        } else {
            const err = await res.json();
            showToast(err.error || 'Error al inscribirse', 'info', 3000);
        }
    } catch (e) {
        showToast('Error de conexión', 'error', 3000);
    }
  }

  return (
    <div className={styles.actividadesPage}>
      <section className={styles.pageHeader}>
        <div className={styles.container}>
          <h1>Nuestras Actividades</h1>
          <p>Descubre todas las actividades que tenemos para ti</p>
        </div>
      </section>

      <section className={styles.activitiesFilters}>
        <div className={styles.container}>
          <div className={styles.filterWrapper}>
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
          
          <div className={styles.resultsInfo}>
            <div className={styles.resultsCount}>
              <span className={styles.resultsIcon}>📊</span>
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
                      <span>{actividad.time_range || actividad.time}</span>
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
                    onClick={() => handleInscripcion(actividad)}
                  >
                    Inscribirse
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

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