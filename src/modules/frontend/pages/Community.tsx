import React, { useState } from 'react'
import { 
  MessageSquare, 
  Heart, 
  Share2, 
  MoreHorizontal,
  Image,
  Video,
  Calendar,
  BarChart3,
  Send,
  Smile
} from 'lucide-react'

const Community: React.FC = () => {
  const [newPost, setNewPost] = useState('')

  const posts = [
    {
      id: 1,
      author: 'Janusz',
      role: 'Admin',
      time: '2 dni temu',
      content: `Demo password for logging into the Game : Decision Tree is - admin369

Do not share this password with anyone. You can promote the link to the game and to this community available on the right side of the menu, this so-called Referral Link

Hasło demo do logowania do Gry : Drzewo decyzyjne to - admin369
Nie udostępniaj tego hasła nikomu. Możesz promować link do gry i do tej społeczności dostępny po prawej stronie menu, tzw Referral Link`,
      hasGameBanner: true,
      likes: 0,
      comments: 0
    }
  ]

  return (
    <div className="max-w-2xl mx-auto p-6">
      {/* Create Post */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
        <div className="flex items-start space-x-3">
          <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-sm font-medium text-gray-600">U</span>
          </div>
          <div className="flex-1">
            <textarea
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
              placeholder="Co myślisz? Podziel się swoimi przemyśleniami..."
              className="w-full p-3 border border-gray-200 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={3}
            />
            
            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center space-x-4">
                <button className="flex items-center space-x-2 text-gray-600 hover:text-blue-600">
                  <Image className="w-4 h-4" />
                  <span className="text-sm">Zdjęcie</span>
                </button>
                <button className="flex items-center space-x-2 text-gray-600 hover:text-blue-600">
                  <Video className="w-4 h-4" />
                  <span className="text-sm">Wideo</span>
                </button>
                <button className="flex items-center space-x-2 text-gray-600 hover:text-blue-600">
                  <Calendar className="w-4 h-4" />
                  <span className="text-sm">Wydarzenie</span>
                </button>
                <button className="flex items-center space-x-2 text-gray-600 hover:text-blue-600">
                  <BarChart3 className="w-4 h-4" />
                  <span className="text-sm">Ankieta</span>
                </button>
              </div>
              
              <button 
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
                disabled={!newPost.trim()}
              >
                <Send className="w-4 h-4" />
                <span>Opublikuj</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Posts Feed */}
      <div className="space-y-6">
        {posts.map((post) => (
          <div key={post.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-start space-x-3">
              <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-sm font-medium text-gray-600">J</span>
              </div>
              
              <div className="flex-1">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <span className="font-medium text-gray-900">{post.author}</span>
                    <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">{post.role}</span>
                    <span className="text-sm text-gray-500">{post.time}</span>
                  </div>
                  <button className="text-gray-400 hover:text-gray-600">
                    <MoreHorizontal className="w-5 h-5" />
                  </button>
                </div>

                <div className="prose prose-sm max-w-none mb-4">
                  <p className="text-gray-700 whitespace-pre-line">{post.content}</p>
                </div>

                {post.hasGameBanner && (
                  <div className="bg-gradient-to-r from-purple-600 to-purple-800 rounded-lg p-6 text-white mb-4">
                    <div className="text-center">
                      <div className="text-sm mb-2">Homo Humanicus</div>
                      <div className="text-sm mb-2">HomoHumanicus</div>
                      <div className="text-xl font-bold mb-2">🏆 DRZEWO DECYZYJNE</div>
                      <div className="text-sm">⚡ STRATEGIC GAME</div>
                      <div className="text-xs mt-3 leading-relaxed">
                        Innowacyjna gra strategiczna stworzona przez mediów biznesowych wykorzystujących najnowocześniejsze 
                        rozwiązania w zakresie sztucznych inteligencji biznesowych i edukacyjnych
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex items-center space-x-6">
                    <button className="flex items-center space-x-2 text-gray-500 hover:text-red-600 transition-colors">
                      <Heart className="w-5 h-5" />
                      <span className="text-sm">{post.likes} Polubień</span>
                    </button>
                    
                    <button className="flex items-center space-x-2 text-gray-500 hover:text-blue-600 transition-colors">
                      <MessageSquare className="w-5 h-5" />
                      <span className="text-sm">{post.comments} Komentarzy</span>
                    </button>
                    
                    <button className="flex items-center space-x-2 text-gray-500 hover:text-green-600 transition-colors">
                      <Share2 className="w-5 h-5" />
                      <span className="text-sm">Udostępnij</span>
                    </button>
                  </div>
                </div>

                {/* Comment Section */}
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-xs font-medium text-gray-600">U</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <input
                          type="text"
                          placeholder="Napisz komentarz..."
                          className="flex-1 p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button className="text-gray-400 hover:text-gray-600">
                          <Smile className="w-5 h-5" />
                        </button>
                        <button className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700">
                          <Send className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Welcome Message */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mt-8">
        <h3 className="font-semibold text-blue-900 mb-2">Witaj w Higher School of Banking!</h3>
        <p className="text-blue-700 text-sm">
          To jest testowa społeczność gdzie możesz dzielić się wiedzą, nawiązywać kontakty i rozwijać swoje umiejętności bankowe. 
          Zapraszamy do aktywnego uczestnictwa w dyskusjach i korzystania z dostępnych zasobów edukacyjnych.
        </p>
      </div>
    </div>
  )
}

export default Community
