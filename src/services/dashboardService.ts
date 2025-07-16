import { User, NavigationItem } from '../types/dashboard';

class DashboardService {
  private baseUrl = '/api';

  async getCurrentUser(): Promise<User> {
    // Mock user data - replace with actual API call
    return {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
      role: 'admin'
    };
  }

  async getNavigationItems(): Promise<NavigationItem[]> {
    // Mock navigation data - replace with actual API call
    return [
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
        hasDropdown: true,
        children: [
          { id: 'reseller-products', label: 'Products', icon: 'Package', path: '/reseller/products' },
          { id: 'reseller-orders', label: 'Orders', icon: 'ShoppingCart', path: '/reseller/orders' },
          { id: 'reseller-customers', label: 'Customers', icon: 'Users', path: '/reseller/customers' }
        ]
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
    ];
  }

  async updateUserProfile(userId: string, updates: Partial<User>): Promise<User> {
    // Mock API call - replace with actual implementation
    const currentUser = await this.getCurrentUser();
    return { ...currentUser, ...updates };
  }

  async logActivity(action: string, details: any): Promise<void> {
    // Mock logging - replace with actual implementation
    console.log('Dashboard Activity:', { action, details, timestamp: new Date() });
  }
}

export const dashboardService = new DashboardService();
