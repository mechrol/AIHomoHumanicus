import React, { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { Post } from '../types'
import CreatePost from '../components/Posts/CreatePost'
import PostCard from '../components/Posts/PostCard'
import { useAuth } from '../contexts/AuthContext'

const Home: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const { profile } = useAuth()

  useEffect(() => {
    fetchPosts()
  }, [])

  const fetchPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('posts')
        .select(`
          *,
          user:profiles(*)
        `)
        .order('created_at', { ascending: false })
        .limit(20)

      if (error) throw error
      setPosts(data || [])
    } catch (error) {
      console.error('Error fetching posts:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleCreatePost = async (content: string, image?: File) => {
    if (!profile) return

    try {
      let imageUrl = null
      
      if (image) {
        const fileExt = image.name.split('.').pop()
        const fileName = `${Math.random()}.${fileExt}`
        const { error: uploadError } = await supabase.storage
          .from('posts')
          .upload(fileName, image)

        if (uploadError) throw uploadError

        const { data: { publicUrl } } = supabase.storage
          .from('posts')
          .getPublicUrl(fileName)
        
        imageUrl = publicUrl
      }

      const { data, error } = await supabase
        .from('posts')
        .insert([
          {
            user_id: profile.id,
            content,
            image_url: imageUrl,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          },
        ])
        .select(`
          *,
          user:profiles(*)
        `)
        .single()

      if (error) throw error

      setPosts([data, ...posts])
    } catch (error) {
      console.error('Error creating post:', error)
    }
  }

  const handleLike = async (postId: string) => {
    if (!profile) return

    try {
      // Check if already liked
      const { data: existingLike } = await supabase
        .from('likes')
        .select('id')
        .eq('post_id', postId)
        .eq('user_id', profile.id)
        .single()

      if (existingLike) {
        // Unlike
        await supabase
          .from('likes')
          .delete()
          .eq('post_id', postId)
          .eq('user_id', profile.id)
      } else {
        // Like
        await supabase
          .from('likes')
          .insert([
            {
              post_id: postId,
              user_id: profile.id,
              created_at: new Date().toISOString(),
            },
          ])
      }

      // Update posts state
      setPosts(posts.map(post => 
        post.id === postId 
          ? { 
              ...post, 
              likes_count: existingLike 
                ? post.likes_count - 1 
                : post.likes_count + 1 
            }
          : post
      ))
    } catch (error) {
      console.error('Error toggling like:', error)
    }
  }

  if (loading) {
    return (
      <div className="flex-1 p-6">
        <div className="max-w-2xl mx-auto">
          <div className="animate-pulse space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-white rounded-lg p-6 shadow-sm">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-300 rounded w-32"></div>
                    <div className="h-3 bg-gray-300 rounded w-24"></div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-300 rounded"></div>
                  <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 p-6">
      <div className="max-w-2xl mx-auto">
        <CreatePost onSubmit={handleCreatePost} />
        
        <div className="space-y-4">
          {posts.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📝</span>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Brak postów
              </h3>
              <p className="text-gray-500">
                Bądź pierwszy i podziel się swoimi emocjami!
              </p>
            </div>
          ) : (
            posts.map((post) => (
              <PostCard
                key={post.id}
                post={post}
                onLike={handleLike}
              />
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default Home
