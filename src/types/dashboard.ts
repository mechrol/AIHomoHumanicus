export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: 'admin' | 'user' | 'reseller';
}

export interface NavigationItem {
  id: string;
  label: string;
  icon: string;
  path: string;
  active?: boolean;
  hasDropdown?: boolean;
  children?: NavigationItem[];
}

export interface DashboardState {
  currentUser: User | null;
  activeTab: string;
  navigationItems: NavigationItem[];
  isLoading: boolean;
}

export interface DashboardContextType extends DashboardState {
  setActiveTab: (tabId: string) => void;
  setCurrentUser: (user: User | null) => void;
  updateNavigationItems: (items: NavigationItem[]) => void;
}
