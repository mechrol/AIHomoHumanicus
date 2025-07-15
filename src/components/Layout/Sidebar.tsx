import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Home, Users, FileText, TrendingUp, Settings, Palette } from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'

const Sidebar: React.FC = () => {
  const location = useLocation()
  const { profile } = useAuth()

  const navigation = [
    { name: 'Strona główna', href: '/', icon: Home },
    { name: 'Znajomi', href: '/friends', icon: Users },
    { name: 'Formularze', href: '/forms', icon: FileText },
    { name: 'Trendy', href: '/trends', icon: TrendingUp },
    { name: 'Społeczność', href: '/community', icon: Palette },
    { name: 'Ustawienia', href: '/settings', icon: Settings },
  ]

  return (
    <aside className="w-64 bg-white shadow-sm border-r border-gray-200 h-screen sticky top-16">
      <div className="p-4">
        {/* User Profile Card */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-4 text-white mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
              <span className="text-lg font-bold">
                {profile?.first_name?.[0]}{profile?.last_name?.[0]}
              </span>
            </div>
            <div>
              <h3 className="font-semibold">{profile?.first_name} {profile?.last_name}</h3>
              <p className="text-sm opacity-90">@{profile?.username}</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="space-y-2">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <item.icon className="h-5 w-5" />
                <span className="font-medium">{item.name}</span>
              </Link>
            )
          })}
        </nav>

        {/* Quick Stats */}
        <div className="mt-8 p-4 bg-gray-50 rounded-lg">
          <h4 className="font-semibold text-gray-900 mb-3">Twoja aktywność</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Posty</span>
              <span className="font-medium">12</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Znajomi</span>
              <span className="font-medium">48</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Formularze</span>
              <span className="font-medium">3</span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar
