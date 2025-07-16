export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: 'admin' | 'user' | 'reseller';
}

export interface NavigationTab {
  id: string;
  label: string;
  isActive: boolean;
  hasDropdown?: boolean;
  dropdownItems?: DropdownItem[];
}

export interface DropdownItem {
  id: string;
  label: string;
}

export interface DashboardState {
  activeTab: string;
  user: User | null;
  navigationTabs: NavigationTab[];
  sidebarCollapsed: boolean;
}

export interface DashboardActions {
  setActiveTab: (tabId: string) => void;
  setUser: (user: User) => void;
  toggleSidebar: () => void;
}
