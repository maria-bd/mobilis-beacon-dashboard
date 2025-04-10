// src/components/PrivateRoute.tsx

import { Navigate } from 'react-router-dom';
import useAuth from '@/hooks/use-auth';

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>; // You can display a loader here while checking authentication status.
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default PrivateRoute;
