import React, { useState, useEffect } from 'react'
import { Plus } from 'lucide-react'
import { supabase } from '../lib/supabase'
import { Form } from '../types'
import FormCard from '../components/Forms/FormCard'

const Forms: React.FC = () => {
  const [forms, setForms] = useState<Form[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchForms()
  }, [])

  const fetchForms = async () => {
    try {
      const { data, error } = await supabase
        .from('forms')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false })

      if (error) throw error
      setForms(data || [])
    } catch (error) {
      console.error('Error fetching forms:', error)
    } finally {
      setLoading(false)
    }
  }

  // Mock data for demonstration
  const mockForms: Form[] = [
    {
      id: '1',
      title: 'Co czuję dzisiaj?',
      description: 'Formularz samooceny emocjonalnej - sprawdź swój stan emocjonalny i otrzymaj spersonalizowane rekomendacje.',
      questions: [
        {
          id: '1',
          question: 'Jak oceniasz swój nastrój na skali 1-10?',
          type: 'scale',
          required: true,
          order: 1,
        },
        {
          id: '2',
          question: 'Opisz swoje główne emocje z dzisiaj',
          type: 'textarea',
          required: true,
          order: 2,
        },
      ],
      created_by: 'system',
      created_at: new Date().toISOString(),
      is_active: true,
    },
    {
      id: '2',
      title: 'Czego potrzebuję?',
      description: 'Zidentyfikuj swoje potrzeby i znajdź odpowiednie wsparcie w społeczności.',
      questions: [
        {
          id: '1',
          question: 'W jakiej dziedzinie potrzebujesz wsparcia?',
          type: 'select',
          options: ['Emocjonalne', 'Zawodowe', 'Rodzinne', 'Zdrowotne', 'Finansowe'],
          required: true,
          order: 1,
        },
      ],
      created_by: 'system',
      created_at: new Date().toISOString(),
      is_active: true,
    },
    {
      id: '3',
      title: 'Jak mogę pomóc?',
      description: 'Podziel się swoimi umiejętnościami i doświadczeniem z innymi członkami społeczności.',
      questions: [
        {
          id: '1',
          question: 'W czym możesz pomóc innym?',
          type: 'checkbox',
          options: ['Rozmowa', 'Doradztwo zawodowe', 'Wsparcie emocjonalne', 'Pomoc praktyczna'],
          required: true,
          order: 1,
        },
      ],
      created_by: 'system',
      created_at: new Date().toISOString(),
      is_active: true,
    },
  ]

  const handleTakeForm = (formId: string) => {
    // Navigate to form taking page
    console.log('Taking form:', formId)
  }

  if (loading) {
    return (
      <div className="flex-1 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="animate-pulse space-y-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-white rounded-lg p-6 shadow-sm">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-12 h-12 bg-gray-300 rounded-lg"></div>
                  <div className="space-y-2">
                    <div className="h-5 bg-gray-300 rounded w-48"></div>
                    <div className="h-4 bg-gray-300 rounded w-32"></div>
                  </div>
                </div>
                <div className="h-4 bg-gray-300 rounded mb-4"></div>
                <div className="flex justify-between">
                  <div className="h-4 bg-gray-300 rounded w-24"></div>
                  <div className="h-8 bg-gray-300 rounded w-32"></div>
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
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Interaktywne formularze</h1>
            <p className="text-gray-600 mt-1">
              Poznaj siebie lepiej dzięki formularzom wspieranym przez AI
            </p>
          </div>
          <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors">
            <Plus className="h-5 w-5" />
            <span>Stwórz formularz</span>
          </button>
        </div>

        {/* Featured Forms */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Polecane formularze</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockForms.map((form) => (
              <FormCard
                key={form.id}
                form={form}
                onTakeForm={handleTakeForm}
              />
            ))}
          </div>
        </div>

        {/* Categories */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Kategorie</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: 'Samoocena', count: 12, color: 'bg-blue-500' },
              { name: 'Potrzeby', count: 8, color: 'bg-green-500' },
              { name: 'Wsparcie', count: 15, color: 'bg-purple-500' },
              { name: 'Rozwój', count: 6, color: 'bg-orange-500' },
            ].map((category) => (
              <div
                key={category.name}
                className="bg-white rounded-lg p-4 shadow-sm border border-gray-200 hover:shadow-md transition-shadow cursor-pointer"
              >
                <div className={`w-8 h-8 ${category.color} rounded-lg mb-3`}></div>
                <h3 className="font-medium text-gray-900">{category.name}</h3>
                <p className="text-sm text-gray-500">{category.count} formularzy</p>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Twoja aktywność</h2>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📊</span>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Brak wypełnionych formularzy
              </h3>
              <p className="text-gray-500 mb-4">
                Wypełnij swój pierwszy formularz i zacznij poznawać siebie lepiej
              </p>
              <button className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors">
                Wypełnij formularz
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Forms
