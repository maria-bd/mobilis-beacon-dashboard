
// src/components/PrivateRoute.tsx
import React from 'react';
import useAuth from '@/hooks/use-auth';

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const { loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  // Always render children in this version
  return children;
};

export default PrivateRoute;
