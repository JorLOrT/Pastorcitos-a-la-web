import { useState, useEffect } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import { Link } from 'react-router-dom'
import 'leaflet/dist/leaflet.css'
import styles from '../styles/MapaServicio.module.css'

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
  const [showFilters, setShowFilters] = useState(false)

  useEffect(() => {
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

    const fetchLocations = async () => {
        try {
            const res = await fetch('/api/locations');
            if (res.ok) {
                const data = await res.json();
                setLocations(data);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }
    fetchLocations();
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
      <section className={styles.pageHeader}>
        <div className={styles.container}>
          <h1>Mapa de Servicio Social</h1>
          <p>Lugares donde puedes hacer la diferencia</p>
        </div>
      </section>

      <section className={styles.filtersSection}>
        <div className={styles.container}>
          
          <div className={styles.filterToggleContainer}>
            <button 
              className={styles.toggleFiltersBtn}
              onClick={() => setShowFilters(!showFilters)}
            >
              <span>🔍 Filtrar Lugares</span>
              <span className={styles.toggleArrow}>{showFilters ? '▲' : '▼'}</span>
            </button>
          </div>

          {showFilters && (
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
          )}
        </div>
      </section>

      <section className={styles.mapSection}>
        <div className={styles.container}>
          <div className={styles.mapGrid}>
            <div className={styles.mapContainer}>
              {/* IMPORTANTE: Se eliminó el style={{height: '100%'}} para que el CSS controle la altura en móvil */}
              <MapContainer 
                center={[-16.4090, -71.5370]} 
                zoom={12} 
                scrollWheelZoom={false}
                className={styles.leafletMap} // Clase auxiliar si hiciera falta
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
                        <span className={styles.type} style={{ color: getTypeColor(location.type) }}>
                          {getTypeLabel(location.type)}
                        </span>
                        <p>{location.description.substring(0, 100)}...</p>
                      </div>
                    </Popup>
                  </Marker>
                ))}
              </MapContainer>
              <div className={styles.mapLegend}>
                <h4>Leyenda</h4>
                <div className={styles.legendItem}>
                  <span className={styles.legendDot} style={{ backgroundColor: '#4CAF50' }}></span>
                  Albergues Niños
                </div>
                <div className={styles.legendItem}>
                  <span className={styles.legendDot} style={{ backgroundColor: '#2196F3' }}></span>
                  Albergues Ancianos
                </div>
                <div className={styles.legendItem}>
                  <span className={styles.legendDot} style={{ backgroundColor: '#FF9800' }}></span>
                  Ollas Comunes
                </div>
              </div>
            </div>

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
                        <strong>Ocupación Actual:</strong> {location.current} personas
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
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

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