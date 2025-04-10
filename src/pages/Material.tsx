
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useLanguage } from '@/context/LanguageContext';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

const Material = () => {
  const { t } = useLanguage();
  
  // Mock data for material maintenance
  const maintenanceData = [
    { 
      id: 'EQ-001', 
      name: 'Solar Panel Array A', 
      lastMaintenance: '15 Mar 2025', 
      nextMaintenance: '15 Jun 2025', 
      status: 'good',
      progress: 70
    },
    { 
      id: 'EQ-002', 
      name: 'Inverter System', 
      lastMaintenance: '01 Apr 2025', 
      nextMaintenance: '01 Jul 2025', 
      status: 'good',
      progress: 80
    },
    { 
      id: 'EQ-003', 
      name: 'Battery Storage Unit', 
      lastMaintenance: '10 Feb 2025', 
      nextMaintenance: '10 May 2025', 
      status: 'attention',
      progress: 25
    },
    { 
      id: 'EQ-004', 
      name: 'Monitoring Station', 
      lastMaintenance: '22 Mar 2025', 
      nextMaintenance: '22 Jun 2025', 
      status: 'good',
      progress: 65
    },
    { 
      id: 'EQ-005', 
      name: 'RFID Security System', 
      lastMaintenance: '05 Jan 2025', 
      nextMaintenance: '05 Apr 2025', 
      status: 'urgent',
      progress: 5
    },
  ];
  
  // Mock data for inventory management
  const inventoryData = [
    { id: 'INV-001', name: 'Solar Panels (250W)', stock: 15, minStock: 5, status: 'good' },
    { id: 'INV-002', name: 'Battery Cells', stock: 8, minStock: 10, status: 'low' },
    { id: 'INV-003', name: 'Inverter Components', stock: 3, minStock: 5, status: 'low' },
    { id: 'INV-004', name: 'Mounting Hardware', stock: 25, minStock: 15, status: 'good' },
    { id: 'INV-005', name: 'RFID Cards', stock: 50, minStock: 20, status: 'good' },
  ];
  
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">{t('material')}</h1>
      
      <Tabs defaultValue="maintenance" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="maintenance">{t('maintenance')}</TabsTrigger>
          <TabsTrigger value="management">{t('management')}</TabsTrigger>
        </TabsList>
        
        <TabsContent value="maintenance" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>{t('maintenance')}</CardTitle>
              <CardDescription>{t('equipment')} {t('maintenance')} {t('schedule')}</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{t('id')}</TableHead>
                    <TableHead>{t('name')}</TableHead>
                    <TableHead>{t('last_maintenance')}</TableHead>
                    <TableHead>{t('next_maintenance')}</TableHead>
                    <TableHead>{t('status')}</TableHead>
                    <TableHead>{t('time_left')}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {maintenanceData.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.id}</TableCell>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>{item.lastMaintenance}</TableCell>
                      <TableCell>{item.nextMaintenance}</TableCell>
                      <TableCell>
                        <Badge 
                          className={
                            item.status === 'good' 
                              ? 'bg-success' 
                              : item.status === 'attention' 
                                ? 'bg-amber-500' 
                                : 'bg-danger'
                          }
                        >
                          {item.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="w-[200px]">
                        <Progress 
                          value={item.progress} 
                          className={
                            item.status === 'good' 
                              ? 'bg-muted' 
                              : item.status === 'attention' 
                                ? 'bg-amber-200' 
                                : 'bg-danger/20'
                          }
                          indicatorClassName={
                            item.status === 'good' 
                              ? 'bg-success' 
                              : item.status === 'attention' 
                                ? 'bg-amber-500' 
                                : 'bg-danger'
                          }
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="management" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>{t('management')}</CardTitle>
              <CardDescription>{t('inventory')} {t('management')}</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{t('id')}</TableHead>
                    <TableHead>{t('name')}</TableHead>
                    <TableHead>{t('stock')}</TableHead>
                    <TableHead>{t('min_stock')}</TableHead>
                    <TableHead>{t('status')}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {inventoryData.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.id}</TableCell>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>{item.stock}</TableCell>
                      <TableCell>{item.minStock}</TableCell>
                      <TableCell>
                        <Badge 
                          className={item.status === 'good' ? 'bg-success' : 'bg-danger'}
                        >
                          {item.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-2xl">101</CardTitle>
                    <CardDescription>{t('total_items')}</CardDescription>
                  </CardHeader>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-2xl">3</CardTitle>
                    <CardDescription>{t('low_stock_items')}</CardDescription>
                  </CardHeader>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-2xl">5</CardTitle>
                    <CardDescription>{t('pending_orders')}</CardDescription>
                  </CardHeader>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-2xl">12</CardTitle>
                    <CardDescription>{t('recent_updates')}</CardDescription>
                  </CardHeader>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Material;
