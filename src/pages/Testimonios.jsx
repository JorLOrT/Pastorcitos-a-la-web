import { Link } from 'react-router-dom'
import styles from '../styles/Testimonios.module.css'

const Testimonios = () => {
  const galleryItems = [
    { image: '/images/misa.jpg', title: 'Misa Universitaria' },
    { image: '/images/colecta.jpg', title: 'Servicio Social' },
    { image: '/images/retiro.jpg', title: 'Retiro Espiritual' },
    { image: '/images/navidad.jpg', title: 'Celebración Navideña' },
    { image: '/images/encuentro_juvenil.jpg', title: 'Encuentro Juvenil' },
    { image: '/images/encuentro.jpg', title: 'Encuentro Pastoral' }
  ]

  const testimonios = [
    {
      initial: 'M',
      text: 'La pastoral ha sido un pilar fundamental en mi vida universitaria. Aquí encontré amigos verdaderos y una comunidad que me apoya en mi crecimiento espiritual.',
      name: 'María González',
      career: 'Estudiante de Ingeniería - 4to año'
    },
    {
      initial: 'J',
      text: 'Participar en las actividades de servicio social me ha enseñado el verdadero significado de dar sin esperar nada a cambio. Es una experiencia transformadora.',
      name: 'Juan Pérez',
      career: 'Estudiante de Administración - 3er año'
    },
    {
      initial: 'A',
      text: 'Los retiros espirituales me han permitido reconectarme conmigo misma y con Dios. Es un espacio de paz en medio del ajetreo universitario.',
      name: 'Ana Martínez',
      career: 'Estudiante de Psicología - 2do año'
    },
    {
      initial: 'C',
      text: 'La pastoral no solo es un lugar de fe, sino también de amistad y crecimiento personal. Me ha ayudado a ser mejor persona cada día.',
      name: 'Carlos Rodríguez',
      career: 'Estudiante de Derecho - 5to año'
    },
    {
      initial: 'L',
      text: 'Encontré en la pastoral un segundo hogar. Las personas aquí son genuinas y siempre están dispuestas a escuchar y acompañar.',
      name: 'Laura Sánchez',
      career: 'Estudiante de Medicina - 3er año'
    },
    {
      initial: 'D',
      text: 'Las experiencias de servicio en comunidades vulnerables han cambiado mi perspectiva de vida. Ahora valoro más lo que tengo y busco ayudar a otros.',
      name: 'Diego Torres',
      career: 'Estudiante de Arquitectura - 4to año'
    }
  ]

  return (
    <div className={styles.testimoniosPage}>
      {/* Page Header */}
      <section className={styles.pageHeader}>
        <div className={styles.container}>
          <h1>Testimonios y Galería</h1>
          <p>Conoce las experiencias de nuestra comunidad pastoral</p>
        </div>
      </section>

      {/* Galería de Fotos */}
      <section className={styles.gallerySection}>
        <div className={styles.container}>
          <h2>Galería de Momentos</h2>
          <div className={styles.galleryGrid}>
            {galleryItems.map((item, index) => (
              <div key={index} className={styles.galleryItem}>
                <img src={item.image} alt={item.title} />
                <div className={styles.galleryOverlay}>
                  <p>{item.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonios */}
      <section className={styles.testimonialsSection}>
        <div className={styles.container}>
          <h2>Lo que dicen nuestros estudiantes</h2>
          <div className={styles.testimonialsGrid}>
            {testimonios.map((testimonio, index) => (
              <div key={index} className={styles.testimonialCard}>
                <div className={styles.testimonialAvatar}>
                  <div className={styles.avatarPlaceholder}>{testimonio.initial}</div>
                </div>
                <div className={styles.testimonialContent}>
                  <p className={styles.testimonialText}>"{testimonio.text}"</p>
                  <div className={styles.testimonialAuthor}>
                    <h4>{testimonio.name}</h4>
                    <span>{testimonio.career}</span>
                  </div>
                </div>
                <div className={styles.quoteIcon}>"</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className={styles.cta}>
        <div className={styles.container}>
          <h2>¿Quieres compartir tu testimonio?</h2>
          <p>Únete a nuestra comunidad y vive tu propia experiencia</p>
          <Link to="/registro" className={`${styles.btn} ${styles.btnLarge}`}>
            Únete Ahora
          </Link>
        </div>
      </section>
    </div>
  )
}

export default Testimonios
