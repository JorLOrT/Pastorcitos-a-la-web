import { useState, useEffect } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import styles from '../styles/MapaServicio.module.css'

// Fix para los iconos de Leaflet en React
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
})

// Iconos personalizados por tipo
const createCustomIcon = (type) => {
  const colors = {
    ninos: '#4CAF50',
    ancianos: '#2196F3',
    ollas: '#FF9800'
  }
  
  return L.divIcon({
    className: 'custom-icon',
    html: `<div style="background-color: ${colors[type]}; width: 30px; height: 30px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 5px rgba(0,0,0,0.3);"></div>`,
    iconSize: [30, 30],
    iconAnchor: [15, 15],
    popupAnchor: [0, -15]
  })
}

const MapaServicio = () => {
  const [locations, setLocations] = useState([])
  const [filter, setFilter] = useState('all')
  const [selectedLocation, setSelectedLocation] = useState(null)
  const { currentUser, loading } = useAuth()

  useEffect(() => {
    // Cargar ubicaciones desde localStorage
    const savedLocations = localStorage.getItem('mapaLocations')
    if (savedLocations) {
      setLocations(JSON.parse(savedLocations))
    } else {
      // Datos de ejemplo iniciales
      const defaultLocations = [
        {
          id: 1,
          type: 'ninos',
          name: 'Albergue Infantil Santa María',
          description: 'Hogar para niños en situación de vulnerabilidad. Brindamos educación, alimentación y cuidado.',
          capacity: 50,
          current: 38,
          lat: -12.0464,
          lng: -77.0428,
          schedule: 'Lunes a Domingo: 8:00 AM - 6:00 PM',
          contact: {
            phone: '+51 987 654 321',
            email: 'contacto@alberguesantamaria.org',
            address: 'Av. Los Héroes 123, Lima'
          }
        },
        {
          id: 2,
          type: 'ancianos',
          name: 'Casa del Adulto Mayor San José',
          description: 'Centro de cuidado para adultos mayores. Ofrecemos atención médica, actividades recreativas y compañía.',
          capacity: 30,
          current: 28,
          lat: -12.0564,
          lng: -77.0528,
          schedule: 'Visitas: Martes a Domingo: 10:00 AM - 5:00 PM',
          contact: {
            phone: '+51 987 654 322',
            email: 'info@casasanjose.org',
            address: 'Jr. Las Flores 456, Lima'
          }
        },
        {
          id: 3,
          type: 'ollas',
          name: 'Olla Común La Esperanza',
          description: 'Comedor comunitario que brinda desayuno y almuerzo a familias de bajos recursos.',
          capacity: 200,
          current: 150,
          lat: -12.0664,
          lng: -77.0328,
          schedule: 'Desayuno: 7:00-9:00 AM, Almuerzo: 12:00-2:00 PM',
          contact: {
            phone: '+51 987 654 323',
            email: 'ollaesperanza@gmail.com',
            address: 'Calle Los Pinos 789, Lima'
          }
        }
      ]
      setLocations(defaultLocations)
      localStorage.setItem('mapaLocations', JSON.stringify(defaultLocations))
    }
  }, [])

  const filteredLocations = filter === 'all' 
    ? locations 
    : locations.filter(loc => loc.type === filter)

  const getTypeLabel = (type) => {
    const labels = {
      ninos: 'Albergue para Niños',
      ancianos: 'Albergue para Ancianos',
      ollas: 'Olla Común'
    }
    return labels[type] || type
  }

  const getTypeColor = (type) => {
    const colors = {
      ninos: '#4CAF50',
      ancianos: '#2196F3',
      ollas: '#FF9800'
    }
    return colors[type] || '#666'
  }

  if (loading) {
    return (
      <div className={styles.mapaPage}>
        <div style={{ padding: '4rem', textAlign: 'center' }}>
          <h2>Cargando mapa...</h2>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.mapaPage}>
      {/* Page Header */}
      <section className={styles.pageHeader}>
        <div className={styles.container}>
          <h1>Mapa de Servicio Social</h1>
          <p>Lugares donde puedes hacer la diferencia</p>
          {currentUser && (
            <Link to="/admin" className={styles.adminLink}>
              🔧 Panel de Administración
            </Link>
          )}
        </div>
      </section>

      {/* Filters */}
      <section className={styles.filtersSection}>
        <div className={styles.container}>
          <div className={styles.filters}>
            <button 
              className={`${styles.filterBtn} ${filter === 'all' ? styles.active : ''}`}
              onClick={() => setFilter('all')}
            >
              Todos
            </button>
            <button 
              className={`${styles.filterBtn} ${filter === 'ninos' ? styles.active : ''}`}
              onClick={() => setFilter('ninos')}
              style={{ borderColor: '#4CAF50' }}
            >
              🏠 Albergues para Niños
            </button>
            <button 
              className={`${styles.filterBtn} ${filter === 'ancianos' ? styles.active : ''}`}
              onClick={() => setFilter('ancianos')}
              style={{ borderColor: '#2196F3' }}
            >
              👴 Albergues para Ancianos
            </button>
            <button 
              className={`${styles.filterBtn} ${filter === 'ollas' ? styles.active : ''}`}
              onClick={() => setFilter('ollas')}
              style={{ borderColor: '#FF9800' }}
            >
              🍲 Ollas Comunes
            </button>
          </div>
        </div>
      </section>

      {/* Map and List */}
      <section className={styles.mapSection}>
        <div className={styles.container}>
          <div className={styles.mapGrid}>
            {/* Map */}
            <div className={styles.mapContainer}>
              <MapContainer 
                center={[-12.0464, -77.0428]} 
                zoom={13} 
                className={styles.leafletMap}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {filteredLocations.map(location => (
                  <Marker 
                    key={location.id} 
                    position={[location.lat, location.lng]}
                    icon={createCustomIcon(location.type)}
                    eventHandlers={{
                      click: () => setSelectedLocation(location)
                    }}
                  >
                    <Popup>
                      <div className={styles.popupContent}>
                        <h3>{location.name}</h3>
                        <p className={styles.type}>{getTypeLabel(location.type)}</p>
                        <p>{location.description}</p>
                      </div>
                    </Popup>
                  </Marker>
                ))}
              </MapContainer>
              <div className={styles.mapLegend}>
                <h4>Leyenda</h4>
                <div className={styles.legendItem}>
                  <span className={styles.legendDot} style={{ backgroundColor: '#4CAF50' }}></span>
                  Albergues para Niños
                </div>
                <div className={styles.legendItem}>
                  <span className={styles.legendDot} style={{ backgroundColor: '#2196F3' }}></span>
                  Albergues para Ancianos
                </div>
                <div className={styles.legendItem}>
                  <span className={styles.legendDot} style={{ backgroundColor: '#FF9800' }}></span>
                  Ollas Comunes
                </div>
              </div>
            </div>

            {/* List */}
            <div className={styles.locationsList}>
              <h2>Ubicaciones ({filteredLocations.length})</h2>
              {filteredLocations.map(location => (
                <div 
                  key={location.id} 
                  className={`${styles.locationCard} ${selectedLocation?.id === location.id ? styles.selected : ''}`}
                  onClick={() => setSelectedLocation(location)}
                >
                  <div 
                    className={styles.locationHeader}
                    style={{ borderLeftColor: getTypeColor(location.type) }}
                  >
                    <span className={styles.locationBadge} style={{ backgroundColor: getTypeColor(location.type) }}>
                      {getTypeLabel(location.type)}
                    </span>
                    <h3>{location.name}</h3>
                  </div>
                  
                  <p className={styles.description}>{location.description}</p>
                  
                  <div className={styles.locationInfo}>
                    <div className={styles.infoItem}>
                      <span className={styles.icon}>👥</span>
                      <span>
                        <strong>Capacidad:</strong> {location.current} / {location.capacity}
                      </span>
                    </div>
                    <div className={styles.infoItem}>
                      <span className={styles.icon}>🕐</span>
                      <span>{location.schedule}</span>
                    </div>
                    <div className={styles.infoItem}>
                      <span className={styles.icon}>📍</span>
                      <span>{location.contact.address}</span>
                    </div>
                    <div className={styles.infoItem}>
                      <span className={styles.icon}>📞</span>
                      <span>{location.contact.phone}</span>
                    </div>
                    <div className={styles.infoItem}>
                      <span className={styles.icon}>📧</span>
                      <span>{location.contact.email}</span>
                    </div>
                  </div>

                  <div className={styles.progressBar}>
                    <div 
                      className={styles.progress}
                      style={{ 
                        width: `${(location.current / location.capacity) * 100}%`,
                        backgroundColor: getTypeColor(location.type)
                      }}
                    ></div>
                  </div>
                  <p className={styles.capacityText}>
                    {location.capacity - location.current} espacios disponibles
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className={styles.cta}>
        <div className={styles.container}>
          <h2>¿Quieres ser parte del cambio?</h2>
          <p>Únete a nuestras actividades de servicio social y ayuda a quienes más lo necesitan</p>
          <Link to="/actividades" className={styles.btn}>
            Ver Actividades de Servicio
          </Link>
        </div>
      </section>
    </div>
  )
}

export default MapaServicio
