
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useLanguage } from '@/context/LanguageContext';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { useToast } from '@/hooks/use-toast';
import { useQuery } from '@tanstack/react-query';

// API service for fetching security data
const fetchRfidUsers = async () => {
  try {
    // This would be replaced with your actual API endpoint
    const response = await fetch('https://api.example.com/security/rfid-users');
    if (!response.ok) throw new Error('Failed to fetch RFID users');
    return response.json();
  } catch (error) {
    console.error('Error fetching RFID users:', error);
    throw error;
  }
};

const fetchSecurityAlerts = async () => {
  try {
    const response = await fetch('https://api.example.com/security/alerts');
    if (!response.ok) throw new Error('Failed to fetch security alerts');
    return response.json();
  } catch (error) {
    console.error('Error fetching security alerts:', error);
    throw error;
  }
};

const fetchSecurityStats = async () => {
  try {
    const response = await fetch('https://api.example.com/security/stats');
    if (!response.ok) throw new Error('Failed to fetch security stats');
    return response.json();
  } catch (error) {
    console.error('Error fetching security stats:', error);
    throw error;
  }
};

const Security = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  
  // Use React Query to fetch data
  const { data: rfidUsers = [], isLoading: isLoadingRfid, error: rfidError } = useQuery({
    queryKey: ['securityRfidUsers'],
    queryFn: fetchRfidUsers,
  });
  
  const { data: securityAlerts = [], isLoading: isLoadingAlerts, error: alertsError } = useQuery({
    queryKey: ['securityAlerts'],
    queryFn: fetchSecurityAlerts,
  });
  
  const { data: statsData = [], isLoading: isLoadingStats, error: statsError } = useQuery({
    queryKey: ['securityStats'],
    queryFn: fetchSecurityStats,
  });
  
  // Show error toast if any fetch fails
  useEffect(() => {
    if (rfidError || alertsError || statsError) {
      toast({
        title: t('error'),
        description: t('failed_to_load_data'),
        variant: "destructive",
      });
    }
  }, [rfidError, alertsError, statsError, toast, t]);
  
  // Mock data as fallback if API fails or for development
  const fallbackRfidUsers = [
    { id: 'RFID-001', name: 'Jean Dupont', role: 'Admin', lastAccess: '10 Apr 2025, 09:15', status: 'active' },
    { id: 'RFID-002', name: 'Marie Martin', role: 'Manager', lastAccess: '10 Apr 2025, 08:30', status: 'active' },
    { id: 'RFID-003', name: 'Pierre Durand', role: 'Technician', lastAccess: '09 Apr 2025, 16:45', status: 'active' },
    { id: 'RFID-004', name: 'Sophie Lefebvre', role: 'Security', lastAccess: '10 Apr 2025, 07:20', status: 'active' },
    { id: 'RFID-005', name: 'Thomas Bernard', role: 'Technician', lastAccess: '08 Apr 2025, 14:10', status: 'inactive' },
  ];
  
  const fallbackSecurityAlerts = [
    { id: 'ALT-001', type: 'Unauthorized', zone: 'Zone A', time: '10 Apr 2025, 02:15', status: 'critical' },
    { id: 'ALT-002', type: 'Invalid RFID', zone: 'Zone B', time: '09 Apr 2025, 23:30', status: 'warning' },
    { id: 'ALT-003', type: 'Door Forced', zone: 'Zone C', time: '08 Apr 2025, 19:45', status: 'critical' },
    { id: 'ALT-004', type: 'Motion Detected', zone: 'Zone A', time: '08 Apr 2025, 22:20', status: 'warning' },
    { id: 'ALT-005', type: 'Invalid RFID', zone: 'Zone D', time: '07 Apr 2025, 15:10', status: 'warning' },
  ];
  
  const fallbackStatsData = [
    { day: 'Mon', authorized: 42, unauthorized: 2 },
    { day: 'Tue', authorized: 38, unauthorized: 0 },
    { day: 'Wed', authorized: 45, unauthorized: 1 },
    { day: 'Thu', authorized: 40, unauthorized: 0 },
    { day: 'Fri', authorized: 35, unauthorized: 3 },
    { day: 'Sat', authorized: 15, unauthorized: 0 },
    { day: 'Sun', authorized: 5, unauthorized: 0 },
  ];
  
  // Use the API data if available, otherwise use the fallback data
  const displayRfidUsers = rfidUsers.length > 0 ? rfidUsers : fallbackRfidUsers;
  const displaySecurityAlerts = securityAlerts.length > 0 ? securityAlerts : fallbackSecurityAlerts;
  const displayStatsData = statsData.length > 0 ? statsData : fallbackStatsData;
  
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">{t('security')}</h1>
      
      <Tabs defaultValue="rfid" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="rfid">{t('rfid_users')}</TabsTrigger>
          <TabsTrigger value="attempts">{t('attempts')}</TabsTrigger>
          <TabsTrigger value="stats">{t('stats')}</TabsTrigger>
        </TabsList>
        
        <TabsContent value="rfid" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>{t('rfid_users')}</CardTitle>
              <CardDescription>{t('manage_users')}</CardDescription>
            </CardHeader>
            <CardContent>
              {isLoadingRfid ? (
                <div className="flex justify-center items-center h-[300px]">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>{t('id')}</TableHead>
                      <TableHead>{t('name')}</TableHead>
                      <TableHead>{t('role')}</TableHead>
                      <TableHead>{t('last_access')}</TableHead>
                      <TableHead>{t('status')}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {displayRfidUsers.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell className="font-medium">{user.id}</TableCell>
                        <TableCell>{user.name}</TableCell>
                        <TableCell>{user.role}</TableCell>
                        <TableCell>{user.lastAccess}</TableCell>
                        <TableCell>
                          <Badge 
                            variant={user.status === 'active' ? 'default' : 'secondary'}
                            className={user.status === 'active' ? 'bg-success' : 'bg-muted'}
                          >
                            {user.status === 'active' ? t('active') : t('inactive')}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="attempts" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>{t('attempts')}</CardTitle>
              <CardDescription>{t('security')} {t('alerts')}</CardDescription>
            </CardHeader>
            <CardContent>
              {isLoadingAlerts ? (
                <div className="flex justify-center items-center h-[300px]">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>{t('id')}</TableHead>
                      <TableHead>{t('type')}</TableHead>
                      <TableHead>{t('zone')}</TableHead>
                      <TableHead>{t('time')}</TableHead>
                      <TableHead>{t('status')}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {displaySecurityAlerts.map((alert) => (
                      <TableRow key={alert.id}>
                        <TableCell className="font-medium">{alert.id}</TableCell>
                        <TableCell>{alert.type}</TableCell>
                        <TableCell>{alert.zone}</TableCell>
                        <TableCell>{alert.time}</TableCell>
                        <TableCell>
                          <Badge 
                            variant={alert.status === 'critical' ? 'destructive' : 'default'}
                            className={alert.status === 'critical' ? 'bg-danger' : 'bg-amber-500'}
                          >
                            {alert.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="stats" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>{t('security')} {t('stats')}</CardTitle>
              <CardDescription>{t('weekly')} {t('stats')}</CardDescription>
            </CardHeader>
            <CardContent>
              {isLoadingStats ? (
                <div className="flex justify-center items-center h-[300px]">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                </div>
              ) : (
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={displayStatsData}>
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Bar 
                      dataKey="authorized" 
                      fill="#2da836" 
                      radius={[4, 4, 0, 0]} 
                      name={t('authorized')}
                    />
                    <Bar 
                      dataKey="unauthorized" 
                      fill="#d7242d" 
                      radius={[4, 4, 0, 0]} 
                      name={t('unauthorized')}
                    />
                  </BarChart>
                </ResponsiveContainer>
              )}
              
              <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-2xl">220</CardTitle>
                    <CardDescription>{t('total')} {t('access')}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-success">+5% {t('this_week')}</p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-2xl">6</CardTitle>
                    <CardDescription>{t('unauthorized')} {t('attempts')}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-danger">+2 {t('this_week')}</p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-2xl">97.3%</CardTitle>
                    <CardDescription>{t('security')} {t('score')}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-amber-500">-0.5% {t('this_week')}</p>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Security;
