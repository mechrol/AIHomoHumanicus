import React from 'react'
import { Link } from 'react-router-dom'
import { 
  Users, 
  MessageSquare, 
  BookOpen, 
  Award,
  TrendingUp,
  Calendar,
  Heart,
  Share2,
  MoreHorizontal,
  ExternalLink
} from 'lucide-react'

const Dashboard: React.FC = () => {
  return (
    <div className="p-6 space-y-6">
      {/* Hero Section with Coins */}
      <div className="bg-gradient-to-r from-pink-100 to-purple-100 rounded-xl p-8 relative overflow-hidden">
        <div className="absolute right-8 top-4">
          <img 
            src="https://images.pexels.com/photos/730547/pexels-photo-730547.jpeg?auto=compress&cs=tinysrgb&w=800" 
            alt="Coins stack"
            className="w-32 h-20 object-cover rounded-lg"
          />
        </div>
        <div className="max-w-2xl">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Subscription Services</h1>
          <p className="text-gray-600">Zarządzaj swoimi usługami subskrypcyjnymi i śledź postępy społeczności</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Community Card */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">HSB</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Higher School of Banking</h3>
                <p className="text-sm text-gray-500">Twój hub dla mentoringu i rozwoju</p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">4</div>
                <div className="text-xs text-gray-500">POSTS</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">1</div>
                <div className="text-xs text-gray-500">MEMBERS</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">1</div>
                <div className="text-xs text-gray-500">COURSE</div>
              </div>
            </div>

            <div className="space-y-3 mb-6">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Heart className="w-4 h-4" />
                <span>Feed</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Users className="w-4 h-4" />
                <span>Members</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <MessageSquare className="w-4 h-4" />
                <span>Blogs</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Calendar className="w-4 h-4" />
                <span>Events</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <BookOpen className="w-4 h-4" />
                <span>Courses / Products</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Award className="w-4 h-4" />
                <span>Leaderboard</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <TrendingUp className="w-4 h-4" />
                <span>Rewards</span>
              </div>
            </div>

            <Link 
              to="/frontend/community"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
            >
              <span>Przejdź do społeczności</span>
              <ExternalLink className="w-4 h-4" />
            </Link>
          </div>

          {/* Timeline */}
          <div className="mt-6 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Timeline</h3>
            <div className="text-sm text-gray-500 mb-4">Latest activities</div>
            
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                </div>
                <div>
                  <p className="text-sm text-gray-900">Janusz added a new post</p>
                  <p className="text-xs text-gray-500">Apr 3, 2023</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                </div>
                <div>
                  <p className="text-sm text-gray-900">Janusz added a new post</p>
                  <p className="text-xs text-gray-500">Mar 22, 2023</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                </div>
                <div>
                  <p className="text-sm text-gray-900">Janusz joined Higher School of Banking</p>
                  <p className="text-xs text-gray-500">Mar 20, 2023</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Middle Column - Main Feed */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            {/* Post Input */}
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                <span className="text-sm font-medium text-gray-600">J</span>
              </div>
              <div className="flex-1">
                <input 
                  type="text" 
                  placeholder="What are you thinking about? Janusz"
                  className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Post Actions */}
            <div className="flex items-center space-x-4 mb-6 pb-4 border-b border-gray-100">
              <button className="flex items-center space-x-2 text-gray-600 hover:text-blue-600">
                <MessageSquare className="w-4 h-4" />
                <span className="text-sm">Text</span>
              </button>
              <button className="flex items-center space-x-2 text-gray-600 hover:text-blue-600">
                <Share2 className="w-4 h-4" />
                <span className="text-sm">Photo</span>
              </button>
              <button className="flex items-center space-x-2 text-gray-600 hover:text-blue-600">
                <Calendar className="w-4 h-4" />
                <span className="text-sm">Audio</span>
              </button>
              <button className="flex items-center space-x-2 text-gray-600 hover:text-blue-600">
                <BookOpen className="w-4 h-4" />
                <span className="text-sm">Video</span>
              </button>
              <button className="flex items-center space-x-2 text-gray-600 hover:text-blue-600">
                <TrendingUp className="w-4 h-4" />
                <span className="text-sm">Poll</span>
              </button>
            </div>

            {/* Sample Post */}
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-medium text-gray-600">J</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="font-medium text-gray-900">Janusz</span>
                    <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">Admin</span>
                    <span className="text-xs text-gray-500">2 dni temu</span>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-4 mb-4">
                    <p className="text-sm text-gray-700 mb-3">
                      Demo password for logging into the Game : Decision Tree is - admin369
                    </p>
                    <p className="text-sm text-gray-700 mb-3">
                      Do not share this password with anyone. You can promote the link to the game and 
                      to this community available on the right side of the menu, this so-called Referral Link
                    </p>
                    <p className="text-sm text-gray-700">
                      Hasło demo do logowania do Gry : Drzewo decyzyjne to - admin369
                    </p>
                  </div>

                  {/* Game Banner */}
                  <div className="bg-gradient-to-r from-purple-600 to-purple-800 rounded-lg p-6 text-white mb-4">
                    <div className="text-center">
                      <div className="text-sm mb-2">Homo Humanicus</div>
                      <div className="text-sm mb-2">HomoHumanicus</div>
                      <div className="text-lg font-bold mb-2">🏆 DRZEWO DECYZYJNE</div>
                      <div className="text-xs">⚡ STRATEGIC GAME</div>
                      <div className="text-xs mt-2">
                        Innowacyjna gra strategiczna stworzona przez mediów biznesowych wykorzystujących najnowocześniejsze 
                        rozwiązania w zakresie sztucznych inteligencji biznesowych i edukacyjnych
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <button className="flex items-center space-x-1 hover:text-blue-600">
                      <MessageSquare className="w-4 h-4" />
                      <span>0 Comments</span>
                    </button>
                    <button className="flex items-center space-x-1 hover:text-red-600">
                      <Heart className="w-4 h-4" />
                      <span>Likes</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Points System */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900">My Points</h3>
              <span className="bg-pink-100 text-pink-800 text-sm px-2 py-1 rounded">5</span>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Make a post to get</span>
                <div className="flex items-center space-x-2">
                  <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">1</span>
                  <span className="text-xs text-gray-500">Points</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Comment on a post to get</span>
                <div className="flex items-center space-x-2">
                  <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">1</span>
                  <span className="text-xs text-gray-500">Points</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Like a comment or post to get</span>
                <div className="flex items-center space-x-2">
                  <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">1</span>
                  <span className="text-xs text-gray-500">Points</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Upload Profile picture to get</span>
                <div className="flex items-center space-x-2">
                  <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">1</span>
                  <span className="text-xs text-gray-500">Points</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Must complete a lesson to get</span>
                <div className="flex items-center space-x-2">
                  <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">5</span>
                  <span className="text-xs text-gray-500">Points</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Viral share of referral link</span>
                <div className="flex items-center space-x-2">
                  <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">10</span>
                  <span className="text-xs text-gray-500">Points</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-gray-100">
              <h4 className="font-medium text-gray-900 mb-3">Referral Link</h4>
              <div className="flex space-x-2">
                <input 
                  type="text" 
                  value="https://be-smart.app/hso-hsob"
                  readOnly
                  className="flex-1 p-2 text-sm border border-gray-200 rounded bg-gray-50"
                />
                <button className="bg-pink-600 text-white px-4 py-2 rounded text-sm hover:bg-pink-700">
                  Copy
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Earn 10 points for every new sign-up to the community through your referral link
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
