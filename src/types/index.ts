export interface User {
  id: string
  email: string
  first_name: string
  last_name: string
  username: string
  avatar_url?: string
  cover_url?: string
  bio?: string
  location?: string
  created_at: string
  updated_at: string
}

export interface Post {
  id: string
  user_id: string
  content: string
  image_url?: string
  created_at: string
  updated_at: string
  likes_count: number
  comments_count: number
  user?: User
}

export interface Comment {
  id: string
  post_id: string
  user_id: string
  content: string
  created_at: string
  user?: User
}

export interface Like {
  id: string
  post_id: string
  user_id: string
  created_at: string
}

export interface Form {
  id: string
  title: string
  description: string
  questions: FormQuestion[]
  created_by: string
  created_at: string
  is_active: boolean
}

export interface FormQuestion {
  id: string
  question: string
  type: 'text' | 'textarea' | 'select' | 'radio' | 'checkbox' | 'scale'
  options?: string[]
  required: boolean
  order: number
}

export interface FormResponse {
  id: string
  form_id: string
  user_id: string
  responses: Record<string, any>
  created_at: string
}
