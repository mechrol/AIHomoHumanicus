import { create } from 'zustand';
import { DashboardState, DashboardActions, NavigationTab, User } from '../types/dashboard';

const initialNavigationTabs: NavigationTab[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    isActive: true
  },
  {
    id: 'community',
    label: 'Community',
    isActive: false
  },
  {
    id: 'reseller',
    label: 'Reseller',
    isActive: false,
    hasDropdown: true,
    dropdownItems: [
      { id: 'products', label: 'Products' },
      { id: 'orders', label: 'Orders' },
      { id: 'customers', label: 'Customers' }
    ]
  },
  {
    id: 'analytics',
    label: 'Analytics',
    isActive: false
  },
  {
    id: 'integrations',
    label: 'Integrations',
    isActive: false
  }
];

const mockUser: User = {
  id: '1',
  name: 'John Doe',
  email: 'john@aitribes.com',
  avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
  role: 'admin'
};

export const useDashboardStore = create<DashboardState & DashboardActions>((set) => ({
  activeTab: 'dashboard',
  user: mockUser,
  navigationTabs: initialNavigationTabs,
  sidebarCollapsed: false,

  setActiveTab: (tabId: string) =>
    set((state) => ({
      activeTab: tabId,
      navigationTabs: state.navigationTabs.map((tab) => ({
        ...tab,
        isActive: tab.id === tabId
      }))
    })),

  setUser: (user: User) => set({ user }),

  toggleSidebar: () =>
    set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed }))
}));
