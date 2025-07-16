import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { DashboardContextType, DashboardState, User, NavigationItem } from '../types/dashboard';

type DashboardAction =
  | { type: 'SET_ACTIVE_TAB'; payload: string }
  | { type: 'SET_CURRENT_USER'; payload: User | null }
  | { type: 'UPDATE_NAVIGATION_ITEMS'; payload: NavigationItem[] }
  | { type: 'SET_LOADING'; payload: boolean };

const initialState: DashboardState = {
  currentUser: null,
  activeTab: 'dashboard',
  navigationItems: [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: 'Home',
      path: '/dashboard',
      active: true
    },
    {
      id: 'community',
      label: 'Community',
      icon: 'Users',
      path: '/community'
    },
    {
      id: 'reseller',
      label: 'Reseller',
      icon: 'Store',
      path: '/reseller',
      hasDropdown: true
    },
    {
      id: 'analytics',
      label: 'Analytics',
      icon: 'BarChart3',
      path: '/analytics'
    },
    {
      id: 'integrations',
      label: 'Integrations',
      icon: 'Settings',
      path: '/integrations'
    }
  ],
  isLoading: false
};

function dashboardReducer(state: DashboardState, action: DashboardAction): DashboardState {
  switch (action.type) {
    case 'SET_ACTIVE_TAB':
      return {
        ...state,
        activeTab: action.payload,
        navigationItems: state.navigationItems.map(item => ({
          ...item,
          active: item.id === action.payload
        }))
      };
    case 'SET_CURRENT_USER':
      return {
        ...state,
        currentUser: action.payload
      };
    case 'UPDATE_NAVIGATION_ITEMS':
      return {
        ...state,
        navigationItems: action.payload
      };
    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload
      };
    default:
      return state;
  }
}

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

export function DashboardProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(dashboardReducer, initialState);

  const setActiveTab = (tabId: string) => {
    dispatch({ type: 'SET_ACTIVE_TAB', payload: tabId });
  };

  const setCurrentUser = (user: User | null) => {
    dispatch({ type: 'SET_CURRENT_USER', payload: user });
  };

  const updateNavigationItems = (items: NavigationItem[]) => {
    dispatch({ type: 'UPDATE_NAVIGATION_ITEMS', payload: items });
  };

  const contextValue: DashboardContextType = {
    ...state,
    setActiveTab,
    setCurrentUser,
    updateNavigationItems
  };

  return (
    <DashboardContext.Provider value={contextValue}>
      {children}
    </DashboardContext.Provider>
  );
}

export function useDashboard() {
  const context = useContext(DashboardContext);
  if (context === undefined) {
    throw new Error('useDashboard must be used within a DashboardProvider');
  }
  return context;
}
