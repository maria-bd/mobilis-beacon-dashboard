
import { useState, useEffect } from 'react';

const useAuth = () => {
  // Always authenticated in this version
  const [isAuthenticated] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Simulate a quick loading state for API consistency
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  return { isAuthenticated, loading };
};

export default useAuth;
