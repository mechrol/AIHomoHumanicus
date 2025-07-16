import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import BackendLayout from './components/BackendLayout'
import Dashboard from './pages/Dashboard'
import Analytics from './pages/Analytics'
import Integrations from './pages/Integrations'
import Reseller from './pages/Reseller'

const BackendModule: React.FC = () => {
  return (
    <BackendLayout>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/integrations" element={<Integrations />} />
        <Route path="/reseller" element={<Reseller />} />
        <Route path="/" element={<Navigate to="/backend/dashboard" replace />} />
      </Routes>
    </BackendLayout>
  )
}

export default BackendModule
