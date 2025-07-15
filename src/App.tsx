import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import { AdminProvider } from './contexts/AdminContext'
import Header from './components/Layout/Header'
import Sidebar from './components/Layout/Sidebar'
import AdminHeader from './components/Layout/AdminHeader'
import AdminSidebar from './components/Layout/AdminSidebar'
import LoginForm from './components/Auth/LoginForm'
import RegisterForm from './components/Auth/RegisterForm'
import Home from './pages/Home'
import Forms from './pages/Forms'
import Community from './pages/Community'
import CustomizeCommunity from './pages/CustomizeCommunity'
import AdminDashboard from './pages/admin/AdminDashboard'
import AdminCommunity from './pages/admin/AdminCommunity'
import AdminReseller from './pages/admin/AdminReseller'
import AdminAnalytics from './pages/admin/AdminAnalytics'
import AdminIntegrations from './pages/admin/AdminIntegrations'

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!user) {
    return <Navigate to="/login" replace />
  }

  return <>{children}</>
}

const PublicRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (user) {
    return <Navigate to="/" replace />
  }

  return <>{children}</>
}

const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1">
          {children}
        </main>
      </div>
    </div>
  )
}

const AdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader />
      <div className="flex">
        <AdminSidebar />
        <main className="flex-1">
          {children}
        </main>
      </div>
    </div>
  )
}

function App() {
  return (
    <AuthProvider>
      <AdminProvider>
        <Router>
          <Routes>
            <Route
              path="/login"
              element={
                <PublicRoute>
                  <LoginForm />
                </PublicRoute>
              }
            />
            <Route
              path="/register"
              element={
                <PublicRoute>
                  <RegisterForm />
                </PublicRoute>
              }
            />
            
            {/* Admin Routes */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <AdminLayout>
                    <AdminDashboard />
                  </AdminLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/community"
              element={
                <ProtectedRoute>
                  <AdminLayout>
                    <AdminCommunity />
                  </AdminLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/reseller"
              element={
                <ProtectedRoute>
                  <AdminLayout>
                    <AdminReseller />
                  </AdminLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/analytics"
              element={
                <ProtectedRoute>
                  <AdminLayout>
                    <AdminAnalytics />
                  </AdminLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/integrations"
              element={
                <ProtectedRoute>
                  <AdminLayout>
                    <AdminIntegrations />
                  </AdminLayout>
                </ProtectedRoute>
              }
            />

            {/* Regular App Routes */}
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <AppLayout>
                    <Home />
                  </AppLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/forms"
              element={
                <ProtectedRoute>
                  <AppLayout>
                    <Forms />
                  </AppLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/community"
              element={
                <ProtectedRoute>
                  <AppLayout>
                    <Community />
                  </AppLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/community/customize"
              element={
                <ProtectedRoute>
                  <CustomizeCommunity />
                </ProtectedRoute>
              }
            />
            <Route
              path="/friends"
              element={
                <ProtectedRoute>
                  <AppLayout>
                    <div className="p-6">
                      <h1 className="text-2xl font-bold">Znajomi</h1>
                      <p className="text-gray-600 mt-2">Ta sekcja będzie dostępna w kolejnej fazie rozwoju.</p>
                    </div>
                  </AppLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/trends"
              element={
                <ProtectedRoute>
                  <AppLayout>
                    <div className="p-6">
                      <h1 className="text-2xl font-bold">Trendy</h1>
                      <p className="text-gray-600 mt-2">Ta sekcja będzie dostępna w kolejnej fazie rozwoju.</p>
                    </div>
                  </AppLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/settings"
              element={
                <ProtectedRoute>
                  <AppLayout>
                    <div className="p-6">
                      <h1 className="text-2xl font-bold">Ustawienia</h1>
                      <p className="text-gray-600 mt-2">Ta sekcja będzie dostępna w kolejnej fazie rozwoju.</p>
                    </div>
                  </AppLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/notifications"
              element={
                <ProtectedRoute>
                  <AppLayout>
                    <div className="p-6">
                      <h1 className="text-2xl font-bold">Powiadomienia</h1>
                      <p className="text-gray-600 mt-2">Ta sekcja będzie dostępna w kolejnej fazie rozwoju.</p>
                    </div>
                  </AppLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/messages"
              element={
                <ProtectedRoute>
                  <AppLayout>
                    <div className="p-6">
                      <h1 className="text-2xl font-bold">Wiadomości</h1>
                      <p className="text-gray-600 mt-2">Ta sekcja będzie dostępna w kolejnej fazie rozwoju.</p>
                    </div>
                  </AppLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <AppLayout>
                    <div className="p-6">
                      <h1 className="text-2xl font-bold">Profil</h1>
                      <p className="text-gray-600 mt-2">Ta sekcja będzie dostępna w kolejnej fazie rozwoju.</p>
                    </div>
                  </AppLayout>
                </ProtectedRoute>
              }
            />
          </Routes>
        </Router>
      </AdminProvider>
    </AuthProvider>
  )
}

export default App
