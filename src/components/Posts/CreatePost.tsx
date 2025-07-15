import React, { useState } from 'react'
import { Image, Smile, MapPin, Calendar } from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'

interface CreatePostProps {
  onSubmit?: (content: string, image?: File) => void
}

const CreatePost: React.FC<CreatePostProps> = ({ onSubmit }) => {
  const [content, setContent] = useState('')
  const [image, setImage] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const { profile } = useAuth()

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setImage(file)
      const reader = new FileReader()
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (content.trim() || image) {
      onSubmit?.(content, image || undefined)
      setContent('')
      setImage(null)
      setImagePreview(null)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
      <form onSubmit={handleSubmit}>
        <div className="flex space-x-3">
          <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
            <span className="text-white text-sm font-medium">
              {profile?.first_name?.[0]}{profile?.last_name?.[0]}
            </span>
          </div>
          <div className="flex-1">
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Co czujesz? Podziel się swoimi emocjami..."
              className="w-full p-3 border-0 resize-none focus:ring-0 focus:outline-none text-lg placeholder-gray-500"
              rows={3}
            />
            
            {imagePreview && (
              <div className="mt-3 relative">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="max-h-64 rounded-lg object-cover"
                />
                <button
                  type="button"
                  onClick={() => {
                    setImage(null)
                    setImagePreview(null)
                  }}
                  className="absolute top-2 right-2 bg-black bg-opacity-50 text-white rounded-full p-1 hover:bg-opacity-70"
                >
                  ×
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <label className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 cursor-pointer">
              <Image className="h-5 w-5" />
              <span className="text-sm">Zdjęcie</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>
            
            <button
              type="button"
              className="flex items-center space-x-2 text-gray-600 hover:text-yellow-600"
            >
              <Smile className="h-5 w-5" />
              <span className="text-sm">Emotikona</span>
            </button>
            
            <button
              type="button"
              className="flex items-center space-x-2 text-gray-600 hover:text-green-600"
            >
              <MapPin className="h-5 w-5" />
              <span className="text-sm">Lokalizacja</span>
            </button>
            
            <button
              type="button"
              className="flex items-center space-x-2 text-gray-600 hover:text-purple-600"
            >
              <Calendar className="h-5 w-5" />
              <span className="text-sm">Wydarzenie</span>
            </button>
          </div>

          <button
            type="submit"
            disabled={!content.trim() && !image}
            className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Opublikuj
          </button>
        </div>
      </form>
    </div>
  )
}

export default CreatePost
