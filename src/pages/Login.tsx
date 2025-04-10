
import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { useAuth, UserRole } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';
import { useTheme } from '@/context/ThemeContext';
import { Sun, Moon } from 'lucide-react';

const Login = () => {
  const { isAuthenticated, login } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { t, language, setLanguage } = useLanguage();
  const { toast } = useToast();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole>('user');
  const [remember, setRemember] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  // Redirect if already authenticated
  if (isAuthenticated) {
    return <Navigate to="/" />;
  }
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please fill in all required fields",
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      const success = await login(email, password, role);
      
      if (success) {
        toast({
          title: "Success",
          description: "Logged in successfully",
        });
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Invalid credentials",
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "An error occurred during login",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4">
      <div className="absolute top-4 right-4 flex items-center gap-4">
        <Select
          value={language}
          onValueChange={(value) => setLanguage(value as any)}
        >
          <SelectTrigger className="w-[120px]">
            <SelectValue placeholder={language.toUpperCase()} />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="fr">Français</SelectItem>
              <SelectItem value="en">English</SelectItem>
              <SelectItem value="ar">العربية</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        
        <Button variant="ghost" size="icon" onClick={toggleTheme}>
          {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
        </Button>
      </div>
      
      <div className={`mb-8 text-center ${language === 'ar' ? 'rtl' : 'ltr'}`}>
        <h1 className="text-3xl font-bold text-foreground">{t('welcome')}</h1>
      </div>
      
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className={`text-xl ${language === 'ar' ? 'text-right' : 'text-left'}`}>
            {t('login')}
          </CardTitle>
          <CardDescription className={language === 'ar' ? 'text-right' : 'text-left'}>
            {t('signin')}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className={language === 'ar' ? 'text-right block' : 'text-left block'}>
                {t('email')}
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                dir={language === 'ar' ? 'rtl' : 'ltr'}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password" className={language === 'ar' ? 'text-right block' : 'text-left block'}>
                {t('password')}
              </Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                dir={language === 'ar' ? 'rtl' : 'ltr'}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="role" className={language === 'ar' ? 'text-right block' : 'text-left block'}>
                {t('role')}
              </Label>
              <Select
                value={role}
                onValueChange={(value) => setRole(value as UserRole)}
              >
                <SelectTrigger id="role">
                  <SelectValue placeholder={t('role')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="admin">{t('admin')}</SelectItem>
                    <SelectItem value="manager">{t('manager')}</SelectItem>
                    <SelectItem value="user">{t('user')}</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            
            <div className={`flex items-center ${language === 'ar' ? 'justify-end' : 'justify-start'} space-x-2`}>
              <Checkbox 
                id="remember" 
                checked={remember}
                onCheckedChange={(checked) => setRemember(checked as boolean)}
              />
              <Label 
                htmlFor="remember" 
                className="text-sm cursor-pointer"
              >
                {t('remember')}
              </Label>
            </div>
            
            <div className="pt-2">
              <Button type="submit" className="w-full success-gradient" disabled={isLoading}>
                {isLoading ? 'Loading...' : t('signin')}
              </Button>
            </div>
          </form>
        </CardContent>
        <CardFooter className={`flex ${language === 'ar' ? 'justify-start' : 'justify-end'}`}>
          <Button variant="link" className="px-0 text-muted-foreground">
            {t('forgot')}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
