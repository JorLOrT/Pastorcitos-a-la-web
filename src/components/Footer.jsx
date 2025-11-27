import styles from '../styles/Footer.module.css'

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.footerContent}>
          <div className={styles.footerSection}>
            <h3>Pastoral La Salle</h3>
            <p>Acompañando a la comunidad universitaria en su camino de fe y servicio.</p>
          </div>
          <div className={styles.footerSection}>
            <h3>Contacto</h3>
            <p>📧 pastoral@ulasalle.edu</p>
            <p>📱 +51 917 707 381</p>
          </div>
          <div className={styles.footerSection}>
            <h3>Horarios</h3>
            <p>Lunes a Viernes: 9:00 AM - 6:00 PM</p>
            <p>Sábados: 9:00 AM - 2:00 PM</p>
          </div>
        </div>
        <div className={styles.footerBottom}>
          <p>&copy; 2025 Pastoral Universitaria La Salle. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
