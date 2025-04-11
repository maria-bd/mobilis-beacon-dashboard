
// Mock user data service

// Define user type
type User = {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  is_active: boolean;
  is_superuser: boolean;
};

// Mock user data
const mockUsers: User[] = [
  {
    id: 1,
    email: 'admin@example.com',
    first_name: 'Admin',
    last_name: 'User',
    is_active: true,
    is_superuser: true
  },
  {
    id: 2,
    email: 'manager@example.com',
    first_name: 'Manager',
    last_name: 'User',
    is_active: true,
    is_superuser: false
  },
  {
    id: 3,
    email: 'user@example.com',
    first_name: 'Regular',
    last_name: 'User',
    is_active: true,
    is_superuser: false
  },
  {
    id: 4,
    email: 'inactive@example.com',
    first_name: 'Inactive',
    last_name: 'User',
    is_active: false,
    is_superuser: false
  }
];

// Mock API functions
export const getAllUsers = async (): Promise<User[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return [...mockUsers];
};

export const getUserById = async (id: string): Promise<User> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  const user = mockUsers.find(u => u.id === parseInt(id));
  if (!user) {
    throw new Error('User not found');
  }
  return { ...user };
};

export const createUser = async (userData: Omit<User, 'id'>): Promise<User> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  const newUser = {
    ...userData,
    id: Math.max(...mockUsers.map(u => u.id)) + 1
  };
  mockUsers.push(newUser);
  return { ...newUser };
};

export const updateUser = async (id: string, userData: Partial<Omit<User, 'id'>>): Promise<User> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  const index = mockUsers.findIndex(u => u.id === parseInt(id));
  if (index === -1) {
    throw new Error('User not found');
  }
  mockUsers[index] = { ...mockUsers[index], ...userData };
  return { ...mockUsers[index] };
};

export const deleteUser = async (id: string): Promise<void> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  const index = mockUsers.findIndex(u => u.id === parseInt(id));
  if (index === -1) {
    throw new Error('User not found');
  }
  mockUsers.splice(index, 1);
};
