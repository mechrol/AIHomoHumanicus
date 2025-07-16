import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import BackendModule from './modules/backend/BackendModule'
import FrontendModule from './modules/frontend/FrontendModule'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          <Route path="/backend/*" element={<BackendModule />} />
          <Route path="/frontend/*" element={<FrontendModule />} />
          <Route path="/" element={<Navigate to="/backend/dashboard" replace />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
