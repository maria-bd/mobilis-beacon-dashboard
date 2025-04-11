import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useLanguage } from '@/context/LanguageContext';
import { Line, LineChart, Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis, Legend, CartesianGrid, Area, AreaChart } from 'recharts';
import { useToast } from '@/hooks/use-toast';
import { useQuery } from '@tanstack/react-query';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';

// API fetch functions with updated endpoints
const fetchEnergyData = async () => {
  try {
    const response = await fetch('https://api.example.com/energy/solar');
    if (!response.ok) throw new Error('Failed to fetch solar data');
    return response.json();
  } catch (error) {
    console.error('Error fetching solar data:', error);
    throw error;
  }
};

const fetchSystemStats = async () => {
  try {
    const response = await fetch('https://api.example.com/energy/system-stats');
    if (!response.ok) throw new Error('Failed to fetch system stats');
    return response.json();
  } catch (error) {
    console.error('Error fetching system stats:', error);
    throw error;
  }
};

const fetchSignalData = async () => {
  try {
    const response = await fetch('https://api.example.com/energy/signal-data');
    if (!response.ok) throw new Error('Failed to fetch signal data');
    return response.json();
  } catch (error) {
    console.error('Error fetching signal data:', error);
    throw error;
  }
};

const fetchFrequencyData = async () => {
  try {
    const response = await fetch('https://api.example.com/energy/frequency-data');
    if (!response.ok) throw new Error('Failed to fetch frequency data');
    return response.json();
  } catch (error) {
    console.error('Error fetching frequency data:', error);
    throw error;
  }
};

// Custom tooltip component for charts
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-4 border rounded-lg shadow-sm">
        <p className="font-medium">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} style={{ color: entry.color }}>
            {entry.name}: {entry.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const Energy = () => {
  const { t } = useLanguage();
  const { toast } = useToast();

  // Queries with refetch interval for real-time data
  const { data: solarData = [], isLoading: isLoadingSolar, error: solarError } = useQuery({
    queryKey: ['energySolar'],
    queryFn: fetchEnergyData,
    refetchInterval: 30000, // 30 seconds
  });

  const { data: systemStatsData = [], isLoading: isLoadingSystemStats } = useQuery({
    queryKey: ['energySystemStats'],
    queryFn: fetchSystemStats,
    refetchInterval: 30000,
  });

  const { data: signalData = [], isLoading: isLoadingSignalData } = useQuery({
    queryKey: ['energySignalData'],
    queryFn: fetchSignalData,
    refetchInterval: 30000,
  });

  const { data: frequencyData = [], isLoading: isLoadingFrequency } = useQuery({
    queryKey: ['energyFrequency'],
    queryFn: fetchFrequencyData,
    refetchInterval: 30000,
  });

  React.useEffect(() => {
    if (solarError) {
      toast({
        title: t('error'),
        description: t('failed_to_load_data'),
        variant: 'destructive',
      });
    }
  }, [solarError, toast, t]);

  // Fallback data remains the same as previous version
  const fallbackSolarData = [
    { time: '06:00', output: 0.2 },
    { time: '08:00', output: 1.2 },
    { time: '10:00', output: 2.5 },
    { time: '12:00', output: 3.2 },
    { time: '14:00', output: 3.0 },
    { time: '16:00', output: 2.0 },
    { time: '18:00', output: 0.8 },
    { time: '20:00', output: 0.1 },
  ];

  const fallbackSystemStatsData = [
    { time: '00:00', indoor_temp: 22.5, humidity: 45, server_load: 30, external_temp: 18, ac_level: 2, fans_active: true },
    { time: '03:00', indoor_temp: 23.1, humidity: 47, server_load: 25, external_temp: 17, ac_level: 1, fans_active: true },
    { time: '06:00', indoor_temp: 21.8, humidity: 50, server_load: 40, external_temp: 16, ac_level: 2, fans_active: false },
    { time: '09:00', indoor_temp: 24.2, humidity: 42, server_load: 65, external_temp: 20, ac_level: 3, fans_active: true },
    { time: '12:00', indoor_temp: 25.7, humidity: 38, server_load: 75, external_temp: 25, ac_level: 4, fans_active: true },
    { time: '15:00', indoor_temp: 26.3, humidity: 35, server_load: 80, external_temp: 28, ac_level: 4, fans_active: true },
    { time: '18:00', indoor_temp: 24.8, humidity: 40, server_load: 60, external_temp: 22, ac_level: 3, fans_active: true },
    { time: '21:00', indoor_temp: 23.5, humidity: 43, server_load: 45, external_temp: 19, ac_level: 2, fans_active: false },
  ];

  const fallbackSignalData = [
    { name: 'Cell A', signal: 85, user_count: 120, traffic_type: '4G', rbs: 4 },
    { name: 'Cell B', signal: 92, user_count: 85, traffic_type: '5G', rbs: 5 },
    { name: 'Cell C', signal: 78, user_count: 150, traffic_type: '4G', rbs: 3 },
    { name: 'Cell D', signal: 89, user_count: 95, traffic_type: '5G', rbs: 4 },
    { name: 'Cell E', signal: 94, user_count: 60, traffic_type: '5G', rbs: 5 },
    { name: 'Cell F', signal: 63, user_count: 200, traffic_type: '3G', rbs: 2 },
  ];

  const fallbackFrequencyData = [
    { time: '00:00', signal: 50.1, users: 120, traffic_type: '4G', freq_used: 45 },
    { time: '03:00', signal: 49.9, users: 80, traffic_type: '4G', freq_used: 40 },
    { time: '06:00', signal: 50.0, users: 150, traffic_type: '3G', freq_used: 35 },
    { time: '09:00', signal: 50.2, users: 200, traffic_type: '5G', freq_used: 60 },
    { time: '12:00', signal: 50.1, users: 250, traffic_type: '5G', freq_used: 65 },
    { time: '15:00', signal: 49.8, users: 220, traffic_type: '4G', freq_used: 50 },
    { time: '18:00', signal: 50.0, users: 180, traffic_type: '4G', freq_used: 45 },
    { time: '21:00', signal: 50.1, users: 130, traffic_type: '5G', freq_used: 55 },
  ];

  const displaySolarData = solarData.length > 0 ? solarData : fallbackSolarData;
  const displaySystemStatsData = systemStatsData.length > 0 ? systemStatsData : fallbackSystemStatsData;
  const displaySignalData = signalData.length > 0 ? signalData : fallbackSignalData;
  const displayFrequencyData = frequencyData.length > 0 ? frequencyData : fallbackFrequencyData;

  // Calculate summary stats for system stats
  const systemSummary = displaySystemStatsData.length > 0 ? {
    avgIndoorTemp: (displaySystemStatsData.reduce((sum, item) => sum + item.indoor_temp, 0) / displaySystemStatsData.length).toFixed(1),
    maxServerLoad: Math.max(...displaySystemStatsData.map(item => item.server_load)),
    avgHumidity: (displaySystemStatsData.reduce((sum, item) => sum + item.humidity, 0) / displaySystemStatsData.length).toFixed(1),
  } : null;

  // Calculate summary stats for signal data
  const signalSummary = displaySignalData.length > 0 ? {
    avgSignal: (displaySignalData.reduce((sum, item) => sum + item.signal, 0) / displaySignalData.length).toFixed(1),
    totalUsers: displaySignalData.reduce((sum, item) => sum + item.user_count, 0),
    avgRbs: (displaySignalData.reduce((sum, item) => sum + item.rbs, 0) / displaySignalData.length).toFixed(1),
  } : null;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">{t('energy')}</h1>
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="bg-green-100 text-green-800">
            {t('live_data')}
          </Badge>
          <span className="text-sm text-muted-foreground">
            {new Date().toLocaleTimeString()}
          </span>
        </div>
      </div>

      <Tabs defaultValue="solar" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="solar">{t('solar_panels')}</TabsTrigger>
          <TabsTrigger value="system">{t('system_stats')}</TabsTrigger>
          <TabsTrigger value="signal">{t('signal_data')}</TabsTrigger>
          <TabsTrigger value="frequency">{t('frequency')}</TabsTrigger>
        </TabsList>

        {/* Solar Panel Tab */}
        <TabsContent value="solar" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>{t('solar_panels')} {t('stats')}</span>
                <Badge variant="secondary" className="ml-2">
                  {displaySolarData.length} {t('data_points')}
                </Badge>
              </CardTitle>
              <CardDescription>{t('solar_output_description')}</CardDescription>
            </CardHeader>
            <CardContent>
              {isLoadingSolar ? (
                <div className="space-y-4">
                  <Skeleton className="h-[300px] w-full" />
                  <div className="grid grid-cols-3 gap-4">
                    <Skeleton className="h-[100px]" />
                    <Skeleton className="h-[100px]" />
                    <Skeleton className="h-[100px]" />
                  </div>
                </div>
              ) : (
                <>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={displaySolarData}>
                        <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                        <XAxis dataKey="time" />
                        <YAxis />
                        <Tooltip content={<CustomTooltip />} />
                        <Legend />
                        <Area 
                          type="monotone" 
                          dataKey="output" 
                          stroke="#fbbf24" 
                          fill="#fde68a" 
                          name={t('output_kw')}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="grid grid-cols-3 gap-4 mt-6">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardDescription>{t('peak_output')}</CardDescription>
                        <CardTitle className="text-3xl">
                          {Math.max(...displaySolarData.map(item => item.output)).toFixed(2)} kW
                        </CardTitle>
                      </CardHeader>
                    </Card>
                    <Card>
                      <CardHeader className="pb-2">
                        <CardDescription>{t('daily_production')}</CardDescription>
                        <CardTitle className="text-3xl">
                          {displaySolarData.reduce((sum, item) => sum + item.output, 0).toFixed(2)} kWh
                        </CardTitle>
                      </CardHeader>
                    </Card>
                    <Card>
                      <CardHeader className="pb-2">
                        <CardDescription>{t('avg_output')}</CardDescription>
                        <CardTitle className="text-3xl">
                          {(displaySolarData.reduce((sum, item) => sum + item.output, 0) / displaySolarData.length).toFixed(2)} kW
                        </CardTitle>
                      </CardHeader>
                    </Card>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* System Stats Tab */}
        <TabsContent value="system" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>{t('system_stats')}</CardTitle>
              <CardDescription>{t('system_monitoring_description')}</CardDescription>
            </CardHeader>
            <CardContent>
              {isLoadingSystemStats ? (
                <div className="space-y-4">
                  <Skeleton className="h-[300px] w-full" />
                  <div className="grid grid-cols-3 gap-4">
                    <Skeleton className="h-[100px]" />
                    <Skeleton className="h-[100px]" />
                    <Skeleton className="h-[100px]" />
                  </div>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-lg font-medium mb-4">{t('temperature')}</h3>
                      <div className="h-[250px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart data={displaySystemStatsData}>
                            <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                            <XAxis dataKey="time" />
                            <YAxis />
                            <Tooltip content={<CustomTooltip />} />
                            <Legend />
                            <Line 
                              type="monotone" 
                              dataKey="indoor_temp" 
                              stroke="#ef4444" 
                              strokeWidth={2} 
                              dot={{ r: 3 }} 
                              name={t('indoor_temp_c')} 
                            />
                            <Line 
                              type="monotone" 
                              dataKey="external_temp" 
                              stroke="#3b82f6" 
                              strokeWidth={2} 
                              dot={{ r: 3 }} 
                              name={t('external_temp_c')} 
                            />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium mb-4">{t('system_load')}</h3>
                      <div className="h-[250px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart data={displaySystemStatsData}>
                            <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                            <XAxis dataKey="time" />
                            <YAxis />
                            <Tooltip content={<CustomTooltip />} />
                            <Legend />
                            <Line 
                              type="monotone" 
                              dataKey="server_load" 
                              stroke="#10b981" 
                              strokeWidth={2} 
                              dot={{ r: 3 }} 
                              name={t('server_load_percent')} 
                            />
                            <Line 
                              type="monotone" 
                              dataKey="humidity" 
                              stroke="#8b5cf6" 
                              strokeWidth={2} 
                              dot={{ r: 3 }} 
                              name={t('humidity_percent')} 
                            />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                  </div>
                  
                  {systemSummary && (
                    <div className="grid grid-cols-3 gap-4 mt-6">
                      <Card>
                        <CardHeader className="pb-2">
                          <CardDescription>{t('avg_indoor_temp')}</CardDescription>
                          <CardTitle className="text-3xl">
                            {systemSummary.avgIndoorTemp}°C
                          </CardTitle>
                        </CardHeader>
                      </Card>
                      <Card>
                        <CardHeader className="pb-2">
                          <CardDescription>{t('max_server_load')}</CardDescription>
                          <CardTitle className="text-3xl">
                            {systemSummary.maxServerLoad}%
                          </CardTitle>
                        </CardHeader>
                      </Card>
                      <Card>
                        <CardHeader className="pb-2">
                          <CardDescription>{t('avg_humidity')}</CardDescription>
                          <CardTitle className="text-3xl">
                            {systemSummary.avgHumidity}%
                          </CardTitle>
                        </CardHeader>
                      </Card>
                    </div>
                  )}
                </>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Signal Data Tab */}
        <TabsContent value="signal" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>{t('signal_data')}</CardTitle>
              <CardDescription>{t('cell_performance_description')}</CardDescription>
            </CardHeader>
            <CardContent>
              {isLoadingSignalData ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Skeleton className="h-[250px]" />
                    <Skeleton className="h-[250px]" />
                  </div>
                  <Skeleton className="h-[100px] w-full" />
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-lg font-medium mb-4">{t('signal_strength')}</h3>
                      <div className="h-[250px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={displaySignalData}>
                            <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip content={<CustomTooltip />} />
                            <Legend />
                            <Bar 
                              dataKey="signal" 
                              fill="#4ade80" 
                              name={t('signal_strength_db')} 
                              radius={[4, 4, 0, 0]}
                            />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium mb-4">{t('user_distribution')}</h3>
                      <div className="h-[250px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={displaySignalData}>
                            <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip content={<CustomTooltip />} />
                            <Legend />
                            <Bar 
                              dataKey="user_count" 
                              fill="#60a5fa" 
                              name={t('user_count')} 
                              radius={[4, 4, 0, 0]}
                            />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                  </div>
                  
                  {signalSummary && (
                    <div className="grid grid-cols-3 gap-4 mt-6">
                      <Card>
                        <CardHeader className="pb-2">
                          <CardDescription>{t('avg_signal')}</CardDescription>
                          <CardTitle className="text-3xl">
                            {signalSummary.avgSignal} dB
                          </CardTitle>
                        </CardHeader>
                      </Card>
                      <Card>
                        <CardHeader className="pb-2">
                          <CardDescription>{t('total_users')}</CardDescription>
                          <CardTitle className="text-3xl">
                            {signalSummary.totalUsers}
                          </CardTitle>
                        </CardHeader>
                      </Card>
                      <Card>
                        <CardHeader className="pb-2">
                          <CardDescription>{t('avg_rbs')}</CardDescription>
                          <CardTitle className="text-3xl">
                            {signalSummary.avgRbs}
                          </CardTitle>
                        </CardHeader>
                      </Card>
                    </div>
                  )}
                  
                  <div className="mt-6">
                    <h3 className="text-lg font-medium mb-4">{t('traffic_distribution')}</h3>
                    <div className="h-[250px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart 
                          data={Object.entries(
                            displaySignalData.reduce((acc, item) => {
                              acc[item.traffic_type] = (acc[item.traffic_type] || 0) + item.user_count;
                              return acc;
                            }, {})
                          ).map(([type, count]) => ({ type, count }))}
                        >
                          <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                          <XAxis dataKey="type" />
                          <YAxis />
                          <Tooltip content={<CustomTooltip />} />
                          <Legend />
                          <Bar 
                            dataKey="count" 
                            fill="#a78bfa" 
                            name={t('user_count')} 
                            radius={[4, 4, 0, 0]}
                          />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Frequency Tab */}
        <TabsContent value="frequency" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>{t('frequency_usage')}</CardTitle>
              <CardDescription>{t('network_usage_description')}</CardDescription>
            </CardHeader>
            <CardContent>
              {isLoadingFrequency ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Skeleton className="h-[250px]" />
                    <Skeleton className="h-[250px]" />
                  </div>
                  <Skeleton className="h-[100px] w-full" />
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-lg font-medium mb-4">{t('signal_quality')}</h3>
                      <div className="h-[250px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart data={displayFrequencyData}>
                            <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                            <XAxis dataKey="time" />
                            <YAxis />
                            <Tooltip content={<CustomTooltip />} />
                            <Legend />
                            <Line 
                              type="monotone" 
                              dataKey="signal" 
                              stroke="#3b82f6" 
                              strokeWidth={2} 
                              dot={{ r: 3 }} 
                              name={t('signal_quality_db')} 
                            />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium mb-4">{t('frequency_usage')}</h3>
                      <div className="h-[250px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart data={displayFrequencyData}>
                            <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                            <XAxis dataKey="time" />
                            <YAxis />
                            <Tooltip content={<CustomTooltip />} />
                            <Legend />
                            <Line 
                              type="monotone" 
                              dataKey="freq_used" 
                              stroke="#ec4899" 
                              strokeWidth={2} 
                              dot={{ r: 3 }} 
                              name={t('frequency_mhz')} 
                            />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <h3 className="text-lg font-medium mb-4">{t('user_distribution')}</h3>
                    <div className="h-[250px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={displayFrequencyData}>
                          <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                          <XAxis dataKey="time" />
                          <YAxis />
                          <Tooltip content={<CustomTooltip />} />
                          <Legend />
                          <Area 
                            type="monotone" 
                            dataKey="users" 
                            stroke="#f59e0b" 
                            fill="#fde68a" 
                            name={t('user_count')} 
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 mt-6">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardDescription>{t('peak_users')}</CardDescription>
                        <CardTitle className="text-3xl">
                          {Math.max(...displayFrequencyData.map(item => item.users))}
                        </CardTitle>
                      </CardHeader>
                    </Card>
                    <Card>
                      <CardHeader className="pb-2">
                        <CardDescription>{t('avg_signal')}</CardDescription>
                        <CardTitle className="text-3xl">
                          {(displayFrequencyData.reduce((sum, item) => sum + item.signal, 0) / displayFrequencyData.length).toFixed(1)} dB
                        </CardTitle>
                      </CardHeader>
                    </Card>
                    <Card>
                      <CardHeader className="pb-2">
                        <CardDescription>{t('avg_freq')}</CardDescription>
                        <CardTitle className="text-3xl">
                          {(displayFrequencyData.reduce((sum, item) => sum + item.freq_used, 0) / displayFrequencyData.length).toFixed(1)} MHz
                        </CardTitle>
                      </CardHeader>
                    </Card>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Energy;