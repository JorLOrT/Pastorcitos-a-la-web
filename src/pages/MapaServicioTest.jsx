import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const MapaServicioTest = () => {
  const [mounted, setMounted] = useState(false)
  const { currentUser, loading } = useAuth()

  useEffect(() => {
    console.log('MapaServicioTest montado')
    console.log('currentUser:', currentUser)
    console.log('loading:', loading)
    setMounted(true)
  }, [currentUser, loading])

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Test de Mapa de Servicio</h1>
      <div style={{ background: '#f0f0f0', padding: '1rem', margin: '1rem 0' }}>
        <p><strong>Estado:</strong></p>
        <ul>
          <li>Componente montado: {mounted ? 'Sí' : 'No'}</li>
          <li>Loading: {loading ? 'Sí' : 'No'}</li>
          <li>Usuario: {currentUser ? currentUser.nombre : 'No hay usuario'}</li>
        </ul>
      </div>
      <Link to="/" style={{ color: 'blue', textDecoration: 'underline' }}>
        Volver al inicio
      </Link>
    </div>
  )
}

export default MapaServicioTest
