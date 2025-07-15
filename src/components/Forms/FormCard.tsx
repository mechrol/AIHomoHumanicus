import React from 'react'
import { FileText, Users, Clock } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'
import { pl } from 'date-fns/locale'
import { Form } from '../../types'

interface FormCardProps {
  form: Form
  onTakeForm?: (formId: string) => void
}

const FormCard: React.FC<FormCardProps> = ({ form, onTakeForm }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
            <FileText className="h-6 w-6 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{form.title}</h3>
            <p className="text-sm text-gray-500 flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              {formatDistanceToNow(new Date(form.created_at), { 
                addSuffix: true, 
                locale: pl 
              })}
            </p>
          </div>
        </div>
        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
          form.is_active 
            ? 'bg-green-100 text-green-800' 
            : 'bg-gray-100 text-gray-800'
        }`}>
          {form.is_active ? 'Aktywny' : 'Nieaktywny'}
        </span>
      </div>

      <p className="text-gray-600 mb-4 line-clamp-2">{form.description}</p>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4 text-sm text-gray-500">
          <span className="flex items-center">
            <FileText className="h-4 w-4 mr-1" />
            {form.questions.length} pytań
          </span>
          <span className="flex items-center">
            <Users className="h-4 w-4 mr-1" />
            24 odpowiedzi
          </span>
        </div>

        <button
          onClick={() => onTakeForm?.(form.id)}
          className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
        >
          Wypełnij formularz
        </button>
      </div>
    </div>
  )
}

export default FormCard
