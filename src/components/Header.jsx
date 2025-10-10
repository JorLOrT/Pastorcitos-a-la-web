import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import styles from '../styles/Header.module.css'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { currentUser, logout, isAdmin } = useAuth()
  const navigate = useNavigate()

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const handleLogout = () => {
    if (window.confirm('¿Deseas cerrar sesión?')) {
      logout()
      navigate('/')
    }
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  return (
    <header className={styles.header}>
      <nav className={styles.navbar}>
        <div className={styles.container}>
          <div className={styles.logo}>
            <h1>Pastoral La Salle</h1>
          </div>
          
          <ul className={`${styles.navMenu} ${isMenuOpen ? styles.active : ''}`}>
            <li><Link to="/" onClick={closeMenu}>Inicio</Link></li>
            <li><Link to="/testimonios" onClick={closeMenu}>Testimonios</Link></li>
            <li><Link to="/actividades" onClick={closeMenu}>Actividades</Link></li>
            <li><Link to="/mapa-servicio" onClick={closeMenu}>Mapa de Servicio</Link></li>
            {isAdmin && (
              <li><Link to="/admin" onClick={closeMenu} className={styles.adminLink}>🔧 Administración</Link></li>
            )}
            {currentUser ? (
              <>
                <li>
                  <Link to="/perfil" onClick={closeMenu} className={styles.btnPerfil}>
                    👤 Mi Perfil
                  </Link>
                </li>
                <li>
                  <button onClick={handleLogout} className={styles.btnLogout}>
                    Cerrar Sesión
                  </button>
                </li>
              </>
            ) : (
              <li>
                <Link to="/login" className={styles.btnLogin} onClick={closeMenu}>
                  Iniciar Sesión
                </Link>
              </li>
            )}
          </ul>
          
          <div 
            className={`${styles.hamburger} ${isMenuOpen ? styles.active : ''}`}
            onClick={toggleMenu}
          >
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Header
