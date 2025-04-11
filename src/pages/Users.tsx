import React, { useEffect, useState } from 'react';
import { api } from '@/services/api';
import { useLanguage } from '@/context/LanguageContext';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
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
  const [newUser, setNewUser] = useState<Omit<User, 'id'>>({
    first_name: '',
    last_name: '',
    email: '',
    is_active: true,
    is_superuser: false,
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

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

  const handleCreateOrUpdateUser = async () => {
    try {
      if (isEditing && editingId !== null) {
        const updated = await api.users.updateUser(editingId.toString(), newUser);
        setUsersData(usersData.map((u) => (u.id === editingId ? updated : u)));
        toast({ title: 'User updated successfully!', variant: 'success' });
      } else {
        const created = await api.users.createUser(newUser);
        setUsersData([...usersData, created]);
        toast({ title: 'User created successfully!', variant: 'success' });
      }

      setNewUser({ first_name: '', last_name: '', email: '', is_active: true, is_superuser: false });
      setIsModalOpen(false);
      setIsEditing(false);
      setEditingId(null);
    } catch (error) {
      toast({ title: isEditing ? 'Error updating user!' : 'Error creating user!', variant: 'destructive' });
      console.error("Error:", error);
    }
  };

  const handleDeleteUser = async (id: number) => {
    try {
      await api.users.deleteUser(id.toString());
      setUsersData(usersData.filter((user) => user.id !== id));
      toast({ title: 'User deleted successfully!', variant: 'success' });
    } catch (error) {
      toast({ title: 'Error deleting user!', variant: 'destructive' });
      console.error("Error deleting user:", error);
    }
  };

  const openEditModal = (user: User) => {
    setNewUser({
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
      is_active: user.is_active,
      is_superuser: user.is_superuser,
    });
    setEditingId(user.id);
    setIsEditing(true);
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">{t('users')}</h1>

        <Dialog open={isModalOpen} onOpenChange={(val) => {
          setIsModalOpen(val);
          if (!val) {
            setNewUser({ first_name: '', last_name: '', email: '', is_active: true, is_superuser: false });
            setIsEditing(false);
            setEditingId(null);
          }
        }}>
          <DialogTrigger asChild>
            <Button className="success-gradient">
              <Plus className="mr-2 h-4 w-4" />
              {t('add_user')}
            </Button>
          </DialogTrigger>

          <DialogContent>
            <DialogHeader>
              <DialogTitle>{isEditing ? t('edit_user') : t('add_new_user')}</DialogTitle>
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
              <Button onClick={handleCreateOrUpdateUser}>
                {isEditing ? t('update') : t('create')}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

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
              <TableCell>{user.id}</TableCell>
              <TableCell>{user.first_name}</TableCell>
              <TableCell>{user.last_name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>
                <Badge variant={user.is_active ? 'default' : 'secondary'}>
                  {user.is_active ? t('active') : t('inactive')}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge variant={user.is_superuser ? 'default' : 'secondary'}>
                  {user.is_superuser ? t('superuser') : t('regular_user')}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <Button variant="outline" size="icon" onClick={() => openEditModal(user)}>
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon" className="text-danger" onClick={() => handleDeleteUser(user.id)}>
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
