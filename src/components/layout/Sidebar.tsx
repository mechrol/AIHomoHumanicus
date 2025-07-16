import React from 'react';
import { Home } from 'lucide-react';
import { useDashboardStore } from '../../store/dashboardStore';

export const Sidebar: React.FC = () => {
  const { sidebarCollapsed } = useDashboardStore();

  if (sidebarCollapsed) return null;

  return (
    <aside className="w-64 bg-white border-r border-gray-200 min-h-screen">
      <div className="p-6">
        <div className="flex items-center space-x-2 mb-8">
          <Home className="w-5 h-5 text-blue-600" />
          <span className="font-semibold text-gray-900">Dashboard</span>
        </div>
        
        <nav className="space-y-2">
          <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-4">
            MAIN NAVIGATION
          </div>
          
          <div className="space-y-1">
            <a
              href="#"
              className="flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900"
            >
              <span>Overview</span>
            </a>
            <a
              href="#"
              className="flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900"
            >
              <span>Recent Activity</span>
            </a>
            <a
              href="#"
              className="flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900"
            >
              <span>Settings</span>
            </a>
          </div>
        </nav>
      </div>
    </aside>
  );
};
