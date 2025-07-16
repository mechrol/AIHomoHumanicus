import React from 'react'
import { Link } from 'react-router-dom'
import { 
  TrendingUp, 
  Users, 
  MessageSquare, 
  Eye,
  ArrowUpRight,
  ArrowDownRight,
  BarChart3,
  PieChart,
  Activity,
  Calendar
} from 'lucide-react'

const Analytics: React.FC = () => {
  const stats = [
    {
      title: 'Aktywni Użytkownicy',
      value: '2,847',
      change: '+12.5%',
      trend: 'up',
      icon: Users,
      color: 'text-blue-600'
    },
    {
      title: 'Posty Dzisiaj',
      value: '156',
      change: '+8.2%',
      trend: 'up',
      icon: MessageSquare,
      color: 'text-green-600'
    },
    {
      title: 'Wyświetlenia',
      value: '45,231',
      change: '-2.1%',
      trend: 'down',
      icon: Eye,
      color: 'text-purple-600'
    },
    {
      title: 'Zaangażowanie',
      value: '68.4%',
      change: '+5.7%',
      trend: 'up',
      icon: TrendingUp,
      color: 'text-orange-600'
    }
  ]

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h1>
          <p className="text-gray-600">Monitoruj wydajność swojej społeczności</p>
        </div>
        <div className="flex items-center space-x-3">
          <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm">
            <option>Ostatnie 7 dni</option>
            <option>Ostatnie 30 dni</option>
            <option>Ostatnie 90 dni</option>
          </select>
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
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div className={`p-2 rounded-lg ${stat.color.replace('text-', 'bg-').replace('-600', '-100')}`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              <div className={`flex items-center space-x-1 text-sm ${
                stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
              }`}>
                {stat.trend === 'up' ? (
                  <ArrowUpRight className="w-4 h-4" />
                ) : (
                  <ArrowDownRight className="w-4 h-4" />
                )}
                <span>{stat.change}</span>
              </div>
            </div>
            <div className="mt-4">
              <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
              <div className="text-sm text-gray-500">{stat.title}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Activity Chart */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Aktywność Użytkowników</h3>
            <BarChart3 className="w-5 h-5 text-gray-400" />
          </div>
          <div className="h-64 flex items-end justify-between space-x-2">
            {[65, 45, 78, 52, 89, 67, 43, 76, 54, 82, 38, 91, 67, 45].map((height, index) => (
              <div
                key={index}
                className="bg-blue-500 rounded-t flex-1"
                style={{ height: `${height}%` }}
              ></div>
            ))}
          </div>
          <div className="flex justify-between text-xs text-gray-500 mt-2">
            <span>Pon</span>
            <span>Wt</span>
            <span>Śr</span>
            <span>Czw</span>
            <span>Pt</span>
            <span>Sob</span>
            <span>Nd</span>
          </div>
        </div>

        {/* Community Growth */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Wzrost Społeczności</h3>
            <Activity className="w-5 h-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Nowi członkowie</span>
              <span className="text-sm font-medium text-gray-900">+47 w tym tygodniu</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-green-500 h-2 rounded-full" style={{ width: '68%' }}></div>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Aktywni użytkownicy</span>
              <span className="text-sm font-medium text-gray-900">2,847 dzisiaj</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-blue-500 h-2 rounded-full" style={{ width: '84%' }}></div>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Zaangażowanie</span>
              <span className="text-sm font-medium text-gray-900">68.4% średnio</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-purple-500 h-2 rounded-full" style={{ width: '68%' }}></div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Ostatnia Aktywność</h3>
          <Calendar className="w-5 h-5 text-gray-400" />
        </div>
        <div className="space-y-4">
          {[
            { user: 'Anna Kowalska', action: 'dodała nowy post', time: '5 min temu', type: 'post' },
            { user: 'Piotr Nowak', action: 'skomentował post', time: '12 min temu', type: 'comment' },
            { user: 'Maria Wiśniewska', action: 'dołączyła do społeczności', time: '1 godz. temu', type: 'join' },
            { user: 'Tomasz Zieliński', action: 'ukończył kurs', time: '2 godz. temu', type: 'course' },
            { user: 'Katarzyna Lewandowska', action: 'polubiła post', time: '3 godz. temu', type: 'like' }
          ].map((activity, index) => (
            <div key={index} className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                activity.type === 'post' ? 'bg-blue-100 text-blue-600' :
                activity.type === 'comment' ? 'bg-green-100 text-green-600' :
                activity.type === 'join' ? 'bg-purple-100 text-purple-600' :
                activity.type === 'course' ? 'bg-orange-100 text-orange-600' :
                'bg-pink-100 text-pink-600'
              }`}>
                {activity.type === 'post' && <MessageSquare className="w-4 h-4" />}
                {activity.type === 'comment' && <MessageSquare className="w-4 h-4" />}
                {activity.type === 'join' && <Users className="w-4 h-4" />}
                {activity.type === 'course' && <BarChart3 className="w-4 h-4" />}
                {activity.type === 'like' && <TrendingUp className="w-4 h-4" />}
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-900">
                  <span className="font-medium">{activity.user}</span> {activity.action}
                </p>
                <p className="text-xs text-gray-500">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Analytics
