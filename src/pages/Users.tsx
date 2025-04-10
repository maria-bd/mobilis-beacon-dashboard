import React, { useEffect, useState } from 'react';
import { api } from '@/services/api';
import { useLanguage } from '@/context/LanguageContext';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

// Modal or Form to add a user
import { Input } from '@/components/ui/input';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';

type User = {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  is_active: boolean;
  is_superuser: boolean;
};

const Users = () => {
  const { t } = useLanguage();
  const [usersData, setUsersData] = useState<User[]>([]);
  const [newUser, setNewUser] = useState({ first_name: '', last_name: '', email: '', is_active: true, is_superuser: false });
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch users when the component mounts
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await api.users.getAllUsers();
        setUsersData(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  // Handle user creation
  const handleCreateUser = async () => {
    try {
      const user = await api.users.createUser(newUser);
      setUsersData([...usersData, user]);
      toast({ title: 'User created successfully!', variant: 'success' });
      setIsModalOpen(false); // Close the modal after creation
    } catch (error) {
      toast({ title: 'Error creating user!', variant: 'destructive' });
      console.error("Error creating user:", error);
    }
  };

  // Handle user deletion
  const handleDeleteUser = async (id: number) => {
    try {
      await api.users.deleteUser(id.toString());
      setUsersData(usersData.filter((user) => user.id !== id)); // Remove the user from the state
      toast({ title: 'User deleted successfully!', variant: 'success' });
    } catch (error) {
      toast({ title: 'Error deleting user!', variant: 'destructive' });
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">{t('users')}</h1>

        {/* Add user button */}
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogTrigger asChild>
            <Button className="success-gradient">
              <Plus className="mr-2 h-4 w-4" />
              {t('add_user')}
            </Button>
          </DialogTrigger>

          {/* Dialog content to add a user */}
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{t('add_new_user')}</DialogTitle>
            </DialogHeader>

            <div className="space-y-4">
              <div>
                <Label>{t('first_name')}</Label>
                <Input
                  value={newUser.first_name}
                  onChange={(e) => setNewUser({ ...newUser, first_name: e.target.value })}
                />
              </div>
              <div>
                <Label>{t('last_name')}</Label>
                <Input
                  value={newUser.last_name}
                  onChange={(e) => setNewUser({ ...newUser, last_name: e.target.value })}
                />
              </div>
              <div>
                <Label>{t('email')}</Label>
                <Input
                  value={newUser.email}
                  onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                />
              </div>
              <div>
                <Label>{t('is_active')}</Label>
                <Input
                  type="checkbox"
                  checked={newUser.is_active}
                  onChange={(e) => setNewUser({ ...newUser, is_active: e.target.checked })}
                />
              </div>
              <div>
                <Label>{t('is_superuser')}</Label>
                <Input
                  type="checkbox"
                  checked={newUser.is_superuser}
                  onChange={(e) => setNewUser({ ...newUser, is_superuser: e.target.checked })}
                />
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setIsModalOpen(false)}>
                {t('cancel')}
              </Button>
              <Button onClick={handleCreateUser}>{t('create')}</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Table to display users */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>{t('id')}</TableHead>
            <TableHead>{t('First Name')}</TableHead>
            <TableHead>{t('last name')}</TableHead>
            <TableHead>{t('email')}</TableHead>
            <TableHead>{t('status')}</TableHead>
            <TableHead>{t('is superuser')}</TableHead>
            <TableHead>{t('actions')}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {usersData.map((user) => (
            <TableRow key={user.id}>
              <TableCell className="font-medium">{user.id}</TableCell>
              <TableCell>{user.first_name}</TableCell>
              <TableCell>{user.last_name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>
                <Badge
                  variant={user.is_active ? 'default' : 'secondary'}
                  className={user.is_active ? 'bg-success' : 'bg-muted'}
                >
                  {user.is_active ? t('active') : t('inactive')}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge
                  variant={user.is_superuser ? 'default' : 'secondary'}
                  className={user.is_superuser ? 'bg-success' : 'bg-muted'}
                >
                  {user.is_superuser ? t('superuser') : t('regular_user')}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  {/* Edit Button */}
                  <Button variant="outline" size="icon">
                    <Pencil className="h-4 w-4" />
                  </Button>
                  {/* Delete Button */}
                  <Button
                    variant="outline"
                    size="icon"
                    className="text-danger"
                    onClick={() => handleDeleteUser(user.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Users;