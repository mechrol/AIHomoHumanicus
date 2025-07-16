import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import FrontendLayout from './components/FrontendLayout'
import Community from './pages/Community'

const FrontendModule: React.FC = () => {
  return (
    <FrontendLayout>
      <Routes>
        <Route path="/community" element={<Community />} />
        <Route path="/" element={<Navigate to="/frontend/community" replace />} />
      </Routes>
    </FrontendLayout>
  )
}

export default FrontendModule
