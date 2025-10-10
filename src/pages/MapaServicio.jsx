import { useState, useEffect } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { Link } from 'react-router-dom'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import styles from '../styles/MapaServicio.module.css'

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
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Fix para los iconos de Leaflet en React
    try {
      delete L.Icon.Default.prototype._getIconUrl
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
        iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
      })
    } catch (error) {
      console.log('Leaflet icon fix already applied')
    }

    // Cargar ubicaciones desde localStorage
    const savedLocations = localStorage.getItem('mapaLocations')
    if (savedLocations) {
      setLocations(JSON.parse(savedLocations))
    } else {
      // Datos de ubicaciones de Arequipa
      const defaultLocations = [
        {
          id: 1,
          type: 'ninos',
          name: 'Aldea Infantil SOS Arequipa',
          description: 'Casa hogar para niños en situación de vulnerabilidad. Brindamos educación, alimentación y cuidado integral.',
          capacity: 60,
          current: 48,
          lat: -16.3989,
          lng: -71.5370,
          schedule: 'Lunes a Domingo: 8:00 AM - 6:00 PM',
          contact: {
            phone: '+51 054 251 515',
            email: 'contacto@aldeasosarequipa.org',
            address: 'Urb. La Negrita, Arequipa'
          }
        },
        {
          id: 2,
          type: 'ninos',
          name: 'Hogar de Niños María Reina',
          description: 'Albergue para niñas en situación de abandono. Ofrecemos educación, valores y desarrollo integral.',
          capacity: 40,
          current: 35,
          lat: -16.4090,
          lng: -71.5440,
          schedule: 'Lunes a Viernes: 8:00 AM - 5:00 PM',
          contact: {
            phone: '+51 054 234 567',
            email: 'mariareina@arequipa.org',
            address: 'Av. Ejército 820, Cayma, Arequipa'
          }
        },
        {
          id: 3,
          type: 'ninos',
          name: 'Casa Hogar Niño Jesús',
          description: 'Centro de acogida para niños y adolescentes en riesgo. Brindamos educación, salud y acompañamiento.',
          capacity: 55,
          current: 42,
          lat: -16.4150,
          lng: -71.5300,
          schedule: 'Lunes a Domingo: 9:00 AM - 6:00 PM',
          contact: {
            phone: '+51 054 278 901',
            email: 'casaninojesus@gmail.com',
            address: 'Calle Bolívar 345, Cercado, Arequipa'
          }
        },
        {
          id: 4,
          type: 'ancianos',
          name: 'Asilo de Ancianos Santa Ana',
          description: 'Centro de cuidado para adultos mayores. Ofrecemos atención médica, actividades recreativas y compañía.',
          capacity: 45,
          current: 40,
          lat: -16.3950,
          lng: -71.5350,
          schedule: 'Visitas: Martes a Domingo: 10:00 AM - 5:00 PM',
          contact: {
            phone: '+51 054 223 344',
            email: 'asilosantaana@hotmail.com',
            address: 'Av. Independencia 567, Arequipa'
          }
        },
        {
          id: 5,
          type: 'ancianos',
          name: 'Hogar del Adulto Mayor San Vicente de Paul',
          description: 'Residencia para adultos mayores en situación de vulnerabilidad. Brindamos cuidado integral y acompañamiento.',
          capacity: 50,
          current: 48,
          lat: -16.4080,
          lng: -71.5250,
          schedule: 'Visitas: Lunes a Sábado: 9:00 AM - 4:00 PM',
          contact: {
            phone: '+51 054 245 678',
            email: 'sanvicenteaqp@gmail.com',
            address: 'Calle San Camilo 234, Cercado, Arequipa'
          }
        },
        {
          id: 6,
          type: 'ancianos',
          name: 'Casa Hogar La Divina Providencia',
          description: 'Albergue para ancianos desamparados. Ofrecemos alimentación, salud y cariño.',
          capacity: 35,
          current: 32,
          lat: -16.4200,
          lng: -71.5400,
          schedule: 'Visitas: Martes a Domingo: 10:00 AM - 3:00 PM',
          contact: {
            phone: '+51 054 267 890',
            email: 'divinaprovidencia@yahoo.com',
            address: 'Av. Parra 890, Yanahuara, Arequipa'
          }
        },
        {
          id: 7,
          type: 'ollas',
          name: 'Olla Común Alto Selva Alegre',
          description: 'Comedor comunitario que brinda desayuno y almuerzo a familias de bajos recursos del distrito.',
          capacity: 180,
          current: 145,
          lat: -16.3800,
          lng: -71.5100,
          schedule: 'Desayuno: 7:00-9:00 AM, Almuerzo: 12:00-2:00 PM',
          contact: {
            phone: '+51 987 234 567',
            email: 'ollaaltoselva@gmail.com',
            address: 'Jr. Los Incas Mz. D Lt. 5, Alto Selva Alegre, Arequipa'
          }
        },
        {
          id: 8,
          type: 'ollas',
          name: 'Olla Común Juan Pablo II',
          description: 'Comedor popular del Cono Norte. Servimos más de 120 raciones diarias a familias necesitadas.',
          capacity: 150,
          current: 128,
          lat: -16.3700,
          lng: -71.5200,
          schedule: 'Almuerzo: 11:30 AM - 1:30 PM',
          contact: {
            phone: '+51 987 345 678',
            email: 'ollajuanpablo@hotmail.com',
            address: 'Asoc. Juan Pablo II Mz. F Lt. 12, Cerro Colorado, Arequipa'
          }
        },
        {
          id: 9,
          type: 'ollas',
          name: 'Olla Común Miraflores',
          description: 'Comedor solidario que atiende a familias del distrito. Brindamos alimentos nutritivos y apoyo comunitario.',
          capacity: 200,
          current: 175,
          lat: -16.3950,
          lng: -71.5150,
          schedule: 'Desayuno: 7:30-9:00 AM, Almuerzo: 12:00-2:00 PM',
          contact: {
            phone: '+51 987 456 789',
            email: 'ollamiraflores@gmail.com',
            address: 'Calle Las Américas Mz. K Lt. 8, Miraflores, Arequipa'
          }
        },
        {
          id: 10,
          type: 'ollas',
          name: 'Olla Común Paucarpata Unida',
          description: 'Comedor comunitario del distrito de Paucarpata. Servimos 160 raciones diarias con solidaridad.',
          capacity: 160,
          current: 142,
          lat: -16.4300,
          lng: -71.5000,
          schedule: 'Almuerzo: 11:00 AM - 1:30 PM, Cena: 6:00 PM - 7:30 PM',
          contact: {
            phone: '+51 987 567 890',
            email: 'ollapaucarpata@yahoo.com',
            address: 'Av. Universitaria Mz. C Lt. 15, Paucarpata, Arequipa'
          }
        },
        {
          id: 11,
          type: 'ollas',
          name: 'Olla Común Hunter Solidario',
          description: 'Comedor popular que brinda alimentación balanceada a familias vulnerables del distrito de Hunter.',
          capacity: 140,
          current: 118,
          lat: -16.4450,
          lng: -71.5200,
          schedule: 'Desayuno: 7:00-8:30 AM, Almuerzo: 12:00-1:30 PM',
          contact: {
            phone: '+51 987 678 901',
            email: 'ollahunter@gmail.com',
            address: 'Jr. Los Libertadores Mz. A Lt. 22, Hunter, Arequipa'
          }
        },
        {
          id: 12,
          type: 'ollas',
          name: 'Olla Común Socabaya Unida',
          description: 'Comedor comunitario que apoya a más de 130 familias con alimentos preparados diariamente.',
          capacity: 170,
          current: 138,
          lat: -16.4600,
          lng: -71.5400,
          schedule: 'Almuerzo: 11:30 AM - 2:00 PM',
          contact: {
            phone: '+51 987 789 012',
            email: 'ollasocabaya@hotmail.com',
            address: 'Av. Principal Mz. H Lt. 18, Socabaya, Arequipa'
          }
        }
      ]
      setLocations(defaultLocations)
      localStorage.setItem('mapaLocations', JSON.stringify(defaultLocations))
    }
    setLoading(false)
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
                center={[-16.4090, -71.5370]} 
                zoom={12} 
                scrollWheelZoom={false}
                style={{ height: '100%', width: '100%' }}
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
                      <div>
                        <h3>{location.name}</h3>
                        <p style={{ fontWeight: 'bold', color: '#666' }}>{getTypeLabel(location.type)}</p>
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
