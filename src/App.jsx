import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import LandingFutbol from './feature/LandingFutbol'
import Login from './feature/login'
import RecuperarPassword from './feature/RecuperarPassword'
import DashboardAdmin from './feature/DashboardAdmin'
import DashboardCapitan from './feature/DashboardCapitan'

// Solo deja pasar si hay sesión y el rol coincide; si no, manda al login
function RutaProtegida({ rol, children }) {
  const sesion = JSON.parse(localStorage.getItem('sesion') || 'null')
  if (!sesion || sesion.rol !== rol) {
    return <Navigate to="/login" replace />
  }
  return children
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingFutbol />} />
        <Route path="/login" element={<Login />} />
        <Route path="/recuperar" element={<RecuperarPassword />} />
        <Route
          path="/admin"
          element={
            <RutaProtegida rol="admin">
              <DashboardAdmin />
            </RutaProtegida>
          }
        />
        <Route
          path="/capitan"
          element={
            <RutaProtegida rol="capitan">
              <DashboardCapitan />
            </RutaProtegida>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App