/**
 * API service for making RESTful API calls
 * This file serves as a centralized place for all API calls in the application
 */

import { toast } from '@/hooks/use-toast';

const API_BASE_URL = 'http://127.0.0.1:8000';

const handleApiError = (error: unknown, endpoint: string): never => {
  const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
  console.error(`API Error (${endpoint}):`, error);

  toast({
    title: 'API Error',
    description: `Failed to fetch data from ${endpoint}: ${errorMessage}`,
    variant: 'destructive',
  });

  throw error;
};

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

export const postData = async <T, R>(endpoint: string, data: T): Promise<R> => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
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

export const putData = async <T, R>(endpoint: string, data: T): Promise<R> => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
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

export const api = {
  dashboard: {
    getEnergyData: () => fetchData('/dashboard/energy'),
    getTemperatureData: () => fetchData('/dashboard/temperature'),
    getSecurityData: () => fetchData('/dashboard/security'),
  },

  energy: {
    getSolarData: () => fetchData('/energy/solar'),
    getTemperatureData: () => fetchData('/energy/temperature'),
    getRbCellsData: () => fetchData('/energy/rbcells'),
    getFrequencyData: () => fetchData('/energy/frequency'),
  },

  security: {
    getRfidUsers: () => fetchData('/security/rfid-users'),
    getAlerts: () => fetchData('/security/alerts'),
    getStats: () => fetchData('/security/stats'),
    addRfidUser: (userData: any) => postData('/security/rfid-users', userData),
    updateRfidUser: (id: string, userData: any) => putData(`/security/rfid-users/${id}`, userData),
    deleteRfidUser: (id: string) => deleteData(`/security/rfid-users/${id}`),
  },

  material: {
    getMaintenanceData: () => fetchData('/material/maintenance'),
    getInventoryData: () => fetchData('/material/inventory'),
    updateMaintenanceItem: (id: string, data: any) => putData(`/material/maintenance/${id}`, data),
    updateInventoryItem: (id: string, data: any) => putData(`/material/inventory/${id}`, data),
  },

  users: {
    getAllUsers: () => fetchData('/user/'),
    getUserById: (id: string) => fetchData(`/user/${id}/`),
    createUser: (userData: any) => postData('/user/create-user/', userData),
    updateUser: (id: string, userData: any) => putData(`/user/${id}/`, userData),
    deleteUser: (id: string) => deleteData(`/user/${id}/`),
  },

  auth: {
    login: (credentials: { username: string; password: string }) =>
      postData('/user/token/', credentials),
    refresh: (refreshToken: string) =>
      postData('/user/token/refresh/', { refresh: refreshToken }),
  },
  
};
