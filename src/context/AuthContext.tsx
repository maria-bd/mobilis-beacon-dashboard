
import React, { createContext, useContext, useState, ReactNode } from 'react';

export type UserRole = 'admin' | 'manager' | 'user';

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string, role: UserRole) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Create a default user that's always available
  const defaultUser: User = {
    id: '1',
    name: 'Demo User',
    email: 'demo@example.com',
    role: 'admin',
  };

  const [user] = useState<User | null>(defaultUser);
  const [isAuthenticated] = useState<boolean>(true);

  // Mock login function (will not actually be used)
  const login = async (): Promise<boolean> => {
    return true;
  };

  const logout = () => {
    // This function is kept for API compatibility but doesn't do anything
    console.log('Logout functionality disabled in demo mode');
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
