import React from 'react'
import { Link } from 'react-router-dom'
import { 
  Puzzle, 
  Check, 
  Settings, 
  ExternalLink,
  Plus,
  Zap,
  Mail,
  MessageCircle,
  BarChart3,
  Shield,
  Database,
  Webhook
} from 'lucide-react'

const Integrations: React.FC = () => {
  const integrations = [
    {
      name: 'Slack',
      description: 'Synchronizuj powiadomienia społeczności ze Slack',
      icon: MessageCircle,
      status: 'connected',
      color: 'bg-purple-100 text-purple-600'
    },
    {
      name: 'Google Analytics',
      description: 'Śledź ruch i zaangażowanie użytkowników',
      icon: BarChart3,
      status: 'connected',
      color: 'bg-orange-100 text-orange-600'
    },
    {
      name: 'Mailchimp',
      description: 'Automatyczne kampanie email dla członków',
      icon: Mail,
      status: 'available',
      color: 'bg-yellow-100 text-yellow-600'
    },
    {
      name: 'Zapier',
      description: 'Automatyzuj przepływy pracy z 3000+ aplikacjami',
      icon: Zap,
      status: 'available',
      color: 'bg-blue-100 text-blue-600'
    },
    {
      name: 'Webhook API',
      description: 'Niestandardowe integracje przez webhooks',
      icon: Webhook,
      status: 'configured',
      color: 'bg-green-100 text-green-600'
    },
    {
      name: 'Single Sign-On',
      description: 'Bezpieczne logowanie przez SSO',
      icon: Shield,
      status: 'available',
      color: 'bg-red-100 text-red-600'
    }
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'connected':
        return (
          <span className="inline-flex items-center space-x-1 bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
            <Check className="w-3 h-3" />
            <span>Połączono</span>
          </span>
        )
      case 'configured':
        return (
          <span className="inline-flex items-center space-x-1 bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
            <Settings className="w-3 h-3" />
            <span>Skonfigurowano</span>
          </span>
        )
      default:
        return (
          <span className="inline-flex items-center space-x-1 bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full">
            <Plus className="w-3 h-3" />
            <span>Dostępne</span>
          </span>
        )
    }
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Integracje</h1>
          <p className="text-gray-600">Połącz swoją społeczność z ulubionymi narzędziami</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
            Dokumentacja API
          </button>
          <Link 
            to="/backend/dashboard"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Powrót do Dashboard
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <Check className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">3</div>
              <div className="text-sm text-gray-500">Aktywne Integracje</div>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Puzzle className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">6</div>
              <div className="text-sm text-gray-500">Dostępne Integracje</div>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Database className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">1,247</div>
              <div className="text-sm text-gray-500">Synchronizacje Dzisiaj</div>
            </div>
          </div>
        </div>
      </div>

      {/* Integrations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {integrations.map((integration, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className={`p-3 rounded-lg ${integration.color}`}>
                <integration.icon className="w-6 h-6" />
              </div>
              {getStatusBadge(integration.status)}
            </div>
            
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{integration.name}</h3>
            <p className="text-sm text-gray-600 mb-4">{integration.description}</p>
            
            <div className="flex items-center space-x-2">
              {integration.status === 'connected' ? (
                <>
                  <button className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors text-sm">
                    Konfiguruj
                  </button>
                  <button className="p-2 text-gray-400 hover:text-gray-600">
                    <ExternalLink className="w-4 h-4" />
                  </button>
                </>
              ) : integration.status === 'configured' ? (
                <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors text-sm">
                  Zarządzaj
                </button>
              ) : (
                <button className="w-full border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                  Połącz
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* API Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">API & Webhooks</h3>
            <p className="text-sm text-gray-600">Twórz niestandardowe integracje</p>
          </div>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            Generuj Klucz API
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border border-gray-200 rounded-lg p-4">
            <h4 className="font-medium text-gray-900 mb-2">REST API</h4>
            <p className="text-sm text-gray-600 mb-3">Pełny dostęp do danych społeczności</p>
            <div className="flex items-center space-x-2">
              <code className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-xs">
                https://api.aitribes.com/v1/
              </code>
              <button className="text-blue-600 hover:text-blue-700">
                <ExternalLink className="w-4 h-4" />
              </button>
            </div>
          </div>
          
          <div className="border border-gray-200 rounded-lg p-4">
            <h4 className="font-medium text-gray-900 mb-2">Webhooks</h4>
            <p className="text-sm text-gray-600 mb-3">Otrzymuj powiadomienia o wydarzeniach</p>
            <div className="flex items-center space-x-2">
              <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                3 aktywne
              </span>
              <button className="text-blue-600 hover:text-blue-700 text-sm">
                Konfiguruj
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Integrations
