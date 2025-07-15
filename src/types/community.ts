export interface Community {
  id: string
  name: string
  description: string
  banner_url?: string
  avatar_url?: string
  created_by: string
  created_at: string
  updated_at: string
  is_active: boolean
  member_count: number
  course_count: number
  group_count: number
}

export interface Course {
  id: string
  community_id: string
  title: string
  description: string
  thumbnail_url?: string
  price: number
  lesson_count: number
  created_by: string
  created_at: string
  is_published: boolean
}

export interface Lesson {
  id: string
  course_id: string
  title: string
  description: string
  type: 'video' | 'text' | 'quiz' | 'assignment'
  content_url?: string
  duration?: number
  order: number
  is_published: boolean
  created_at: string
}

export interface CommunityMember {
  id: string
  community_id: string
  user_id: string
  role: 'owner' | 'admin' | 'moderator' | 'member'
  joined_at: string
}
