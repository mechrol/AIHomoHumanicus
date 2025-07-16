import { useCallback } from 'react';
import { useDashboard } from '../contexts/DashboardContext';
import { NavigationItem } from '../types/dashboard';

export function useDashboardNavigation() {
  const { activeTab, navigationItems, setActiveTab, updateNavigationItems } = useDashboard();

  const navigateToTab = useCallback((tabId: string) => {
    setActiveTab(tabId);
  }, [setActiveTab]);

  const getActiveNavItem = useCallback((): NavigationItem | undefined => {
    return navigationItems.find(item => item.active);
  }, [navigationItems]);

  const addNavigationItem = useCallback((item: NavigationItem) => {
    const updatedItems = [...navigationItems, item];
    updateNavigationItems(updatedItems);
  }, [navigationItems, updateNavigationItems]);

  const removeNavigationItem = useCallback((itemId: string) => {
    const updatedItems = navigationItems.filter(item => item.id !== itemId);
    updateNavigationItems(updatedItems);
  }, [navigationItems, updateNavigationItems]);

  const updateNavigationItem = useCallback((itemId: string, updates: Partial<NavigationItem>) => {
    const updatedItems = navigationItems.map(item =>
      item.id === itemId ? { ...item, ...updates } : item
    );
    updateNavigationItems(updatedItems);
  }, [navigationItems, updateNavigationItems]);

  return {
    activeTab,
    navigationItems,
    navigateToTab,
    getActiveNavItem,
    addNavigationItem,
    removeNavigationItem,
    updateNavigationItem
  };
}
