import React, { createContext, useContext, useEffect, useState } from 'react'
import { useAuth } from './AuthContext'

interface AdminContextType {
  isAdmin: boolean
  loading: boolean
}

const AdminContext = createContext<AdminContextType | undefined>(undefined)

export const useAdmin = () => {
  const context = useContext(AdminContext)
  if (context === undefined) {
    throw new Error('useAdmin must be used within an AdminProvider')
  }
  return context
}

export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, profile } = useAuth()
  const [isAdmin, setIsAdmin] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user && profile) {
      // For now, we'll check if user email contains 'admin' or is a specific admin email
      // In production, this should be a proper role-based system
      const adminEmails = ['admin@coczuje.pl', 'administrator@coczuje.pl']
      const isUserAdmin = adminEmails.includes(profile.email) || profile.email.includes('admin')
      setIsAdmin(isUserAdmin)
    } else {
      setIsAdmin(false)
    }
    setLoading(false)
  }, [user, profile])

  const value = {
    isAdmin,
    loading,
  }

  return <AdminContext.Provider value={value}>{children}</AdminContext.Provider>
}
