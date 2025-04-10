
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useLanguage } from '@/context/LanguageContext';
import { Line, LineChart, Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { useToast } from '@/hooks/use-toast';
import { useQuery } from '@tanstack/react-query';

// API service for fetching energy data
const fetchEnergyData = async () => {
  try {
    // This would be replaced with your actual API endpoint
    const response = await fetch('https://api.example.com/energy/solar');
    if (!response.ok) throw new Error('Failed to fetch solar data');
    return response.json();
  } catch (error) {
    console.error('Error fetching solar data:', error);
    throw error;
  }
};

const fetchTemperatureData = async () => {
  try {
    const response = await fetch('https://api.example.com/energy/temperature');
    if (!response.ok) throw new Error('Failed to fetch temperature data');
    return response.json();
  } catch (error) {
    console.error('Error fetching temperature data:', error);
    throw error;
  }
};

const fetchRbCellsData = async () => {
  try {
    const response = await fetch('https://api.example.com/energy/rbcells');
    if (!response.ok) throw new Error('Failed to fetch RB cells data');
    return response.json();
  } catch (error) {
    console.error('Error fetching RB cells data:', error);
    throw error;
  }
};

const fetchFrequencyData = async () => {
  try {
    const response = await fetch('https://api.example.com/energy/frequency');
    if (!response.ok) throw new Error('Failed to fetch frequency data');
    return response.json();
  } catch (error) {
    console.error('Error fetching frequency data:', error);
    throw error;
  }
};

const Energy = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  
  // Use React Query to fetch data
  const { data: solarData = [], isLoading: isLoadingSolar, error: solarError } = useQuery({
    queryKey: ['energySolar'],
    queryFn: fetchEnergyData,
  });
  
  const { data: temperatureData = [], isLoading: isLoadingTemp } = useQuery({
    queryKey: ['energyTemperature'],
    queryFn: fetchTemperatureData,
  });
  
  const { data: rbCellsData = [], isLoading: isLoadingRbCells } = useQuery({
    queryKey: ['energyRbCells'],
    queryFn: fetchRbCellsData,
  });
  
  const { data: frequencyData = [], isLoading: isLoadingFrequency } = useQuery({
    queryKey: ['energyFrequency'],
    queryFn: fetchFrequencyData,
  });
  
  // Show error toast if any fetch fails
  useEffect(() => {
    if (solarError) {
      toast({
        title: t('error'),
        description: t('failed_to_load_data'),
        variant: "destructive",
      });
    }
  }, [solarError, toast, t]);
  
  // Mock data as fallback if API fails or for development
  const fallbackSolarData = [
    { time: '06:00', output: 0.2, temp: 18 },
    { time: '08:00', output: 1.2, temp: 22 },
    { time: '10:00', output: 2.5, temp: 26 },
    { time: '12:00', output: 3.2, temp: 30 },
    { time: '14:00', output: 3.0, temp: 32 },
    { time: '16:00', output: 2.0, temp: 28 },
    { time: '18:00', output: 0.8, temp: 24 },
    { time: '20:00', output: 0.1, temp: 20 },
  ];
  
  const fallbackRbCellsData = [
    { name: 'Cell A', charge: 85 },
    { name: 'Cell B', charge: 92 },
    { name: 'Cell C', charge: 78 },
    { name: 'Cell D', charge: 89 },
    { name: 'Cell E', charge: 94 },
    { name: 'Cell F', charge: 63 },
  ];
  
  const fallbackFrequencyData = [
    { time: '00:00', value: 50.1 },
    { time: '03:00', value: 49.9 },
    { time: '06:00', value: 50.0 },
    { time: '09:00', value: 50.2 },
    { time: '12:00', value: 50.1 },
    { time: '15:00', value: 49.8 },
    { time: '18:00', value: 50.0 },
    { time: '21:00', value: 50.1 },
  ];
  
  // Use the API data if available, otherwise use the fallback data
  const displaySolarData = solarData.length > 0 ? solarData : fallbackSolarData;
  const displayTempData = temperatureData.length > 0 ? temperatureData : fallbackSolarData;
  const displayRbCellsData = rbCellsData.length > 0 ? rbCellsData : fallbackRbCellsData;
  const displayFrequencyData = frequencyData.length > 0 ? frequencyData : fallbackFrequencyData;
  
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">{t('energy')}</h1>
      
      <Tabs defaultValue="solar" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="solar">{t('solar_panels')}</TabsTrigger>
          <TabsTrigger value="temperature">{t('temperature')}</TabsTrigger>
          <TabsTrigger value="rbcells">{t('rb_cells')}</TabsTrigger>
          <TabsTrigger value="frequency">{t('frequency')}</TabsTrigger>
        </TabsList>
        
        <TabsContent value="solar" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>{t('solar_panels')} {t('stats')}</CardTitle>
              <CardDescription>{t('consumption')} & {t('production')}</CardDescription>
            </CardHeader>
            <CardContent>
              {isLoadingSolar ? (
                <div className="flex justify-center items-center h-[300px]">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                </div>
              ) : (
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={displaySolarData}>
                    <XAxis dataKey="time" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip />
                    <Line 
                      yAxisId="left"
                      type="monotone" 
                      dataKey="output" 
                      stroke="#2da836" 
                      strokeWidth={2} 
                      name={t('production')}
                    />
                    <Line 
                      yAxisId="right"
                      type="monotone" 
                      dataKey="temp" 
                      stroke="#d7242d" 
                      strokeWidth={2} 
                      name={t('temperature')}
                    />
                  </LineChart>
                </ResponsiveContainer>
              )}
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-2xl">3.2 kW</CardTitle>
                <CardDescription>{t('production')}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-success">+15% {t('efficiency')}</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-2xl">2.8 kW</CardTitle>
                <CardDescription>{t('consumption')}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-danger">+8% {t('consumption')}</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-2xl">32°C</CardTitle>
                <CardDescription>{t('temperature')}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">+5°C {t('temperature')}</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="temperature" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>{t('temperature')} {t('stats')}</CardTitle>
              <CardDescription>{t('solar_panels')} {t('temperature')}</CardDescription>
            </CardHeader>
            <CardContent>
              {isLoadingTemp ? (
                <div className="flex justify-center items-center h-[300px]">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                </div>
              ) : (
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={displayTempData}>
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip />
                    <Line 
                      type="monotone" 
                      dataKey="temp" 
                      stroke="#d7242d" 
                      strokeWidth={2} 
                      name={t('temperature')}
                    />
                  </LineChart>
                </ResponsiveContainer>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="rbcells" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>{t('rb_cells')} {t('stats')}</CardTitle>
              <CardDescription>{t('rb_cells')} {t('decision')}</CardDescription>
            </CardHeader>
            <CardContent>
              {isLoadingRbCells ? (
                <div className="flex justify-center items-center h-[300px]">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                </div>
              ) : (
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={displayRbCellsData}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar 
                      dataKey="charge" 
                      fill="#2da836" 
                      radius={[4, 4, 0, 0]} 
                      name={t('charge')}
                    />
                  </BarChart>
                </ResponsiveContainer>
              )}
              
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">{t('rb_cells')} {t('decision')}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Cell F</span>
                        <span className="text-danger font-medium">{t('maintenance')}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {t('charge')} level below threshold (63%)
                      </p>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">{t('rb_cells')} {t('status')}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>{t('efficiency')}</span>
                        <span className="font-medium">83.5%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>{t('status')}</span>
                        <span className="text-success font-medium">OK</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="frequency" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>{t('frequency')} {t('stats')}</CardTitle>
              <CardDescription>{t('frequency')} {t('decision')}</CardDescription>
            </CardHeader>
            <CardContent>
              {isLoadingFrequency ? (
                <div className="flex justify-center items-center h-[300px]">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                </div>
              ) : (
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={displayFrequencyData}>
                    <XAxis dataKey="time" />
                    <YAxis domain={[49.5, 50.5]} />
                    <Tooltip />
                    <Line 
                      type="monotone" 
                      dataKey="value" 
                      stroke="#2da836" 
                      strokeWidth={2} 
                      name={t('frequency')}
                    />
                  </LineChart>
                </ResponsiveContainer>
              )}
              
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">{t('frequency')} {t('decision')}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>15:00 - 18:00</span>
                        <span className="text-amber-500 font-medium">{t('monitoring')}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {t('frequency')} dropped to 49.8Hz
                      </p>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">{t('frequency')} {t('status')}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>{t('current')}</span>
                        <span className="font-medium">50.1Hz</span>
                      </div>
                      <div className="flex justify-between">
                        <span>{t('status')}</span>
                        <span className="text-success font-medium">OK</span>
                      </div>
                    </div>
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

export default Energy;
