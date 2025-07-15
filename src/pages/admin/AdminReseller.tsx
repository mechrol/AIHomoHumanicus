import React from 'react'

const AdminReseller: React.FC = () => {
  return (
    <div className="flex-1 p-6 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🛒</span>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Reseller Management
            </h3>
            <p className="text-gray-500">
              Ta sekcja będzie dostępna w kolejnej fazie rozwoju.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminReseller
