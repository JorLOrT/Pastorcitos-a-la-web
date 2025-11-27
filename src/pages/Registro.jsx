import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useToast } from '../components/Toast'
import styles from '../styles/Auth.module.css'

const Registro = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    email: '',
    carrera: '',
    semestre: '',
    password: '',
    passwordConfirm: '',
    terms: false
  })
  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  
  const { register } = useAuth()
  const navigate = useNavigate()
  const { showToast, ToastContainer } = useToast()

  const carreras = [
    'Arquitectura y Urbanismo',
    'Psicología',
    'Ciencias de la Comunicación',
    'Ingeniería de Software',
    'Ingeniería Industrial',
    'Ingeniería Comercial',
    'Derecho',
    'Administración y Negocios Internacionales'
  ]

  const getSemestres = () => {
    const maxSemestre = formData.carrera === 'Derecho' ? 12 : 10
    return Array.from({ length: maxSemestre }, (_, i) => i + 1)
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    
    if (name === 'carrera') {
      const maxSemestre = value === 'Derecho' ? 12 : 10
      const currentSemestre = parseInt(formData.semestre)
      
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value,
        semestre: currentSemestre > maxSemestre ? '' : prev.semestre
      }))
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }))
    }
    
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

    if (!formData.nombre.trim()) newErrors.nombre = 'El nombre es obligatorio'
    if (!formData.apellido.trim()) newErrors.apellido = 'El apellido es obligatorio'
    
    if (!formData.email) {
      newErrors.email = 'El correo es obligatorio'
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Correo inválido'
    }

    if (!formData.carrera) newErrors.carrera = 'Selecciona tu carrera'
    if (!formData.semestre) newErrors.semestre = 'Selecciona tu semestre'

    if (!formData.password) {
      newErrors.password = 'La contraseña es obligatoria'
    } else if (formData.password.length < 8) {
      newErrors.password = 'Mínimo 8 caracteres'
    }

    if (formData.password !== formData.passwordConfirm) {
      newErrors.passwordConfirm = 'Las contraseñas no coinciden'
    }

    if (!formData.terms) {
      newErrors.terms = 'Debes aceptar los términos'
    }

    setErrors(newErrors)
    
    if (Object.keys(newErrors).length > 0) {
      showToast('Por favor corrige los errores', 'error', 3000)
    }
    
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => { // Agregado async
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setIsLoading(true)

    try {
      // Eliminamos campos auxiliares antes de enviar
      const { passwordConfirm, terms, ...userData } = formData
      
      // AWAIT ES CRUCIAL AQUÍ para esperar la respuesta del servidor
      const result = await register(userData)
      
      if (result.success) {
        showToast('¡Registro exitoso! Bienvenido a la comunidad', 'success', 3000)
        setTimeout(() => {
          navigate('/')
        }, 2000)
      } else {
        // Si el backend devuelve error (ej. email duplicado)
        setErrors({ email: result.error })
        showToast(result.error || 'Error al registrar', 'error', 4000)
        setIsLoading(false)
      }
    } catch (error) {
      showToast('Error de conexión', 'error', 3000)
      setIsLoading(false)
    }
  }

  return (
    <div className={styles.authSection}>
      <div className={styles.authContainer}>
        <div className={styles.authCard}>
          <div className={styles.authHeader}>
            <h2>Crear Cuenta</h2>
            <p>Únete a nuestra comunidad pastoral</p>
          </div>
          
          <form onSubmit={handleSubmit} className={styles.authForm}>
            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label htmlFor="nombre">Nombre *</label>
                <input
                  type="text"
                  id="nombre"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  placeholder="Tu nombre"
                  required
                />
                {errors.nombre && <span className={styles.errorMessage}>{errors.nombre}</span>}
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="apellido">Apellido *</label>
                <input
                  type="text"
                  id="apellido"
                  name="apellido"
                  value={formData.apellido}
                  onChange={handleChange}
                  placeholder="Tu apellido"
                  required
                />
                {errors.apellido && <span className={styles.errorMessage}>{errors.apellido}</span>}
              </div>
            </div>

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
              {errors.email && <span className={styles.errorMessage}>{errors.email}</span>}
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="carrera">Carrera *</label>
              <select
                id="carrera"
                name="carrera"
                value={formData.carrera}
                onChange={handleChange}
                required
              >
                <option value="">Selecciona tu carrera</option>
                {carreras.map(carrera => (
                  <option key={carrera} value={carrera}>{carrera}</option>
                ))}
              </select>
              {errors.carrera && <span className={styles.errorMessage}>{errors.carrera}</span>}
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="semestre">Semestre *</label>
              <select
                id="semestre"
                name="semestre"
                value={formData.semestre}
                onChange={handleChange}
                required
                disabled={!formData.carrera}
              >
                <option value="">
                  {formData.carrera ? 'Selecciona tu semestre' : 'Primero selecciona una carrera'}
                </option>
                {formData.carrera && getSemestres().map(sem => (
                  <option key={sem} value={sem}>{sem}º Semestre</option>
                ))}
              </select>
              {errors.semestre && <span className={styles.errorMessage}>{errors.semestre}</span>}
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="password">Contraseña *</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Mínimo 8 caracteres"
                required
              />
              {errors.password && <span className={styles.errorMessage}>{errors.password}</span>}
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="passwordConfirm">Confirmar Contraseña *</label>
              <input
                type="password"
                id="passwordConfirm"
                name="passwordConfirm"
                value={formData.passwordConfirm}
                onChange={handleChange}
                placeholder="••••••••"
                required
              />
              {errors.passwordConfirm && <span className={styles.errorMessage}>{errors.passwordConfirm}</span>}
            </div>

            <div className={styles.formGroup}>
              <label className={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  name="terms"
                  checked={formData.terms}
                  onChange={handleChange}
                />
                <span>Acepto los <Link to="/terminos" className={styles.link}>términos y condiciones</Link></span>
              </label>
              {errors.terms && <span className={styles.errorMessage}>{errors.terms}</span>}
            </div>

            <button 
              type="submit" 
              className={`${styles.btn} ${styles.btnPrimary} ${styles.btnFull}`}
              disabled={isLoading}
            >
              {isLoading ? 'Creando cuenta...' : 'Crear Cuenta'}
            </button>

            <div className={styles.authDivider}>
              <span>o</span>
            </div>

            <div className={styles.authAlternative}>
              <p>¿Ya tienes una cuenta? <Link to="/login">Inicia sesión aquí</Link></p>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  )
}

export default Registro