import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Settings, Users, BookOpen, Calendar, MessageSquare, TrendingUp, ChevronDown, Plus, BarChart3, UserPlus, FileText, Video } from 'lucide-react'

const Community: React.FC = () => {
  const [showActionsDropdown, setShowActionsDropdown] = useState(false)

  const communityStats = [
    { label: 'Członkowie', value: '1,234', icon: Users, color: 'text-blue-600' },
    { label: 'Kursy', value: '12', icon: BookOpen, color: 'text-green-600' },
    { label: 'Wydarzenia', value: '8', icon: Calendar, color: 'text-purple-600' },
    { label: 'Dyskusje', value: '456', icon: MessageSquare, color: 'text-orange-600' },
  ]

  const recentActivity = [
    {
      id: 1,
      type: 'new_member',
      user: 'Anna Kowalska',
      action: 'dołączyła do społeczności',
      time: '2 godziny temu',
      avatar: 'AK'
    },
    {
      id: 2,
      type: 'new_course',
      user: 'Marcin Nowak',
      action: 'opublikował nowy kurs "Zarządzanie emocjami"',
      time: '4 godziny temu',
      avatar: 'MN'
    },
    {
      id: 3,
      type: 'discussion',
      user: 'Katarzyna Wiśniewska',
      action: 'rozpoczęła dyskusję o mindfulness',
      time: '6 godzin temu',
      avatar: 'KW'
    }
  ]

  const actionItems = [
    {
      icon: Settings,
      label: 'Dostosuj społeczność',
      description: 'Zarządzaj kursami, członkami i ustawieniami',
      href: '/community/customize',
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      icon: Plus,
      label: 'Stwórz nowy kurs',
      description: 'Dodaj wartościowe treści dla społeczności',
      href: '/community/create-course',
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      icon: UserPlus,
      label: 'Zaproś członków',
      description: 'Rozszerz swoją społeczność',
      href: '/community/invite',
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    },
    {
      icon: Calendar,
      label: 'Zaplanuj wydarzenie',
      description: 'Organizuj spotkania i warsztaty',
      href: '/community/events',
      color: 'text-orange-600',
      bgColor: 'bg-orange-100'
    },
    {
      icon: BarChart3,
      label: 'Zobacz statystyki',
      description: 'Analizuj zaangażowanie społeczności',
      href: '/community/analytics',
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-100'
    },
    {
      icon: FileText,
      label: 'Zarządzaj treściami',
      description: 'Moderuj posty i komentarze',
      href: '/community/content',
      color: 'text-red-600',
      bgColor: 'bg-red-100'
    }
  ]

  return (
    <div className="flex-1 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Społeczność</h1>
            <p className="text-gray-600 mt-1">
              Zarządzaj swoją społecznością i twórz wartościowe treści
            </p>
          </div>
          
          {/* Actions Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowActionsDropdown(!showActionsDropdown)}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
            >
              <span>Actions</span>
              <ChevronDown className={`h-4 w-4 transition-transform ${showActionsDropdown ? 'rotate-180' : ''}`} />
            </button>

            {showActionsDropdown && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                <div className="py-2">
                  {actionItems.map((item, index) => (
                    <Link
                      key={index}
                      to={item.href}
                      className="flex items-center space-x-3 px-4 py-3 hover:bg-gray-50 transition-colors"
                      onClick={() => setShowActionsDropdown(false)}
                    >
                      <div className={`w-10 h-10 ${item.bgColor} rounded-lg flex items-center justify-center`}>
                        <item.icon className={`h-5 w-5 ${item.color}`} />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{item.label}</h4>
                        <p className="text-sm text-gray-500">{item.description}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Community Overview */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white text-xl font-bold">CZ</span>
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">Co czuję? Community</h2>
              <p className="text-gray-600">Społeczność wspierająca rozwój emocjonalny</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {communityStats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg bg-gray-50 mb-3`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                <div className="text-sm text-gray-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              <button className="py-4 px-1 border-b-2 border-blue-500 text-blue-600 font-medium text-sm">
                Przegląd
              </button>
              <Link
                to="/community/customize"
                className="py-4 px-1 border-b-2 border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 font-medium text-sm transition-colors"
              >
                Customize Community
              </Link>
              <button className="py-4 px-1 border-b-2 border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 font-medium text-sm">
                Członkowie
              </button>
              <button className="py-4 px-1 border-b-2 border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 font-medium text-sm">
                Analityka
              </button>
            </nav>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Activity */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Ostatnia aktywność</h3>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-medium">{activity.avatar}</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-900">
                      <span className="font-medium">{activity.user}</span> {activity.action}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Szybkie akcje</h3>
            <div className="space-y-3">
              {actionItems.slice(0, 4).map((item, index) => (
                <Link
                  key={index}
                  to={item.href}
                  className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className={`w-10 h-10 ${item.bgColor} rounded-lg flex items-center justify-center`}>
                    <item.icon className={`h-5 w-5 ${item.color}`} />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{item.label}</h4>
                    <p className="text-sm text-gray-500">{item.description}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Popular Courses */}
        <div className="mt-8 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Popularne kursy</h3>
            <Link
              to="/community/customize"
              className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center space-x-1"
            >
              <span>Zarządzaj kursami</span>
              <Settings className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: 'Zarządzanie emocjami w pracy',
                students: 234,
                rating: 4.8,
                image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=400'
              },
              {
                title: 'Mindfulness dla początkujących',
                students: 189,
                rating: 4.9,
                image: 'https://images.pexels.com/photos/3822622/pexels-photo-3822622.jpeg?auto=compress&cs=tinysrgb&w=400'
              },
              {
                title: 'Budowanie pewności siebie',
                students: 156,
                rating: 4.7,
                image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400'
              }
            ].map((course, index) => (
              <div key={index} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-32 object-cover"
                />
                <div className="p-4">
                  <h4 className="font-medium text-gray-900 mb-2">{course.title}</h4>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>{course.students} uczestników</span>
                    <span>⭐ {course.rating}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Click outside to close dropdown */}
      {showActionsDropdown && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShowActionsDropdown(false)}
        />
      )}
    </div>
  )
}

export default Community
