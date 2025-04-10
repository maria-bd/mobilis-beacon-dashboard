
/**
 * API service for making RESTful API calls
 * This file serves as a centralized place for all API calls in the application
 */

import { toast } from '@/hooks/use-toast';

// Base API URL - replace with your actual API endpoint
const API_BASE_URL = 'https://jsonplaceholder.typicode.com';

// Helper function to handle API errors consistently
const handleApiError = (error: unknown, endpoint: string): never => {
  const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
  console.error(`API Error (${endpoint}):`, error);
  
  // You can trigger a toast notification here
  toast({
    title: 'API Error',
    description: `Failed to fetch data from ${endpoint}: ${errorMessage}`,
    variant: 'destructive',
  });
  
  throw error;
};

/**
 * Generic function to fetch data from an API endpoint
 * @param endpoint The API endpoint to fetch data from (without the base URL)
 * @returns Promise with the fetched data
 */
export const fetchData = async <T>(endpoint: string): Promise<T> => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`);
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new Error(
        errorData?.message || `API request failed with status ${response.status}`
      );
    }
    
    return await response.json();
  } catch (error) {
    return handleApiError(error, endpoint);
  }
};

/**
 * Generic function to send data to an API endpoint (POST)
 * @param endpoint The API endpoint to send data to (without the base URL)
 * @param data The data to send
 * @returns Promise with the response data
 */
export const postData = async <T, R>(endpoint: string, data: T): Promise<R> => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new Error(
        errorData?.message || `API request failed with status ${response.status}`
      );
    }
    
    return await response.json();
  } catch (error) {
    return handleApiError(error, endpoint);
  }
};

/**
 * Generic function to update data at an API endpoint (PUT)
 * @param endpoint The API endpoint to update data at (without the base URL)
 * @param data The data to update
 * @returns Promise with the response data
 */
export const putData = async <T, R>(endpoint: string, data: T): Promise<R> => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new Error(
        errorData?.message || `API request failed with status ${response.status}`
      );
    }
    
    return await response.json();
  } catch (error) {
    return handleApiError(error, endpoint);
  }
};

/**
 * Generic function to delete data from an API endpoint (DELETE)
 * @param endpoint The API endpoint to delete data from (without the base URL)
 * @returns Promise with the response data
 */
export const deleteData = async <R>(endpoint: string): Promise<R> => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'DELETE',
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new Error(
        errorData?.message || `API request failed with status ${response.status}`
      );
    }
    
    return await response.json();
  } catch (error) {
    return handleApiError(error, endpoint);
  }
};

// Specific API functions for different domains
export const api = {
  // Dashboard API
  dashboard: {
    getEnergyData: () => fetchData('/dashboard/energy'),
    getTemperatureData: () => fetchData('/dashboard/temperature'),
    getSecurityData: () => fetchData('/dashboard/security'),
  },
  
  // Energy API
  energy: {
    getSolarData: () => fetchData('/energy/solar'),
    getTemperatureData: () => fetchData('/energy/temperature'),
    getRbCellsData: () => fetchData('/energy/rbcells'),
    getFrequencyData: () => fetchData('/energy/frequency'),
  },
  
  // Security API
  security: {
    getRfidUsers: () => fetchData('/security/rfid-users'),
    getAlerts: () => fetchData('/security/alerts'),
    getStats: () => fetchData('/security/stats'),
    addRfidUser: (userData: any) => postData('/security/rfid-users', userData),
    updateRfidUser: (id: string, userData: any) => putData(`/security/rfid-users/${id}`, userData),
    deleteRfidUser: (id: string) => deleteData(`/security/rfid-users/${id}`),
  },
  
  // Material API
  material: {
    getMaintenanceData: () => fetchData('/material/maintenance'),
    getInventoryData: () => fetchData('/material/inventory'),
    updateMaintenanceItem: (id: string, data: any) => putData(`/material/maintenance/${id}`, data),
    updateInventoryItem: (id: string, data: any) => putData(`/material/inventory/${id}`, data),
  },
  
  // Users API
  users: {
    getAllUsers: () => fetchData('/users'),
    getUserById: (id: string) => fetchData(`/users/${id}`),
    createUser: (userData: any) => postData('/users', userData),
    updateUser: (id: string, userData: any) => putData(`/users/${id}`, userData),
    deleteUser: (id: string) => deleteData(`/users/${id}`),
  },
};

/*
in Users.jsx after moh
* type User = {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  is_active: boolean;
  is_superuser: boolean;
};
*  Frequence : Time, users, signal, fréquence.
*/