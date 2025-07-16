import { useCallback } from 'react';
import { useDashboardStore } from '../store/dashboardStore';

export const useDashboardNavigation = () => {
  const { activeTab, setActiveTab, navigationTabs } = useDashboardStore();

  const navigateToTab = useCallback((tabId: string) => {
    setActiveTab(tabId);
  }, [setActiveTab]);

  const getActiveTabData = useCallback(() => {
    return navigationTabs.find(tab => tab.isActive);
  }, [navigationTabs]);

  const isTabActive = useCallback((tabId: string) => {
    return activeTab === tabId;
  }, [activeTab]);

  return {
    activeTab,
    navigateToTab,
    getActiveTabData,
    isTabActive,
    navigationTabs
  };
};
