import { createContext, useState, useContext, useEffect } from 'react'

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // Usuario administrador predefinido
  const ADMIN_USER = {
    id: 'admin-001',
    nombre: 'Administrador',
    apellido: 'Pastoral',
    email: 'admin@pastoral.com',
    password: 'Admin2024!',
    carrera: 'Administración',
    semestre: '10',
    telefono: '999999999',
    isAdmin: true,
    fechaRegistro: '2024-01-01'
  }

  useEffect(() => {
    // Cargar usuario desde localStorage
    const user = localStorage.getItem('currentUser')
    if (user) {
      setCurrentUser(JSON.parse(user))
    }
    
    // Asegurar que el usuario admin esté en la lista de usuarios
    const users = JSON.parse(localStorage.getItem('users')) || []
    const adminExists = users.some(u => u.email === ADMIN_USER.email)
    if (!adminExists) {
      users.push(ADMIN_USER)
      localStorage.setItem('users', JSON.stringify(users))
    }
    
    setLoading(false)
  }, [])

  const login = (email, password) => {
    // Verificar admin primero
    if (email === 'admin@pastoral.com' && password === 'Admin2024!') {
      const adminUser = {
        id: 'admin-001',
        nombre: 'Administrador',
        apellido: 'Pastoral',
        email: 'admin@pastoral.com',
        carrera: 'Administración',
        semestre: '10',
        telefono: '999999999',
        isAdmin: true,
        fechaRegistro: '2024-01-01'
      }
      setCurrentUser(adminUser)
      localStorage.setItem('currentUser', JSON.stringify(adminUser))
      return { success: true }
    }

    // Verificar usuarios registrados
    const users = JSON.parse(localStorage.getItem('users')) || []
    const user = users.find(u => u.email === email && u.password === password)
    
    if (user) {
      setCurrentUser(user)
      localStorage.setItem('currentUser', JSON.stringify(user))
      return { success: true }
    }
    
    return { success: false, error: 'Correo o contraseña incorrectos' }
  }

  const register = (userData) => {
    const users = JSON.parse(localStorage.getItem('users')) || []
    
    // Verificar si el email ya existe
    const emailExists = users.some(u => u.email === userData.email)
    if (emailExists) {
      return { success: false, error: 'Este correo ya está registrado' }
    }

    // Crear nuevo usuario
    const newUser = {
      id: Date.now(),
      ...userData,
      fechaRegistro: new Date().toISOString()
    }

    users.push(newUser)
    localStorage.setItem('users', JSON.stringify(users))
    
    // Login automático
    setCurrentUser(newUser)
    localStorage.setItem('currentUser', JSON.stringify(newUser))
    
    return { success: true }
  }

  const logout = () => {
    setCurrentUser(null)
    localStorage.removeItem('currentUser')
  }

  const value = {
    currentUser,
    login,
    register,
    logout,
    loading,
    isAdmin: currentUser?.isAdmin || false
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}
