import { Link } from 'react-router-dom'
import styles from '../styles/Home.module.css'

const Home = () => {
  const upcomingActivities = [
    {
      day: '15',
      month: 'OCT',
      title: 'Misa Universitaria',
      description: 'Celebración eucarística especial para la comunidad universitaria.',
      time: '12:00 PM - Capilla Principal'
    },
    {
      day: '20',
      month: 'OCT',
      title: 'Jornada de Servicio Social',
      description: 'Visita a comunidades necesitadas y actividades de ayuda.',
      time: '9:00 AM - Punto de encuentro'
    },
    {
      day: '25',
      month: 'OCT',
      title: 'Retiro Espiritual',
      description: 'Día de reflexión y encuentro personal con Dios.',
      time: '8:00 AM - Casa de retiros'
    }
  ]

  return (
    <div className={styles.home}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroOverlay}>
          <div className={styles.heroContent}>
            <h1>Bienvenidos a la Pastoral Universitaria</h1>
            <p>Un espacio de encuentro, fe y servicio en nuestra comunidad universitaria</p>
            <div className={styles.heroButtons}>
              <Link to="/actividades" className={`${styles.btn} ${styles.btnPrimary}`}>
                Ver Actividades
              </Link>
              <Link to="/testimonios" className={`${styles.btn} ${styles.btnSecondary}`}>
                Testimonios
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Sobre Nosotros */}
      <section className={styles.about}>
        <div className={styles.container}>
          <h2>Nuestra Misión</h2>
          <div className={styles.aboutContent}>
            <div className={styles.aboutCard}>
              <div className={styles.icon}>🙏</div>
              <h3>Fe</h3>
              <p>Acompañamos a los estudiantes en su camino de fe y crecimiento espiritual.</p>
            </div>
            <div className={styles.aboutCard}>
              <div className={styles.icon}>🤝</div>
              <h3>Fraternidad</h3>
              <p>Creamos espacios de encuentro y fraternidad entre estudiantes.</p>
            </div>
            <div className={styles.aboutCard}>
              <div className={styles.icon}>❤️</div>
              <h3>Servicio</h3>
              <p>Promovemos el compromiso social y el servicio a los más necesitados.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Próximas Actividades */}
      <section className={styles.upcomingActivities}>
        <div className={styles.container}>
          <h2>Próximas Actividades</h2>
          <div className={styles.activitiesGrid}>
            {upcomingActivities.map((activity, index) => (
              <div key={index} className={styles.activityCard}>
                <div className={styles.activityDate}>
                  <span className={styles.day}>{activity.day}</span>
                  <span className={styles.month}>{activity.month}</span>
                </div>
                <div className={styles.activityInfo}>
                  <h3>{activity.title}</h3>
                  <p>{activity.description}</p>
                  <span className={styles.time}>⏰ {activity.time}</span>
                </div>
              </div>
            ))}
          </div>
          <div className={styles.textCenter}>
            <Link to="/actividades" className={`${styles.btn} ${styles.btnPrimary}`}>
              Ver Todas las Actividades
            </Link>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className={styles.cta}>
        <div className={styles.container}>
          <h2>¿Quieres ser parte de nuestra comunidad?</h2>
          <p>Únete a nosotros y vive una experiencia de fe y servicio</p>
          <Link to="/registro" className={`${styles.btn} ${styles.btnLarge}`}>
            Registrarse Ahora
          </Link>
        </div>
      </section>
    </div>
  )
}

export default Home
