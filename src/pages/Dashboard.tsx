
import React, { useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/context/LanguageContext';
import { useAuth } from '@/context/AuthContext';
import { Bar, BarChart, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { useToast } from '@/hooks/use-toast';
import { useQuery } from '@tanstack/react-query';

// API service for fetching dashboard data
const fetchEnergyData = async () => {
  try {
    // This would be replaced with your actual API endpoint
    const response = await fetch('https://api.example.com/dashboard/energy');
    if (!response.ok) throw new Error('Failed to fetch energy data');
    return response.json();
  } catch (error) {
    console.error('Error fetching energy data:', error);
    throw error;
  }
};

const fetchTemperatureData = async () => {
  try {
    const response = await fetch('https://api.example.com/dashboard/temperature');
    if (!response.ok) throw new Error('Failed to fetch temperature data');
    return response.json();
  } catch (error) {
    console.error('Error fetching temperature data:', error);
    throw error;
  }
};

const fetchSecurityData = async () => {
  try {
    const response = await fetch('https://api.example.com/dashboard/security');
    if (!response.ok) throw new Error('Failed to fetch security data');
    return response.json();
  } catch (error) {
    console.error('Error fetching security data:', error);
    throw error;
  }
};

const Dashboard = () => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const { toast } = useToast();
  
  // Use React Query to fetch data
  const { data: energyData = [], isLoading: isLoadingEnergy, error: energyError } = useQuery({
    queryKey: ['dashboardEnergy'],
    queryFn: fetchEnergyData,
  });
  
  const { data: temperatureData = [], isLoading: isLoadingTemp, error: tempError } = useQuery({
    queryKey: ['dashboardTemperature'],
    queryFn: fetchTemperatureData,
  });
  
  const { data: securityData = [], isLoading: isLoadingSecurity, error: securityError } = useQuery({
    queryKey: ['dashboardSecurity'],
    queryFn: fetchSecurityData,
  });
  
  // Show error toast if any fetch fails
  useEffect(() => {
    if (energyError || tempError || securityError) {
      toast({
        title: t('error'),
        description: t('failed_to_load_data'),
        variant: "destructive",
      });
    }
  }, [energyError, tempError, securityError, toast, t]);
  
  // Mock data as fallback if API fails or for development
  const fallbackEnergyData = [
    { name: 'Jan', consumption: 4000, production: 2400 },
    { name: 'Feb', consumption: 3000, production: 2210 },
    { name: 'Mar', consumption: 2000, production: 2290 },
    { name: 'Apr', consumption: 2780, production: 3000 },
    { name: 'May', consumption: 1890, production: 3200 },
    { name: 'Jun', consumption: 2390, production: 3500 },
    { name: 'Jul', consumption: 3490, production: 4100 },
  ];
  
  const fallbackTemperatureData = [
    { name: '00:00', temp: 22 },
    { name: '04:00', temp: 20 },
    { name: '08:00', temp: 25 },
    { name: '12:00', temp: 30 },
    { name: '16:00', temp: 28 },
    { name: '20:00', temp: 24 },
    { name: '23:59', temp: 22 },
  ];
  
  const fallbackSecurityData = [
    { name: 'Mon', alerts: 2 },
    { name: 'Tue', alerts: 0 },
    { name: 'Wed', alerts: 1 },
    { name: 'Thu', alerts: 0 },
    { name: 'Fri', alerts: 3 },
    { name: 'Sat', alerts: 0 },
    { name: 'Sun', alerts: 0 },
  ];
  
  // Use the API data if available, otherwise use the fallback data
  const displayEnergyData = energyData.length > 0 ? energyData : fallbackEnergyData;
  const displayTemperatureData = temperatureData.length > 0 ? temperatureData : fallbackTemperatureData;
  const displaySecurityData = securityData.length > 0 ? securityData : fallbackSecurityData;
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">{t('dashboard')}</h1>
        <div className="text-sm text-muted-foreground">
          {t('welcome')} {user?.name} ({t(user?.role || 'user')})
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>{t('energy')}</CardTitle>
            <CardDescription>{t('consumption')} & {t('production')}</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoadingEnergy ? (
              <div className="flex justify-center items-center h-[200px]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
              </div>
            ) : (
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={displayEnergyData}>
                  <XAxis dataKey="name" fontSize={12} />
                  <YAxis fontSize={12} />
                  <Tooltip />
                  <Bar dataKey="consumption" fill="#d7242d" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="production" fill="#2da836" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>{t('temperature')}</CardTitle>
            <CardDescription>{t('solar_panels')} {t('temperature')}</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoadingTemp ? (
              <div className="flex justify-center items-center h-[200px]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
              </div>
            ) : (
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={displayTemperatureData}>
                  <XAxis dataKey="name" fontSize={12} />
                  <YAxis fontSize={12} />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="temp" 
                    stroke="#d7242d" 
                    strokeWidth={2} 
                  />
                </LineChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>{t('security')}</CardTitle>
            <CardDescription>{t('alerts')} {t('stats')}</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoadingSecurity ? (
              <div className="flex justify-center items-center h-[200px]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
              </div>
            ) : (
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={displaySecurityData}>
                  <XAxis dataKey="name" fontSize={12} />
                  <YAxis fontSize={12} />
                  <Tooltip />
                  <Bar dataKey="alerts" fill="#d7242d" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>{t('efficiency')}</CardTitle>
            <CardDescription>{t('solar_panels')} {t('efficiency')}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span>{t('solar_panels')} 1</span>
                <div className="w-2/3 h-2 bg-secondary rounded-full overflow-hidden">
                  <div className="h-full success-gradient rounded-full" style={{ width: '87%' }} />
                </div>
                <span className="font-medium">87%</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span>{t('solar_panels')} 2</span>
                <div className="w-2/3 h-2 bg-secondary rounded-full overflow-hidden">
                  <div className="h-full success-gradient rounded-full" style={{ width: '92%' }} />
                </div>
                <span className="font-medium">92%</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span>{t('solar_panels')} 3</span>
                <div className="w-2/3 h-2 bg-secondary rounded-full overflow-hidden">
                  <div className="h-full danger-gradient rounded-full" style={{ width: '63%' }} />
                </div>
                <span className="font-medium">63%</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span>{t('solar_panels')} 4</span>
                <div className="w-2/3 h-2 bg-secondary rounded-full overflow-hidden">
                  <div className="h-full success-gradient rounded-full" style={{ width: '79%' }} />
                </div>
                <span className="font-medium">79%</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>{t('attempts')}</CardTitle>
            <CardDescription>{t('security')} {t('alerts')}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center p-2 bg-danger/10 rounded-md">
                <div className="h-2 w-2 rounded-full bg-danger mr-3"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Zone A - {t('rfid_users')} #123</p>
                  <p className="text-xs text-muted-foreground">10 Apr 2025, 14:32</p>
                </div>
                <div className="font-medium text-danger">Alert</div>
              </div>
              
              <div className="flex items-center p-2 bg-secondary rounded-md">
                <div className="h-2 w-2 rounded-full bg-muted-foreground mr-3"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Zone B - {t('rfid_users')} #456</p>
                  <p className="text-xs text-muted-foreground">9 Apr 2025, 09:15</p>
                </div>
                <div className="font-medium text-muted-foreground">OK</div>
              </div>
              
              <div className="flex items-center p-2 bg-danger/10 rounded-md">
                <div className="h-2 w-2 rounded-full bg-danger mr-3"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Zone C - {t('rfid_users')} #789</p>
                  <p className="text-xs text-muted-foreground">8 Apr 2025, 23:11</p>
                </div>
                <div className="font-medium text-danger">Alert</div>
              </div>
              
              <div className="flex items-center p-2 bg-secondary rounded-md">
                <div className="h-2 w-2 rounded-full bg-muted-foreground mr-3"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Zone A - {t('rfid_users')} #123</p>
                  <p className="text-xs text-muted-foreground">7 Apr 2025, 12:45</p>
                </div>
                <div className="font-medium text-muted-foreground">OK</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
