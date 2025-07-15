import React, { useState, useEffect } from 'react'
import { Search, Plus, Settings, Users, BookOpen, Calendar, TrendingUp, Eye, Edit, Trash2 } from 'lucide-react'
import { supabase } from '../../lib/supabase'
import { Community } from '../../types/community'

const AdminCommunity: React.FC = () => {
  const [communities, setCommunities] = useState<Community[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [showCreateModal, setShowCreateModal] = useState(false)

  useEffect(() => {
    fetchCommunities()
  }, [])

  const fetchCommunities = async () => {
    try {
      const { data, error } = await supabase
        .from('communities')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setCommunities(data || [])
    } catch (error) {
      console.error('Error fetching communities:', error)
    } finally {
      setLoading(false)
    }
  }

  const filteredCommunities = communities.filter(community =>
    community.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    community.description.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleSearch = () => {
    // Search is handled by the filter above
  }

  const handleCreateCommunity = () => {
    setShowCreateModal(true)
  }

  const handleDeleteCommunity = async (communityId: string) => {
    if (!confirm('Czy na pewno chcesz usunąć tę społeczność?')) return

    try {
      const { error } = await supabase
        .from('communities')
        .delete()
        .eq('id', communityId)

      if (error) throw error
      
      setCommunities(communities.filter(c => c.id !== communityId))
    } catch (error) {
      console.error('Error deleting community:', error)
    }
  }

  const toggleCommunityStatus = async (communityId: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from('communities')
        .update({ is_active: !currentStatus })
        .eq('id', communityId)

      if (error) throw error
      
      setCommunities(communities.map(c => 
        c.id === communityId ? { ...c, is_active: !currentStatus } : c
      ))
    } catch (error) {
      console.error('Error updating community status:', error)
    }
  }

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="flex-1 p-6 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Header with Search and Actions */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex items-center justify-between">
            {/* Community Title with Badge */}
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                <Settings className="h-5 w-5 text-gray-600" />
                <h1 className="text-xl font-semibold text-gray-900">Community</h1>
                <span className="bg-blue-600 text-white px-2 py-1 rounded-full text-sm font-medium">
                  {communities.length}
                </span>
              </div>
            </div>

            {/* Search and Actions */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search by Community Name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-80 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <button
                  onClick={handleSearch}
                  className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Search
                </button>
              </div>
              
              <button
                onClick={handleCreateCommunity}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Plus className="h-4 w-4" />
                <span>New Community</span>
              </button>
            </div>
          </div>
        </div>

        {/* Communities Grid */}
        {filteredCommunities.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCommunities.map((community) => (
              <div key={community.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                {/* Community Banner */}
                <div className="h-32 bg-gradient-to-br from-blue-500 to-purple-600 relative">
                  {community.banner_url ? (
                    <img
                      src={community.banner_url}
                      alt={community.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-white text-2xl font-bold">
                        {community.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                  )}
                  
                  {/* Status Badge */}
                  <div className="absolute top-3 right-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      community.is_active 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {community.is_active ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                </div>

                {/* Community Info */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      {community.avatar_url ? (
                        <img
                          src={community.avatar_url}
                          alt={community.name}
                          className="w-12 h-12 rounded-lg object-cover"
                        />
                      ) : (
                        <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                          <span className="text-gray-600 font-medium">
                            {community.name.charAt(0).toUpperCase()}
                          </span>
                        </div>
                      )}
                      <div>
                        <h3 className="font-semibold text-gray-900">{community.name}</h3>
                        <p className="text-sm text-gray-500">
                          Created {new Date(community.created_at).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>

                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                    {community.description}
                  </p>

                  {/* Community Stats */}
                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div className="text-center">
                      <div className="flex items-center justify-center w-8 h-8 bg-blue-100 rounded-lg mx-auto mb-1">
                        <Users className="h-4 w-4 text-blue-600" />
                      </div>
                      <div className="text-lg font-semibold text-gray-900">{community.member_count}</div>
                      <div className="text-xs text-gray-500">Members</div>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center w-8 h-8 bg-green-100 rounded-lg mx-auto mb-1">
                        <BookOpen className="h-4 w-4 text-green-600" />
                      </div>
                      <div className="text-lg font-semibold text-gray-900">{community.course_count}</div>
                      <div className="text-xs text-gray-500">Courses</div>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center w-8 h-8 bg-purple-100 rounded-lg mx-auto mb-1">
                        <Calendar className="h-4 w-4 text-purple-600" />
                      </div>
                      <div className="text-lg font-semibold text-gray-900">{community.group_count}</div>
                      <div className="text-xs text-gray-500">Groups</div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="flex items-center space-x-2">
                      <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                        <Eye className="h-4 w-4" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                        <Edit className="h-4 w-4" />
                      </button>
                      <button 
                        onClick={() => handleDeleteCommunity(community.id)}
                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                    
                    <button
                      onClick={() => toggleCommunityStatus(community.id, community.is_active)}
                      className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                        community.is_active
                          ? 'bg-red-100 text-red-700 hover:bg-red-200'
                          : 'bg-green-100 text-green-700 hover:bg-green-200'
                      }`}
                    >
                      {community.is_active ? 'Deactivate' : 'Activate'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Settings className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {searchTerm ? 'No communities found' : 'No communities yet'}
              </h3>
              <p className="text-gray-500 mb-6">
                {searchTerm 
                  ? `No communities match "${searchTerm}". Try a different search term.`
                  : 'Get started by creating your first community.'
                }
              </p>
              {!searchTerm && (
                <button
                  onClick={handleCreateCommunity}
                  className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors mx-auto"
                >
                  <Plus className="h-4 w-4" />
                  <span>Create Community</span>
                </button>
              )}
            </div>
          </div>
        )}

        {/* Quick Stats */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Settings className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Total Communities</h4>
                <p className="text-2xl font-bold text-gray-900">{communities.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <Users className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Total Members</h4>
                <p className="text-2xl font-bold text-gray-900">
                  {communities.reduce((sum, c) => sum + c.member_count, 0)}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <BookOpen className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Total Courses</h4>
                <p className="text-2xl font-bold text-gray-900">
                  {communities.reduce((sum, c) => sum + c.course_count, 0)}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="h-5 w-5 text-orange-600" />
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Active Communities</h4>
                <p className="text-2xl font-bold text-gray-900">
                  {communities.filter(c => c.is_active).length}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Create Community Modal Placeholder */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Create New Community</h3>
            <p className="text-gray-500 mb-4">
              Community creation form will be implemented in the next phase.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowCreateModal(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => setShowCreateModal(false)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminCommunity
