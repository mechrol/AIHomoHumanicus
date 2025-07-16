import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { 
  Home, 
  Settings, 
  BarChart3, 
  Puzzle, 
  ShoppingCart,
  User,
  Bell,
  Search,
  ChevronDown,
  Upload,
  Play,
  BookOpen,
  CreditCard,
  Globe,
  Users,
  LogOut,
  ChevronRight
} from 'lucide-react'

interface BackendLayoutProps {
  children: React.ReactNode
}

const BackendLayout: React.FC<BackendLayoutProps> = ({ children }) => {
  const location = useLocation()
  const [resellerDropdownOpen, setResellerDropdownOpen] = useState(false)
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false)
  const [languageDropdownOpen, setLanguageDropdownOpen] = useState(false)
  const [selectedLanguage, setSelectedLanguage] = useState('Polish')

  const navigationItems = [
    { 
      name: 'Dashboard', 
      href: '/backend/dashboard', 
      icon: Home, 
      active: location.pathname === '/backend/dashboard',
      color: 'text-blue-600'
    },
    { 
      name: 'Community', 
      href: '/frontend/community', 
      icon: Settings,
      active: location.pathname.startsWith('/frontend/community'),
      color: 'text-gray-600'
    },
    { 
      name: 'Reseller', 
      href: '/backend/reseller', 
      icon: ShoppingCart,
      active: location.pathname === '/backend/reseller',
      color: 'text-gray-600',
      hasDropdown: true
    },
    { 
      name: 'Analytics', 
      href: '/backend/analytics', 
      icon: BarChart3,
      active: location.pathname === '/backend/analytics',
      color: 'text-purple-600'
    },
    { 
      name: 'Integrations', 
      href: '/backend/integrations', 
      icon: Puzzle,
      active: location.pathname === '/backend/integrations',
      color: 'text-gray-600'
    },
  ]

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Español' },
    { code: 'fr', name: 'Français' },
    { code: 'de', name: 'Deutsch' },
    { code: 'it', name: 'Italiano' },
    { code: 'pt', name: 'Português' },
    { code: 'id', name: 'Indonesian' },
    { code: 'da', name: 'Dansk' },
    { code: 'pl', name: 'Polish' }
  ]

  const getBreadcrumbTitle = () => {
    switch (location.pathname) {
      case '/backend/dashboard':
        return 'Dashboard'
      case '/backend/analytics':
        return 'Analytics'
      case '/backend/integrations':
        return 'Integrations'
      case '/backend/reseller':
        return 'Reseller'
      default:
        return 'Dashboard'
    }
  }

  const handleLanguageSelect = (language: string) => {
    setSelectedLanguage(language)
    setLanguageDropdownOpen(false)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <nav className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-8">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">AI</span>
              </div>
              <span className="font-semibold text-gray-900">AITribes</span>
              <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">ENTERPRISE</span>
            </div>

            {/* Navigation Items */}
            <div className="flex items-center space-x-6">
              {navigationItems.map((item) => (
                <div key={item.name} className="relative">
                  {item.hasDropdown ? (
                    <div className="relative">
                      <button
                        onClick={() => setResellerDropdownOpen(!resellerDropdownOpen)}
                        className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                          item.active
                            ? `${item.color} bg-blue-50`
                            : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                        }`}
                      >
                        <item.icon className="w-4 h-4" />
                        <span>{item.name}</span>
                        <ChevronDown className="w-3 h-3" />
                      </button>
                      
                      {resellerDropdownOpen && (
                        <div className="absolute top-full left-0 mt-1 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-50">
                          <Link
                            to="/backend/reseller"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                            onClick={() => setResellerDropdownOpen(false)}
                          >
                            Zarządzanie Resellerami
                          </Link>
                          <Link
                            to="/backend/reseller/commissions"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                            onClick={() => setResellerDropdownOpen(false)}
                          >
                            Prowizje
                          </Link>
                          <Link
                            to="/backend/reseller/reports"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                            onClick={() => setResellerDropdownOpen(false)}
                          >
                            Raporty Sprzedaży
                          </Link>
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link
                      to={item.href}
                      className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                        item.active
                          ? `${item.color} bg-blue-50`
                          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                      }`}
                    >
                      <item.icon className="w-4 h-4" />
                      <span>{item.name}</span>
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Right side */}
          <div className="flex items-center space-x-4">
            <button className="p-2 text-gray-400 hover:text-gray-600">
              <Search className="w-5 h-5" />
            </button>
            <button className="p-2 text-gray-400 hover:text-gray-600 relative">
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
            </button>
            
            {/* Admin Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                className="flex items-center space-x-2 p-1 rounded-full hover:bg-gray-50 transition-colors"
              >
                <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center overflow-hidden">
                  <img 
                    src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&dpr=1" 
                    alt="Janusz Krawczak" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <ChevronDown className="w-4 h-4 text-gray-500" />
              </button>

              {profileDropdownOpen && (
                <div className="absolute top-full right-0 mt-2 w-80 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                  {/* Profile Header */}
                  <div className="p-4 border-b border-gray-100">
                    <div className="flex items-center space-x-3">
                      <div className="relative">
                        <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center overflow-hidden">
                          <img 
                            src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=48&h=48&dpr=1" 
                            alt="Janusz Krawczak" 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <button className="absolute -bottom-1 -right-1 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors">
                          <Upload className="w-3 h-3 text-white" />
                        </button>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">Janusz Krawczak</h3>
                        <p className="text-sm text-gray-500">januszjankra@gmail.com</p>
                      </div>
                    </div>
                  </div>

                  {/* Credits Section */}
                  <div className="p-4 border-b border-gray-100">
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-700">Free Credits</span>
                        <span className="text-sm font-bold text-blue-600">735/1000</span>
                      </div>
                      <div className="mt-2 w-full bg-blue-100 rounded-full h-2">
                        <div className="bg-blue-600 h-2 rounded-full" style={{ width: '73.5%' }}></div>
                      </div>
                    </div>
                  </div>

                  {/* Menu Items */}
                  <div className="py-2">
                    <button className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                      <User className="w-4 h-4" />
                      <span>Profile</span>
                    </button>
                    
                    <button className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                      <Play className="w-4 h-4" />
                      <span>Video tutorials</span>
                    </button>
                    
                    <button className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                      <BookOpen className="w-4 h-4" />
                      <span>Knowledgebase</span>
                    </button>
                    
                    <button className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                      <CreditCard className="w-4 h-4" />
                      <span>Template Club</span>
                    </button>
                    
                    <button className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                      <Globe className="w-4 h-4" />
                      <span>Agency Website</span>
                    </button>
                    
                    <button className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                      <Users className="w-4 h-4" />
                      <span>DFY Tribe</span>
                    </button>

                    {/* Language Submenu */}
                    <div className="relative">
                      <button
                        onClick={() => setLanguageDropdownOpen(!languageDropdownOpen)}
                        className="w-full flex items-center justify-between px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex items-center space-x-3">
                          <Globe className="w-4 h-4" />
                          <span>Language</span>
                        </div>
                        <ChevronRight className="w-4 h-4" />
                      </button>
                      
                      {languageDropdownOpen && (
                        <div className="absolute left-full top-0 ml-1 w-40 bg-white border border-gray-200 rounded-lg shadow-lg z-60">
                          {languages.map((language) => (
                            <button
                              key={language.code}
                              onClick={() => handleLanguageSelect(language.name)}
                              className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition-colors ${
                                selectedLanguage === language.name ? 'bg-blue-50 text-blue-600' : 'text-gray-700'
                              }`}
                            >
                              {language.name}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Sign Out */}
                  <div className="border-t border-gray-100 py-2">
                    <button className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors">
                      <LogOut className="w-4 h-4" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200 px-6 py-3">
        <div className="flex items-center space-x-2 text-sm">
          <Home className="w-4 h-4 text-gray-400" />
          <span className="text-gray-900 font-medium">{getBreadcrumbTitle()}</span>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Click outside handlers */}
      {(profileDropdownOpen || resellerDropdownOpen || languageDropdownOpen) && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => {
            setProfileDropdownOpen(false)
            setResellerDropdownOpen(false)
            setLanguageDropdownOpen(false)
          }}
        />
      )}
    </div>
  )
}

export default BackendLayout
