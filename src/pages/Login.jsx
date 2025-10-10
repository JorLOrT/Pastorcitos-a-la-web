import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import styles from '../styles/Auth.module.css'

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    remember: false
  })
  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [showAdminInfo, setShowAdminInfo] = useState(false)
  
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
    // Limpiar error del campo
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return re.test(email)
  }

  const validateForm = () => {
    const newErrors = {}

    if (!validateEmail(formData.email)) {
      newErrors.email = 'Por favor ingresa un correo válido'
    }

    if (formData.password.length < 8) {
      newErrors.password = 'La contraseña debe tener al menos 8 caracteres'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setIsLoading(true)

    // Simular delay de autenticación
    setTimeout(() => {
      const result = login(formData.email, formData.password)
      
      if (result.success) {
        setSuccess(true)
        setTimeout(() => {
          navigate('/')
        }, 1500)
      } else {
        setErrors({ password: result.error })
      }
      
      setIsLoading(false)
    }, 500)
  }

  if (success) {
    return (
      <div className={styles.authSection}>
        <div className={styles.authContainer}>
          <div className={styles.authCard}>
            <div className={styles.successMessage}>
              <span className={styles.successIcon}>✓</span>
              <p>¡Inicio de sesión exitoso!</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.authSection}>
      <div className={styles.authContainer}>
        <div className={styles.authCard}>
          <div className={styles.authHeader}>
            <h2>Iniciar Sesión</h2>
            <p>Bienvenido de vuelta a la comunidad pastoral</p>
          </div>

          {/* Información de Admin */}
          <div className={styles.adminInfo}>
            <button 
              type="button"
              className={styles.btnAdminInfo}
              onClick={() => setShowAdminInfo(!showAdminInfo)}
            >
              ℹ️ Credenciales de Administrador
            </button>
            
            {showAdminInfo && (
              <div className={styles.adminCredentials}>
                <h4>👤 Usuario Administrador:</h4>
                <p><strong>Email:</strong> admin@pastoral.com</p>
                <p><strong>Contraseña:</strong> Admin2024!</p>
                <small>⚠️ Solo para administradores del sistema</small>
              </div>
            )}
          </div>
          
          <form onSubmit={handleSubmit} className={styles.authForm}>
            <div className={styles.formGroup}>
              <label htmlFor="email">Correo Electrónico</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="tu@email.com"
                required
              />
              {errors.email && (
                <span className={styles.errorMessage}>{errors.email}</span>
              )}
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="password">Contraseña</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                required
              />
              {errors.password && (
                <span className={styles.errorMessage}>{errors.password}</span>
              )}
            </div>

            <div className={styles.formOptions}>
              <label className={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  name="remember"
                  checked={formData.remember}
                  onChange={handleChange}
                />
                <span>Recordarme</span>
              </label>
              <a href="#" className={styles.forgotPassword}>
                ¿Olvidaste tu contraseña?
              </a>
            </div>

            <button 
              type="submit" 
              className={`${styles.btn} ${styles.btnPrimary} ${styles.btnFull}`}
              disabled={isLoading}
            >
              {isLoading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
            </button>

            <div className={styles.authDivider}>
              <span>o</span>
            </div>

            <div className={styles.authAlternative}>
              <p>¿No tienes una cuenta? <Link to="/registro">Regístrate aquí</Link></p>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login
