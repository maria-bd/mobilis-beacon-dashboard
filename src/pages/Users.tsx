
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/context/LanguageContext';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Pencil, Plus, Trash2 } from 'lucide-react';

const Users = () => {
  const { t } = useLanguage();
  
  // Mock data for users
  const usersData = [
    { 
      id: 'USR-001', 
      name: 'Jean Dupont', 
      email: 'jean.dupont@mobilis.com', 
      role: 'admin', 
      status: 'active',
      lastLogin: '10 Apr 2025, 09:15'
    },
    { 
      id: 'USR-002', 
      name: 'Marie Martin', 
      email: 'marie.martin@mobilis.com', 
      role: 'manager', 
      status: 'active',
      lastLogin: '10 Apr 2025, 08:30'
    },
    { 
      id: 'USR-003', 
      name: 'Pierre Durand', 
      email: 'pierre.durand@mobilis.com', 
      role: 'user', 
      status: 'active',
      lastLogin: '09 Apr 2025, 16:45'
    },
    { 
      id: 'USR-004', 
      name: 'Sophie Lefebvre', 
      email: 'sophie.lefebvre@mobilis.com', 
      role: 'manager', 
      status: 'active',
      lastLogin: '10 Apr 2025, 07:20'
    },
    { 
      id: 'USR-005', 
      name: 'Thomas Bernard', 
      email: 'thomas.bernard@mobilis.com', 
      role: 'user', 
      status: 'inactive',
      lastLogin: '15 Mar 2025, 14:10'
    },
  ];
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">{t('users')}</h1>
        
        <Button className="success-gradient">
          <Plus className="mr-2 h-4 w-4" />
          {t('add_user')}
        </Button>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>{t('manage_users')}</CardTitle>
          <CardDescription>{t('platform')} {t('users')}</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t('id')}</TableHead>
                <TableHead>{t('name')}</TableHead>
                <TableHead>{t('email')}</TableHead>
                <TableHead>{t('role')}</TableHead>
                <TableHead>{t('last_login')}</TableHead>
                <TableHead>{t('status')}</TableHead>
                <TableHead>{t('actions')}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {usersData.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.id}</TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{t(user.role)}</TableCell>
                  <TableCell>{user.lastLogin}</TableCell>
                  <TableCell>
                    <Badge 
                      variant={user.status === 'active' ? 'default' : 'secondary'}
                      className={user.status === 'active' ? 'bg-success' : 'bg-muted'}
                    >
                      {user.status === 'active' ? t('active') : t('inactive')}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="icon">
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="icon" className="text-danger">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl">5</CardTitle>
            <CardDescription>{t('total')} {t('users')}</CardDescription>
          </CardHeader>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl">1</CardTitle>
            <CardDescription>{t('admin')} {t('users')}</CardDescription>
          </CardHeader>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl">2</CardTitle>
            <CardDescription>{t('manager')} {t('users')}</CardDescription>
          </CardHeader>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl">2</CardTitle>
            <CardDescription>{t('user')} {t('users')}</CardDescription>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
};

export default Users;
