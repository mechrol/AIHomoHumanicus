import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Home, Settings } from 'lucide-react'

const AdminSidebar: React.FC = () => {
  const location = useLocation()

  const sidebarItems = [
    {
      name: 'Dashboard',
      href: '/admin',
      icon: Home,
      active: location.pathname === '/admin'
    },
    {
      name: 'Community',
      href: '/admin/community',
      icon: Settings,
      active: location.pathname === '/admin/community',
      badge: 10 // This could be dynamic based on community count
    }
  ]

  return (
    <aside className="w-64 bg-gray-50 border-r border-gray-200 min-h-screen">
      <div className="p-4">
        <nav className="space-y-2">
          {sidebarItems.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className={`flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                item.active
                  ? 'text-gray-900 bg-white shadow-sm'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-white'
              }`}
            >
              <div className="flex items-center space-x-3">
                <item.icon className="h-4 w-4" />
                <span>{item.name}</span>
              </div>
              {item.badge && (
                <span className="bg-blue-600 text-white px-2 py-1 rounded-full text-xs font-medium">
                  {item.badge}
                </span>
              )}
            </Link>
          ))}
        </nav>
      </div>
    </aside>
  )
}

export default AdminSidebar
