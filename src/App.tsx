import React from 'react';
import { DashboardProvider } from './contexts/DashboardContext';
import { DashboardLayout } from './components/dashboard/DashboardLayout';

function App() {
  return (
    <DashboardProvider>
      <DashboardLayout />
    </DashboardProvider>
  );
}

export default App;
