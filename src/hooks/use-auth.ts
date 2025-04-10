import { useState, useEffect } from 'react';
import { api } from '@/services/api';

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true); // set true initially

  useEffect(() => {
    const refreshToken = localStorage.getItem('refreshToken');

    if (refreshToken) {
      // Try to refresh the access token
      api.auth.refresh(refreshToken)
        .then((response) => {
          const { access } = response;
          localStorage.setItem('authToken', access);
          setIsAuthenticated(true);
        })
        .catch((error) => {
          console.error('Token refresh failed', error);
          setIsAuthenticated(false);
          localStorage.removeItem('authToken');
          localStorage.removeItem('refreshToken');
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setIsAuthenticated(false);
      setLoading(false);
    }
  }, []);

  return { isAuthenticated, loading };
};

export default useAuth;
