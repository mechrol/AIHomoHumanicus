import React from 'react';
import { Home } from 'lucide-react';
import { useDashboard } from '../../contexts/DashboardContext';
import { useDashboardNavigation } from '../../hooks/useDashboardNavigation';

export function Sidebar() {
  const { activeTab } = useDashboard();
  const { navigateToTab } = useDashboardNavigation();

  return (
    <aside className="w-64 bg-white border-r border-gray-200 min-h-screen">
      <div className="p-6">
        <nav className="space-y-2">
          <button
            onClick={() => navigateToTab('dashboard')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
              activeTab === 'dashboard'
                ? 'bg-blue-50 text-blue-600 border border-blue-200'
                : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            <Home size={20} />
            <span className="font-medium">Dashboard</span>
          </button>
        </nav>
      </div>
    </aside>
  );
}
