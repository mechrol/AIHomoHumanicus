import React, { useState } from 'react'
import { Heart, MessageCircle, Share2, MoreHorizontal } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'
import { pl } from 'date-fns/locale'
import { Post } from '../../types'

interface PostCardProps {
  post: Post
  onLike?: (postId: string) => void
  onComment?: (postId: string) => void
  onShare?: (postId: string) => void
}

const PostCard: React.FC<PostCardProps> = ({ post, onLike, onComment, onShare }) => {
  const [liked, setLiked] = useState(false)
  const [showComments, setShowComments] = useState(false)

  const handleLike = () => {
    setLiked(!liked)
    onLike?.(post.id)
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-4">
      {/* Post Header */}
      <div className="p-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
            <span className="text-white text-sm font-medium">
              {post.user?.first_name?.[0]}{post.user?.last_name?.[0]}
            </span>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">
              {post.user?.first_name} {post.user?.last_name}
            </h3>
            <p className="text-sm text-gray-500">
              @{post.user?.username} • {formatDistanceToNow(new Date(post.created_at), { 
                addSuffix: true, 
                locale: pl 
              })}
            </p>
          </div>
        </div>
        <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full">
          <MoreHorizontal className="h-5 w-5" />
        </button>
      </div>

      {/* Post Content */}
      <div className="px-4 pb-3">
        <p className="text-gray-900 whitespace-pre-wrap">{post.content}</p>
        {post.image_url && (
          <div className="mt-3">
            <img
              src={post.image_url}
              alt="Post image"
              className="w-full rounded-lg max-h-96 object-cover"
            />
          </div>
        )}
      </div>

      {/* Post Actions */}
      <div className="px-4 py-3 border-t border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <button
              onClick={handleLike}
              className={`flex items-center space-x-2 px-3 py-1 rounded-full transition-colors ${
                liked
                  ? 'text-red-600 bg-red-50 hover:bg-red-100'
                  : 'text-gray-600 hover:text-red-600 hover:bg-red-50'
              }`}
            >
              <Heart className={`h-5 w-5 ${liked ? 'fill-current' : ''}`} />
              <span className="text-sm font-medium">{post.likes_count + (liked ? 1 : 0)}</span>
            </button>

            <button
              onClick={() => setShowComments(!showComments)}
              className="flex items-center space-x-2 px-3 py-1 rounded-full text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-colors"
            >
              <MessageCircle className="h-5 w-5" />
              <span className="text-sm font-medium">{post.comments_count}</span>
            </button>

            <button
              onClick={() => onShare?.(post.id)}
              className="flex items-center space-x-2 px-3 py-1 rounded-full text-gray-600 hover:text-green-600 hover:bg-green-50 transition-colors"
            >
              <Share2 className="h-5 w-5" />
              <span className="text-sm font-medium">Udostępnij</span>
            </button>
          </div>
        </div>
      </div>

      {/* Comments Section */}
      {showComments && (
        <div className="border-t border-gray-100 p-4">
          <div className="space-y-3">
            <div className="flex space-x-3">
              <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-medium">AK</span>
              </div>
              <div className="flex-1">
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-sm font-medium text-gray-900">Anna Kowalska</p>
                  <p className="text-sm text-gray-700">Świetny post! Bardzo się z tym utożsamiam.</p>
                </div>
                <p className="text-xs text-gray-500 mt-1">2 godziny temu</p>
              </div>
            </div>
          </div>

          {/* Add Comment */}
          <div className="mt-4 flex space-x-3">
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-medium">JK</span>
            </div>
            <div className="flex-1">
              <textarea
                placeholder="Napisz komentarz..."
                className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows={2}
              />
              <div className="mt-2 flex justify-end">
                <button className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors">
                  Skomentuj
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default PostCard
