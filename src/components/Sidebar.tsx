
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '@/context/LanguageContext';
import { ChevronLeft, ChevronRight, LayoutDashboard, Zap, ShieldAlert, Package, Users } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ collapsed, onToggle }) => {
  const { t } = useLanguage();
  const location = useLocation();
  
  const menuItems = [
    { icon: LayoutDashboard, label: 'dashboard', path: '/' },
    { icon: Zap, label: 'energy', path: '/energy' },
    { icon: ShieldAlert, label: 'security', path: '/security' },
    { icon: Package, label: 'material', path: '/material' },
    { icon: Users, label: 'users', path: '/users' },
  ];
  
  return (
    <div 
      className={cn(
        "h-screen bg-sidebar border-r border-sidebar-border flex flex-col transition-all duration-300",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <div className="flex items-center justify-between p-4 border-b border-sidebar-border">
        {!collapsed && (
          <img
          src="/mobilis.png" 
          alt="Mobilis"
          className="h-8 w-auto"/>        )}
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={onToggle}
          className={cn("text-sidebar-foreground", collapsed && "ml-auto")}
        >
          {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </Button>
      </div>
      
      <div className="flex-1 py-4 overflow-y-auto">
        <nav className="px-2 space-y-1">
          {menuItems.map((item) => (
            <Link 
              key={item.path}
              to={item.path} 
              className={cn(
                "flex items-center py-2 px-3 rounded-md transition-colors text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                location.pathname === item.path && "bg-sidebar-accent text-sidebar-accent-foreground font-medium",
                collapsed ? "justify-center" : "justify-start"
              )}
            >
              <item.icon size={20} className={cn(collapsed ? "mx-auto" : "mr-3")} />
              {!collapsed && <span>{t(item.label)}</span>}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
