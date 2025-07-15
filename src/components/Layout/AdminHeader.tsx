import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Home, Settings, BarChart3, Users, ShoppingBag, Cog } from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'

const AdminHeader: React.FC = () => {
  const location = useLocation()
  const { profile, signOut } = useAuth()

  const navigation = [
    { name: 'Dashboard', href: '/admin', icon: Home, active: location.pathname === '/admin' },
    { name: 'Community', href: '/admin/community', icon: Settings, active: location.pathname.startsWith('/admin/community') },
    { name: 'Reseller', href: '/admin/reseller', icon: ShoppingBag, active: location.pathname.startsWith('/admin/reseller') },
    { name: 'Analytics', href: '/admin/analytics', icon: BarChart3, active: location.pathname.startsWith('/admin/analytics') },
    { name: 'Integrations', href: '/admin/integrations', icon: Cog, active: location.pathname.startsWith('/admin/integrations') },
  ]

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">CZ</span>
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-900">Co czuję?</h1>
              <p className="text-xs text-gray-500 uppercase tracking-wide">ENTERPRISE</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  item.active
                    ? 'text-blue-600 bg-blue-50'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <item.icon className="h-4 w-4" />
                <span>{item.name}</span>
              </Link>
            ))}
          </nav>

          {/* User Menu */}
          <div className="flex items-center space-x-4">
            <div className="relative group">
              <button className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-50">
                <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium text-gray-700">
                    {profile?.first_name?.[0]}{profile?.last_name?.[0]}
                  </span>
                </div>
              </button>
              
              {/* Dropdown Menu */}
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <div className="p-3 border-b border-gray-100">
                  <p className="font-medium text-gray-900">{profile?.first_name} {profile?.last_name}</p>
                  <p className="text-sm text-gray-500">{profile?.email}</p>
                </div>
                <div className="p-2">
                  <Link
                    to="/"
                    className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded"
                  >
                    Powrót do aplikacji
                  </Link>
                  <button
                    onClick={signOut}
                    className="block w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded"
                  >
                    Wyloguj się
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default AdminHeader
