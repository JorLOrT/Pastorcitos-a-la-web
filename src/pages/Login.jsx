import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useToast } from '../components/Toast'
import styles from '../styles/Auth.module.css'

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    remember: false
  })
  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  
  const { login } = useAuth()
  const navigate = useNavigate()
  const { showToast, ToastContainer } = useToast()

  const handleForgotPassword = (e) => {
    e.preventDefault()
    showToast('📧 Contacta al administrador: admin@pastoral.com', 'info', 5000)
  }

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

    if (!formData.email) {
      newErrors.email = 'El correo electrónico es obligatorio'
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Por favor ingresa un correo válido'
    }

    if (!formData.password) {
      newErrors.password = 'La contraseña es obligatoria'
    }

    setErrors(newErrors)
    
    if (Object.keys(newErrors).length > 0) {
      showToast(Object.values(newErrors)[0], 'error', 3000)
    }

    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setIsLoading(true)

    try {
      // AWAIT es fundamental aquí. Esperamos a que el servidor responda.
      const result = await login(formData.email, formData.password)
      
      if (result.success) {
        showToast('¡Bienvenido de vuelta!', 'success', 2000)
        setTimeout(() => {
          navigate('/')
        }, 1000)
      } else {
        // Aquí 'result.error' ya contiene el texto del backend (ej: "Credenciales inválidas")
        setErrors({ password: result.error })
        showToast(result.error || 'Error al iniciar sesión', 'error', 4000)
        setIsLoading(false)
      }
    } catch (error) {
      showToast('Error de conexión con el servidor', 'error', 3000)
      setIsLoading(false)
    }
  }

  return (
    <div className={styles.authSection}>
      <div className={styles.authContainer}>
        <div className={styles.authCard}>
          <div className={styles.authHeader}>
            <h2>Iniciar Sesión</h2>
            <p>Bienvenido de vuelta a la comunidad pastoral</p>
            <p className={styles.formGuide}>🔐 Ingresa tus credenciales para continuar</p>
          </div>
          
          <form onSubmit={handleSubmit} className={styles.authForm}>
            <div className={styles.formGroup}>
              <label htmlFor="email">Correo Electrónico *</label>
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
              <label htmlFor="password">Contraseña *</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Ingresa tu contraseña"
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
              <a href="#" className={styles.forgotPassword} onClick={handleForgotPassword}>
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
      <ToastContainer />
    </div>
  )
}

export default Login