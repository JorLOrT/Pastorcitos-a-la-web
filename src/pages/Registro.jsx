import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import styles from '../styles/Auth.module.css'

const Registro = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    email: '',
    carrera: '',
    semestre: '',
    telefono: '',
    password: '',
    passwordConfirm: '',
    terms: false
  })
  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  
  const { register } = useAuth()
  const navigate = useNavigate()

  const carreras = [
    'Ingeniería',
    'Administración',
    'Derecho',
    'Psicología',
    'Medicina',
    'Arquitectura',
    'Comunicación',
    'Educación',
    'Otra'
  ]

  const semestres = Array.from({ length: 10 }, (_, i) => i + 1)

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

  const validatePhone = (phone) => {
    const re = /^[+]?[\d\s-()]+$/
    return re.test(phone) && phone.replace(/\D/g, '').length >= 7
  }

  const validateForm = () => {
    const newErrors = {}

    if (formData.nombre.trim().length < 2) {
      newErrors.nombre = 'El nombre debe tener al menos 2 caracteres'
    }

    if (formData.apellido.trim().length < 2) {
      newErrors.apellido = 'El apellido debe tener al menos 2 caracteres'
    }

    if (!validateEmail(formData.email)) {
      newErrors.email = 'Por favor ingresa un correo válido'
    }

    if (!formData.carrera) {
      newErrors.carrera = 'Por favor selecciona tu carrera'
    }

    if (!formData.semestre) {
      newErrors.semestre = 'Por favor selecciona tu semestre'
    }

    if (!validatePhone(formData.telefono)) {
      newErrors.telefono = 'Por favor ingresa un teléfono válido'
    }

    if (formData.password.length < 8) {
      newErrors.password = 'La contraseña debe tener al menos 8 caracteres'
    }

    if (formData.password !== formData.passwordConfirm) {
      newErrors.passwordConfirm = 'Las contraseñas no coinciden'
    }

    if (!formData.terms) {
      newErrors.terms = 'Debes aceptar los términos y condiciones'
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

    // Simular delay de registro
    setTimeout(() => {
      const { passwordConfirm, terms, ...userData } = formData
      const result = register(userData)
      
      if (result.success) {
        setSuccess(true)
        setTimeout(() => {
          navigate('/')
        }, 1500)
      } else {
        setErrors({ email: result.error })
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
              <p>¡Registro exitoso! Redirigiendo...</p>
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
            <h2>Crear Cuenta</h2>
            <p>Únete a nuestra comunidad pastoral</p>
          </div>
          
          <form onSubmit={handleSubmit} className={styles.authForm}>
            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label htmlFor="nombre">Nombre</label>
                <input
                  type="text"
                  id="nombre"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  placeholder="Tu nombre"
                  required
                />
                {errors.nombre && (
                  <span className={styles.errorMessage}>{errors.nombre}</span>
                )}
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="apellido">Apellido</label>
                <input
                  type="text"
                  id="apellido"
                  name="apellido"
                  value={formData.apellido}
                  onChange={handleChange}
                  placeholder="Tu apellido"
                  required
                />
                {errors.apellido && (
                  <span className={styles.errorMessage}>{errors.apellido}</span>
                )}
              </div>
            </div>

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
              <label htmlFor="carrera">Carrera</label>
              <select
                id="carrera"
                name="carrera"
                value={formData.carrera}
                onChange={handleChange}
                required
              >
                <option value="">Selecciona tu carrera</option>
                {carreras.map(carrera => (
                  <option key={carrera} value={carrera.toLowerCase()}>
                    {carrera}
                  </option>
                ))}
              </select>
              {errors.carrera && (
                <span className={styles.errorMessage}>{errors.carrera}</span>
              )}
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="semestre">Semestre</label>
              <select
                id="semestre"
                name="semestre"
                value={formData.semestre}
                onChange={handleChange}
                required
              >
                <option value="">Selecciona tu semestre</option>
                {semestres.map(sem => (
                  <option key={sem} value={sem}>
                    {sem}{sem === 1 ? 'er' : sem === 3 ? 'er' : sem === 7 ? 'mo' : sem === 9 ? 'no' : sem === 10 ? 'mo' : sem === 2 ? 'do' : 'to'} Semestre
                  </option>
                ))}
              </select>
              {errors.semestre && (
                <span className={styles.errorMessage}>{errors.semestre}</span>
              )}
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="telefono">Teléfono</label>
              <input
                type="tel"
                id="telefono"
                name="telefono"
                value={formData.telefono}
                onChange={handleChange}
                placeholder="+123 456 7890"
                required
              />
              {errors.telefono && (
                <span className={styles.errorMessage}>{errors.telefono}</span>
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
              <small>Mínimo 8 caracteres</small>
              {errors.password && (
                <span className={styles.errorMessage}>{errors.password}</span>
              )}
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="passwordConfirm">Confirmar Contraseña</label>
              <input
                type="password"
                id="passwordConfirm"
                name="passwordConfirm"
                value={formData.passwordConfirm}
                onChange={handleChange}
                placeholder="••••••••"
                required
              />
              {errors.passwordConfirm && (
                <span className={styles.errorMessage}>{errors.passwordConfirm}</span>
              )}
            </div>

            <div className={styles.formGroup}>
              <label className={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  name="terms"
                  checked={formData.terms}
                  onChange={handleChange}
                />
                <span>Acepto los <a href="#" className={styles.link}>términos y condiciones</a></span>
              </label>
              {errors.terms && (
                <span className={styles.errorMessage}>{errors.terms}</span>
              )}
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
    </div>
  )
}

export default Registro
