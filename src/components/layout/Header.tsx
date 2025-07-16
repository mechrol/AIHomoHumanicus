import React, { useState } from 'react';
import { ChevronDown, Bell, Search } from 'lucide-react';
import { useDashboardStore } from '../../store/dashboardStore';

export const Header: React.FC = () => {
  const { navigationTabs, setActiveTab, user } = useDashboardStore();
  const [showResellerDropdown, setShowResellerDropdown] = useState(false);

  const handleTabClick = (tabId: string, hasDropdown?: boolean) => {
    if (hasDropdown && tabId === 'reseller') {
      setShowResellerDropdown(!showResellerDropdown);
    } else {
      setActiveTab(tabId);
      setShowResellerDropdown(false);
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
          {navigationTabs.map((tab) => (
            <div key={tab.id} className="relative">
              <button
                onClick={() => handleTabClick(tab.id, tab.hasDropdown)}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  tab.isActive
                    ? 'text-blue-600 bg-blue-50'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <span>{tab.label}</span>
                {tab.hasDropdown && (
                  <ChevronDown className={`w-4 h-4 transition-transform ${
                    showResellerDropdown && tab.id === 'reseller' ? 'rotate-180' : ''
                  }`} />
                )}
              </button>

              {/* Dropdown for Reseller */}
              {tab.hasDropdown && tab.id === 'reseller' && showResellerDropdown && (
                <div className="absolute top-full left-0 mt-1 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                  {tab.dropdownItems?.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => {
                        setActiveTab(`${tab.id}-${item.id}`);
                        setShowResellerDropdown(false);
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Right side actions */}
        <div className="flex items-center space-x-4">
          <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-50">
            <Search className="w-5 h-5" />
          </button>
          <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-50 relative">
            <Bell className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
          </button>
          
          {/* User Avatar */}
          <div className="flex items-center space-x-3">
            <img
              src={user?.avatar}
              alt={user?.name}
              className="w-8 h-8 rounded-full object-cover"
            />
          </div>
        </div>
      </div>
    </header>
  );
};
