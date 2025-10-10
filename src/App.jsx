import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import Testimonios from './pages/Testimonios'
import Actividades from './pages/Actividades'
import Login from './pages/Login'
import Registro from './pages/Registro'
import MapaServicio from './pages/MapaServicio'
import MapaServicioTest from './pages/MapaServicioTest'
import AdminPanel from './pages/AdminPanel'
import Perfil from './pages/Perfil'

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="app">
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/testimonios" element={<Testimonios />} />
              <Route path="/actividades" element={<Actividades />} />
              <Route path="/mapa-servicio" element={<MapaServicio />} />
              <Route path="/mapa-test" element={<MapaServicioTest />} />
              <Route path="/admin" element={<AdminPanel />} />
              <Route path="/perfil" element={<Perfil />} />
              <Route path="/login" element={<Login />} />
              <Route path="/registro" element={<Registro />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App
