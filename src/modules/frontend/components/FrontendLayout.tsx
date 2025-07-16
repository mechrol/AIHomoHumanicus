import React from 'react'
import { Link } from 'react-router-dom'
import { 
  Home, 
  Users, 
  MessageSquare, 
  Calendar,
  BookOpen,
  Award,
  TrendingUp,
  Settings,
  ArrowLeft
} from 'lucide-react'

interface FrontendLayoutProps {
  children: React.ReactNode
}

const FrontendLayout: React.FC<FrontendLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Bar */}
      <div className="bg-white border-b border-gray-200 px-6 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link 
              to="/backend/dashboard"
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm">Powrót do Dashboard</span>
            </Link>
          </div>
          
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">HSB</span>
            </div>
            <span className="font-semibold text-gray-900">Higher School of Banking</span>
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-white border-r border-gray-200 min-h-screen">
          <div className="p-6">
            <div className="space-y-1">
              <div className="flex items-center space-x-3 p-3 rounded-lg bg-blue-50 text-blue-700">
                <Home className="w-5 h-5" />
                <span className="font-medium">Feed</span>
              </div>
              
              <div className="flex items-center space-x-3 p-3 rounded-lg text-gray-600 hover:bg-gray-50">
                <Users className="w-5 h-5" />
                <span>Members</span>
              </div>
              
              <div className="flex items-center space-x-3 p-3 rounded-lg text-gray-600 hover:bg-gray-50">
                <MessageSquare className="w-5 h-5" />
                <span>Blogs</span>
              </div>
              
              <div className="flex items-center space-x-3 p-3 rounded-lg text-gray-600 hover:bg-gray-50">
                <Calendar className="w-5 h-5" />
                <span>Events</span>
              </div>
              
              <div className="flex items-center space-x-3 p-3 rounded-lg text-gray-600 hover:bg-gray-50">
                <BookOpen className="w-5 h-5" />
                <span>Courses / Products</span>
              </div>
              
              <div className="flex items-center space-x-3 p-3 rounded-lg text-gray-600 hover:bg-gray-50">
                <Award className="w-5 h-5" />
                <span>Leaderboard</span>
              </div>
              
              <div className="flex items-center space-x-3 p-3 rounded-lg text-gray-600 hover:bg-gray-50">
                <TrendingUp className="w-5 h-5" />
                <span>Rewards</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {children}
        </div>
      </div>
    </div>
  )
}

export default FrontendLayout
