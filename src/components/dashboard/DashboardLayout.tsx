import React, { useEffect } from 'react';
import { Header } from '../layout/Header';
import { Sidebar } from '../layout/Sidebar';
import { DashboardContent } from './DashboardContent';
import { useDashboard } from '../../contexts/DashboardContext';
import { dashboardService } from '../../services/dashboardService';

export function DashboardLayout() {
  const { setCurrentUser, updateNavigationItems } = useDashboard();

  useEffect(() => {
    const initializeDashboard = async () => {
      try {
        const [user, navigationItems] = await Promise.all([
          dashboardService.getCurrentUser(),
          dashboardService.getNavigationItems()
        ]);
        
        setCurrentUser(user);
        updateNavigationItems(navigationItems);
      } catch (error) {
        console.error('Failed to initialize dashboard:', error);
      }
    };

    initializeDashboard();
  }, [setCurrentUser, updateNavigationItems]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="flex">
        <Sidebar />
        <DashboardContent />
      </div>
    </div>
  );
}
