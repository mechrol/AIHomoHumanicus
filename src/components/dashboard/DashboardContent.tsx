import React from 'react';
import { useDashboard } from '../../contexts/DashboardContext';

export function DashboardContent() {
  const { activeTab } = useDashboard();

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Overview</h3>
                <p className="text-gray-600">Welcome to your social media dashboard</p>
              </div>
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Quick Stats</h3>
                <p className="text-gray-600">Your performance metrics</p>
              </div>
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Recent Activity</h3>
                <p className="text-gray-600">Latest updates and notifications</p>
              </div>
            </div>
          </div>
        );
      case 'community':
        return (
          <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-900">Community</h1>
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <p className="text-gray-600">Community management tools and features</p>
            </div>
          </div>
        );
      case 'analytics':
        return (
          <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <p className="text-gray-600">Analytics and reporting dashboard</p>
            </div>
          </div>
        );
      case 'integrations':
        return (
          <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-900">Integrations</h1>
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <p className="text-gray-600">Manage your integrations and settings</p>
            </div>
          </div>
        );
      case 'reseller-products':
        return (
          <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-900">Reseller - Products</h1>
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <p className="text-gray-600">Manage your products and inventory</p>
            </div>
          </div>
        );
      case 'reseller-orders':
        return (
          <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-900">Reseller - Orders</h1>
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <p className="text-gray-600">Track and manage customer orders</p>
            </div>
          </div>
        );
      case 'reseller-customers':
        return (
          <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-900">Reseller - Customers</h1>
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <p className="text-gray-600">Manage customer relationships</p>
            </div>
          </div>
        );
      default:
        return (
          <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <p className="text-gray-600">Select a tab to view content</p>
            </div>
          </div>
        );
    }
  };

  return (
    <main className="flex-1 p-6 bg-gray-50">
      {renderContent()}
    </main>
  );
}
