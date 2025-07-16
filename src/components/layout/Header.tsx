import React, { useState } from 'react';
import { Home, Users, Store, BarChart3, Settings, ChevronDown, User } from 'lucide-react';
import { useDashboard } from '../../contexts/DashboardContext';
import { useDashboardNavigation } from '../../hooks/useDashboardNavigation';

const iconMap = {
  Home,
  Users,
  Store,
  BarChart3,
  Settings,
  User
};

export function Header() {
  const { currentUser } = useDashboard();
  const { navigationItems, navigateToTab, activeTab } = useDashboardNavigation();
  const [resellerDropdownOpen, setResellerDropdownOpen] = useState(false);

  const handleNavClick = (itemId: string) => {
    if (itemId === 'reseller') {
      setResellerDropdownOpen(!resellerDropdownOpen);
    } else {
      navigateToTab(itemId);
      setResellerDropdownOpen(false);
    }
  };

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">AI</span>
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">AITribes</h1>
            <p className="text-xs text-gray-500 uppercase tracking-wide">ENTERPRISE</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex items-center space-x-8">
          {navigationItems.map((item) => {
            const IconComponent = iconMap[item.icon as keyof typeof iconMap];
            const isActive = activeTab === item.id;
            
            return (
              <div key={item.id} className="relative">
                <button
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                    isActive
                      ? 'text-blue-600 bg-blue-50'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  <IconComponent size={20} />
                  <span className="font-medium">{item.label}</span>
                  {item.hasDropdown && (
                    <ChevronDown 
                      size={16} 
                      className={`transition-transform ${resellerDropdownOpen ? 'rotate-180' : ''}`}
                    />
                  )}
                </button>

                {/* Dropdown for Reseller */}
                {item.id === 'reseller' && resellerDropdownOpen && item.children && (
                  <div className="absolute top-full left-0 mt-1 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                    {item.children.map((child) => {
                      const ChildIcon = iconMap[child.icon as keyof typeof iconMap];
                      return (
                        <button
                          key={child.id}
                          onClick={() => {
                            navigateToTab(child.id);
                            setResellerDropdownOpen(false);
                          }}
                          className="w-full flex items-center space-x-2 px-4 py-3 text-left text-gray-700 hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg"
                        >
                          <ChildIcon size={16} />
                          <span>{child.label}</span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* User Profile */}
        <div className="flex items-center space-x-3">
          <img
            src={currentUser?.avatar || 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1'}
            alt={currentUser?.name || 'User'}
            className="w-8 h-8 rounded-full object-cover"
          />
        </div>
      </div>
    </header>
  );
}
