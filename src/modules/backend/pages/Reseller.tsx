import React from 'react'
import { Link } from 'react-router-dom'
import { 
  ShoppingCart, 
  Users, 
  DollarSign, 
  TrendingUp,
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  Star,
  Award,
  Target
} from 'lucide-react'

const Reseller: React.FC = () => {
  const resellerStats = [
    {
      title: 'Aktywni Resellerzy',
      value: '24',
      change: '+3 w tym miesiącu',
      icon: Users,
      color: 'bg-blue-100 text-blue-600'
    },
    {
      title: 'Całkowita Sprzedaż',
      value: '€12,847',
      change: '+18.2% vs poprzedni miesiąc',
      icon: DollarSign,
      color: 'bg-green-100 text-green-600'
    },
    {
      title: 'Średnia Prowizja',
      value: '15.5%',
      change: 'Standardowa stawka',
      icon: TrendingUp,
      color: 'bg-purple-100 text-purple-600'
    },
    {
      title: 'Nowe Aplikacje',
      value: '7',
      change: 'Oczekuje na zatwierdzenie',
      icon: Target,
      color: 'bg-orange-100 text-orange-600'
    }
  ]

  const topResellers = [
    {
      name: 'Anna Kowalska',
      email: 'anna.kowalska@example.com',
      sales: '€3,247',
      commission: '€487',
      rating: 4.9,
      status: 'active'
    },
    {
      name: 'Piotr Nowak',
      email: 'piotr.nowak@example.com',
      sales: '€2,891',
      commission: '€434',
      rating: 4.8,
      status: 'active'
    },
    {
      name: 'Maria Wiśniewska',
      email: 'maria.wisniewska@example.com',
      sales: '€2,156',
      commission: '€323',
      rating: 4.7,
      status: 'active'
    },
    {
      name: 'Tomasz Zieliński',
      email: 'tomasz.zielinski@example.com',
      sales: '€1,789',
      commission: '€268',
      rating: 4.6,
      status: 'pending'
    }
  ]

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Program Resellerski</h1>
          <p className="text-gray-600">Zarządzaj partnerami sprzedażowymi i prowizjami</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-2">
            <Plus className="w-4 h-4" />
            <span>Dodaj Resellera</span>
          </button>
          <Link 
            to="/backend/dashboard"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Powrót do Dashboard
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {resellerStats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-2 rounded-lg ${stat.color}`}>
                <stat.icon className="w-6 h-6" />
              </div>
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
            <div className="text-sm text-gray-500 mb-2">{stat.title}</div>
            <div className="text-xs text-gray-400">{stat.change}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Top Resellers */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Najlepsi Resellerzy</h3>
            <div className="flex items-center space-x-2">
              <button className="p-2 text-gray-400 hover:text-gray-600">
                <Search className="w-4 h-4" />
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-600">
                <Filter className="w-4 h-4" />
              </button>
            </div>
          </div>
          
          <div className="space-y-4">
            {topResellers.map((reseller, index) => (
              <div key={index} className="flex items-center justify-between p-4 border border-gray-100 rounded-lg hover:bg-gray-50">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium text-gray-600">
                      {reseller.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">{reseller.name}</div>
                    <div className="text-sm text-gray-500">{reseller.email}</div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-6">
                  <div className="text-right">
                    <div className="text-sm font-medium text-gray-900">{reseller.sales}</div>
                    <div className="text-xs text-gray-500">Sprzedaż</div>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-sm font-medium text-green-600">{reseller.commission}</div>
                    <div className="text-xs text-gray-500">Prowizja</div>
                  </div>
                  
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm text-gray-600">{reseller.rating}</span>
                  </div>
                  
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    reseller.status === 'active' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {reseller.status === 'active' ? 'Aktywny' : 'Oczekuje'}
                  </span>
                  
                  <button className="p-1 text-gray-400 hover:text-gray-600">
                    <MoreHorizontal className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Szybkie Akcje</h3>
            <div className="space-y-3">
              <button className="w-full text-left p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                <div className="flex items-center space-x-3">
                  <Plus className="w-5 h-5 text-blue-600" />
                  <span className="text-sm font-medium">Dodaj Nowego Resellera</span>
                </div>
              </button>
              
              <button className="w-full text-left p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                <div className="flex items-center space-x-3">
                  <DollarSign className="w-5 h-5 text-green-600" />
                  <span className="text-sm font-medium">Przeglądaj Prowizje</span>
                </div>
              </button>
              
              <button className="w-full text-left p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                <div className="flex items-center space-x-3">
                  <Award className="w-5 h-5 text-purple-600" />
                  <span className="text-sm font-medium">Program Nagród</span>
                </div>
              </button>
            </div>
          </div>

          {/* Commission Structure */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Struktura Prowizji</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Podstawowa</span>
                <span className="text-sm font-medium text-gray-900">10%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Silver (€5k+)</span>
                <span className="text-sm font-medium text-gray-900">12%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Gold (€15k+)</span>
                <span className="text-sm font-medium text-gray-900">15%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Platinum (€30k+)</span>
                <span className="text-sm font-medium text-gray-900">20%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Reseller
