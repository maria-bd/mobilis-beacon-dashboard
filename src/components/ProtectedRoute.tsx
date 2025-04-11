
import React from 'react';
import { Outlet } from 'react-router-dom';
import useAuth from '@/hooks/use-auth';

const ProtectedRoute: React.FC = () => {
  const { loading } = useAuth();

  // Show loading indicator while checking authentication
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Always render the child routes in this version
  return <Outlet />;
};

export default ProtectedRoute;
