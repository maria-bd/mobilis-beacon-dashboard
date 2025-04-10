
import React, { useState } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import { useAuth } from '@/context/AuthContext';
import { Toaster } from '@/components/ui/toaster';

const Layout = () => {
  const { isAuthenticated } = useAuth();
  const [collapsed, setCollapsed] = useState(false);
  
  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  return (
    <div className="flex h-screen bg-background">
      <Sidebar collapsed={collapsed} onToggle={toggleSidebar} />
      
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header />
        
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
      
      <Toaster />
    </div>
  );
};

export default Layout;
