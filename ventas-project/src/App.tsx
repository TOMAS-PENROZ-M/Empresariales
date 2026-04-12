import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import SalesPage from './frontend/features/sales/pages/SalesPage'
import './App.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route  path="/" element={<SalesPage />} />
      </Routes>
    </Router>
  )
}

export default App
