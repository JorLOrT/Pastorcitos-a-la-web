import { Link } from 'react-router-dom'
import styles from '../styles/Terminos.module.css'

const Terminos = () => {
  return (
    <div className={styles.terminosSection}>
      <div className={styles.terminosContainer}>
        <div className={styles.terminosCard}>
          <div className={styles.terminosHeader}>
            <h1>📜 Términos y Condiciones</h1>
            <p className={styles.subtitle}>Pastoral Universitaria - La Salle</p>
          </div>

          <div className={styles.terminosContent}>
            <div className={styles.commitment}>
              <div className={styles.commitmentIcon}>✨</div>
              <h2>Compromiso del Estudiante</h2>
              <p className={styles.mainCommitment}>
                Me comprometo a ponerle <span className={styles.highlight}>20</span> a este grupo.
              </p>
            </div>

            <div className={styles.details}>
              <p>Al aceptar estos términos y condiciones, reconozco que:</p>
              <ul>
                <li>✅ Participaré activamente en las actividades pastorales</li>
                <li>✅ Contribuiré con mi mejor esfuerzo y dedicación</li>
                <li>✅ Seré un miembro comprometido de la comunidad</li>
                <li>✅ Apoyaré las iniciativas de servicio y solidaridad</li>
                <li>✅ Mantendré una actitud positiva y colaborativa</li>
              </ul>
            </div>

            <div className={styles.signature}>
              <p>🙏 Con fe, fraternidad y servicio</p>
              <p className={styles.date}>Noviembre 2025</p>
            </div>
          </div>

          <div className={styles.terminosFooter}>
            <Link to="/registro" className={styles.btnBack}>
              ← Volver al Registro
            </Link>
            <Link to="/" className={styles.btnHome}>
              🏠 Ir al Inicio
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Terminos
