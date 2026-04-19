import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import SalesPage from './frontend/features/sales/pages/SalesPage'
import ReportsPage from './frontend/features/sales/pages/ReportsPage'
import './App.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route  path="/" element={<SalesPage />} />
        <Route  path="/reports" element={<ReportsPage />} />
      </Routes>
    </Router>
  )
}

export default App
