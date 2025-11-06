import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import styles from '../styles/Home.module.css'

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  
  const heroSlides = [
    {
      title: 'Bienvenidos a la Pastoral Universitaria',
      subtitle: 'Un espacio de encuentro, fe y servicio',
      gradient: 'linear-gradient(135deg, rgba(4, 35, 164, 0.9) 0%, rgba(5, 48, 201, 0.8) 100%)'
    },
    {
      title: 'Crece en Fe y Comunidad',
      subtitle: 'Descubre tu propósito junto a nosotros',
      gradient: 'linear-gradient(135deg, rgba(5, 48, 201, 0.9) 0%, rgba(4, 35, 164, 0.8) 100%)'
    },
    {
      title: 'Sirve y Transforma Vidas',
      subtitle: 'Haz la diferencia en tu comunidad',
      gradient: 'linear-gradient(135deg, rgba(4, 35, 164, 0.9) 0%, rgba(30, 58, 138, 0.8) 100%)'
    }
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const stats = [
    { number: '500+', label: 'Estudiantes', icon: '👥' },
    { number: '50+', label: 'Actividades al Año', icon: '📅' },
    { number: '10+', label: 'Años de Historia', icon: '⭐' },
    { number: '100%', label: 'Compromiso', icon: '❤️' }
  ]

  const features = [
    {
      icon: '🙏',
      title: 'Vida Espiritual',
      description: 'Misas, retiros y encuentros para fortalecer tu fe',
      color: '#0423A4'
    },
    {
      icon: '🤝',
      title: 'Comunidad',
      description: 'Forma parte de una familia universitaria unida',
      color: '#0530C9'
    },
    {
      icon: '❤️',
      title: 'Servicio Social',
      description: 'Ayuda a quienes más lo necesitan en tu ciudad',
      color: '#F59E0B'
    },
    {
      icon: '🎯',
      title: 'Desarrollo Personal',
      description: 'Talleres, charlas y actividades de crecimiento',
      color: '#0423A4'
    }
  ]

  return (
    <div className={styles.home}>
      {/* Hero Section con Carousel */}
      <section className={styles.hero}>
        {heroSlides.map((slide, index) => (
          <div
            key={index}
            className={`${styles.heroSlide} ${index === currentSlide ? styles.active : ''}`}
            style={{ background: slide.gradient }}
          >
            <div className={styles.heroContent}>
              <h1 className={styles.heroTitle}>{slide.title}</h1>
              <p className={styles.heroSubtitle}>{slide.subtitle}</p>
              <div className={styles.heroButtons}>
                <Link to="/actividades" className={`${styles.btn} ${styles.btnPrimary}`}>
                  <span>🎯</span> Explorar Actividades
                </Link>
                <Link to="/registro" className={`${styles.btn} ${styles.btnSecondary}`}>
                  <span>✨</span> Únete Ahora
                </Link>
              </div>
            </div>
          </div>
        ))}
        <div className={styles.carouselDots}>
          {heroSlides.map((_, index) => (
            <button
              key={index}
              className={`${styles.dot} ${index === currentSlide ? styles.activeDot : ''}`}
              onClick={() => setCurrentSlide(index)}
              aria-label={`Ir a slide ${index + 1}`}
            />
          ))}
        </div>
        <div className={styles.scrollIndicator}>
          <span>↓</span>
        </div>
      </section>

      {/* Stats Section */}
      <section className={styles.stats}>
        <div className={styles.container}>
          <div className={styles.statsGrid}>
            {stats.map((stat, index) => (
              <div key={index} className={styles.statCard}>
                <div className={styles.statIcon}>{stat.icon}</div>
                <div className={styles.statNumber}>{stat.number}</div>
                <div className={styles.statLabel}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className={styles.features}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2>¿Qué Ofrecemos?</h2>
            <p>Experiencias que transforman tu vida universitaria</p>
          </div>
          <div className={styles.featuresGrid}>
            {features.map((feature, index) => (
              <div 
                key={index} 
                className={styles.featureCard}
                style={{ '--card-color': feature.color }}
              >
                <div className={styles.featureIcon}>{feature.icon}</div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Join Section */}
      <section className={styles.whyJoin}>
        <div className={styles.container}>
          <div className={styles.whyJoinContent}>
            <div className={styles.whyJoinText}>
              <h2>¿Por qué unirte a la Pastoral?</h2>
              <ul className={styles.benefitsList}>
                <li>
                  <span className={styles.checkIcon}>✓</span>
                  <div>
                    <strong>Crece Espiritualmente</strong>
                    <p>Fortalece tu fe y encuentra paz en medio de tus estudios</p>
                  </div>
                </li>
                <li>
                  <span className={styles.checkIcon}>✓</span>
                  <div>
                    <strong>Haz Amigos Verdaderos</strong>
                    <p>Conoce personas que comparten tus valores y aspiraciones</p>
                  </div>
                </li>
                <li>
                  <span className={styles.checkIcon}>✓</span>
                  <div>
                    <strong>Desarrolla Liderazgo</strong>
                    <p>Aprende a organizar, motivar y servir a tu comunidad</p>
                  </div>
                </li>
                <li>
                  <span className={styles.checkIcon}>✓</span>
                  <div>
                    <strong>Marca la Diferencia</strong>
                    <p>Participa en proyectos que ayudan a los más necesitados</p>
                  </div>
                </li>
              </ul>
              <Link to="/registro" className={`${styles.btn} ${styles.btnLarge}`}>
                Comienza Tu Viaje
              </Link>
            </div>
            <div className={styles.whyJoinImage}>
              <div className={styles.imageGrid}>
                <img src="/images/encuentro.jpg" alt="Comunidad" className={styles.gridImg1} />
                <img src="/images/misa.jpg" alt="Fe" className={styles.gridImg2} />
                <img src="/images/colecta.jpg" alt="Servicio" className={styles.gridImg3} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className={styles.ctaFinal}>
        <div className={styles.container}>
          <div className={styles.ctaContent}>
            <h2>¿Listo para Comenzar?</h2>
            <p>Únete a cientos de estudiantes que ya son parte de nuestra comunidad</p>
            <div className={styles.ctaButtons}>
              <Link to="/registro" className={`${styles.btn} ${styles.btnCtaPrimary}`}>
                Registrarse Gratis
              </Link>
              <Link to="/testimonios" className={`${styles.btn} ${styles.btnCtaSecondary}`}>
                Ver Testimonios
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
