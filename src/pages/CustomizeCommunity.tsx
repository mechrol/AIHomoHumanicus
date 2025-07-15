import React, { useState } from 'react'
import { ArrowLeft, Settings, ExternalLink, Plus, Search, Edit, Copy, Play, MoreVertical, Eye, Users } from 'lucide-react'
import { Link } from 'react-router-dom'

interface Course {
  id: string
  title: string
  price: number
  lessons: number
  thumbnail: string
}

interface Lesson {
  id: string
  title: string
  description: string
  type: 'Video' | 'Text' | 'Quiz'
  status: 'published' | 'draft'
  createdAt: string
}

const CustomizeCommunity: React.FC = () => {
  const [activeTab, setActiveTab] = useState('courses')
  const [searchTerm, setSearchTerm] = useState('')

  const tabs = [
    { id: 'courses', label: 'Courses', count: 1 },
    { id: 'products', label: 'Products', count: 0 },
    { id: 'members', label: 'Members', count: 1 },
    { id: 'groups', label: 'Groups', count: 1 },
    { id: 'events', label: 'Events', count: 0 },
    { id: 'blog', label: 'Blog', count: 0 },
    { id: 'sales', label: 'Sales', count: 0 },
  ]

  const courses: Course[] = [
    {
      id: '1',
      title: 'Self Help Video Course...',
      price: 10,
      lessons: 25,
      thumbnail: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=400'
    }
  ]

  const lessons: Lesson[] = [
    {
      id: '1',
      title: 'The Focus Crisis - Why You\'re Distracted...',
      description: '"The Focus Crisis - Why You\'re Distracted All the Time" delves into the root causes of mod...',
      type: 'Video',
      status: 'published',
      createdAt: '9 Jul, 2025'
    },
    {
      id: '2',
      title: 'Energy Over Everything...How to Build Dai...',
      description: '"Energy Over Everything: How to Build Daily Drive" explores the fundamental role of energy...',
      type: 'Video',
      status: 'published',
      createdAt: '9 Jul, 2025'
    }
  ]

  return (
    <div className="flex-1 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link to="/community" className="flex items-center text-blue-600 hover:text-blue-700 transition-colors">
              <ArrowLeft className="h-5 w-5 mr-2" />
              <span className="font-medium">Powrót do społeczności</span>
            </Link>
          </div>
          <div className="flex items-center space-x-3">
            <button className="flex items-center space-x-2 px-4 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors">
              <ExternalLink className="h-4 w-4" />
              <span>Odwiedź</span>
            </button>
            <button className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-700 transition-colors">
              <Settings className="h-4 w-4" />
              <span>Ustawienia</span>
            </button>
          </div>
        </div>
      </div>

      <div className="px-6 py-6">
        {/* Community Header */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
          <div className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white text-2xl font-bold">CZ</span>
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-blue-600 mb-1">Co czuję? Community</h1>
                  <p className="text-gray-600">Społeczność wspierająca rozwój emocjonalny</p>
                  <p className="text-sm text-gray-500 mt-1">Zarządzanie społecznością i kursami</p>
                </div>
              </div>
              <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                <img 
                  src="https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100" 
                  alt="User" 
                  className="w-10 h-10 rounded-full object-cover"
                />
              </div>
            </div>

            {/* Stats */}
            <div className="flex items-center space-x-8 mt-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">1</div>
                <div className="text-sm text-gray-500 flex items-center justify-center">
                  <Copy className="h-4 w-4 mr-1" />
                  Kursy
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">1,234</div>
                <div className="text-sm text-gray-500 flex items-center justify-center">
                  <Users className="h-4 w-4 mr-1" />
                  Członkowie
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">8</div>
                <div className="text-sm text-gray-500 flex items-center justify-center">
                  <Users className="h-4 w-4 mr-1" />
                  Grupy
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">456</div>
                <div className="text-sm text-gray-500 flex items-center justify-center">
                  <Copy className="h-4 w-4 mr-1" />
                  Dyskusje
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Breadcrumb */}
        <div className="mb-6">
          <nav className="flex items-center space-x-2 text-sm text-gray-500">
            <Link to="/community" className="hover:text-blue-600 transition-colors">Społeczność</Link>
            <span>/</span>
            <span className="text-gray-900 font-medium">Dostosuj społeczność</span>
          </nav>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <span className="flex items-center space-x-2">
                    <span>{tab.label}</span>
                    {tab.count > 0 && (
                      <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs">
                        {tab.count}
                      </span>
                    )}
                  </span>
                </button>
              ))}
            </nav>
          </div>

          {/* Content */}
          <div className="p-6">
            {activeTab === 'courses' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Courses Section */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold flex items-center">
                      Kursy
                      <span className="ml-2 bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                        1
                      </span>
                    </h3>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2 transition-colors">
                      <Plus className="h-4 w-4" />
                      <span>Stwórz kurs</span>
                    </button>
                  </div>

                  <div className="mb-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <input
                        type="text"
                        placeholder="Szukaj po nazwie kursu..."
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    {courses.map((course) => (
                      <div key={course.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="flex items-center space-x-4">
                          <div className="w-16 h-16 bg-purple-100 rounded-lg flex items-center justify-center">
                            <img 
                              src={course.thumbnail} 
                              alt={course.title}
                              className="w-14 h-14 rounded-lg object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-900">{course.title}</h4>
                            <p className="text-sm text-red-600 font-medium">Płatny - ${course.price}</p>
                            <p className="text-sm text-gray-500">{course.lessons} lekcji</p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors" title="Edytuj">
                              <Edit className="h-4 w-4" />
                            </button>
                            <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors" title="Kopiuj">
                              <Copy className="h-4 w-4" />
                            </button>
                            <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors" title="Podgląd">
                              <Eye className="h-4 w-4" />
                            </button>
                            <button className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition-colors" title="Odtwórz">
                              <Play className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Lessons Section */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold flex items-center">
                      Lekcje
                      <span className="ml-2 bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                        25
                      </span>
                    </h3>
                    <div className="flex items-center space-x-2">
                      <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2 transition-colors">
                        <Plus className="h-4 w-4" />
                        <span>Stwórz lekcję</span>
                      </button>
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-sm text-gray-600">Kurs samopomocy wideo</p>
                  </div>

                  <div className="mb-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <input
                        type="text"
                        placeholder="Szukaj po nazwie lekcji..."
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  {/* Lessons Table */}
                  <div className="overflow-hidden">
                    <table className="w-full">
                      <thead>
                        <tr className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          <th className="pb-3">Nazwa lekcji</th>
                          <th className="pb-3">Typ</th>
                          <th className="pb-3">Status</th>
                          <th className="pb-3">Utworzono</th>
                          <th className="pb-3">Akcje</th>
                        </tr>
                      </thead>
                      <tbody className="space-y-4">
                        {lessons.map((lesson, index) => (
                          <tr key={lesson.id} className={index > 0 ? 'border-t border-gray-100 pt-4' : ''}>
                            <td className="py-3">
                              <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                                  <Play className="h-5 w-5 text-purple-600" />
                                </div>
                                <div>
                                  <h4 className="font-medium text-gray-900 text-sm">{lesson.title}</h4>
                                  <p className="text-xs text-gray-500 mt-1">{lesson.description}</p>
                                </div>
                              </div>
                            </td>
                            <td className="py-3">
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                {lesson.type}
                              </span>
                            </td>
                            <td className="py-3">
                              <div className="flex items-center">
                                <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                                <span className="text-sm text-gray-900 capitalize">{lesson.status === 'published' ? 'Opublikowana' : 'Szkic'}</span>
                              </div>
                            </td>
                            <td className="py-3">
                              <span className="text-sm text-gray-500">{lesson.createdAt}</span>
                            </td>
                            <td className="py-3">
                              <button className="text-gray-400 hover:text-gray-600 transition-colors">
                                <MoreVertical className="h-4 w-4" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {activeTab !== 'courses' && (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">📋</span>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  {tabs.find(tab => tab.id === activeTab)?.label} - Wkrótce
                </h3>
                <p className="text-gray-500">
                  Ta sekcja będzie dostępna w kolejnej fazie rozwoju.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CustomizeCommunity
