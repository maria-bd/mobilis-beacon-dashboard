
import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define available languages
export type Language = 'fr' | 'en' | 'ar';

// Define language context type
type LanguageContextType = {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
};

// Create context with default values
const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Translation data
const translations: Record<Language, Record<string, string>> = {
  fr: {
    // Navbar
    'dashboard': 'Tableau de bord',
    'energy': 'Consommation d\'énergie',
    'security': 'Sécurité',
    'material': 'Matériel',
    'users': 'Gestion des utilisateurs',
    
    // Auth
    'welcome': 'Bienvenue chez Mobilis',
    'login': 'Connexion',
    'email': 'Email',
    'password': 'Mot de passe',
    'role': 'Rôle',
    'admin': 'Administrateur',
    'manager': 'Gestionnaire',
    'user': 'Utilisateur',
    'remember': 'Se souvenir de moi',
    'forgot': 'Mot de passe oublié?',
    'signin': 'Se connecter',
    
    // Energy
    'solar_panels': 'Panneaux solaires',
    'temperature': 'Température',
    'rb_cells': 'Cellules RB',
    'frequency': 'Fréquence',
    'consumption': 'Consommation',
    'production': 'Production',
    'efficiency': 'Efficacité',
    
    // Security
    'rfid_users': 'Utilisateurs RFID',
    'alerts': 'Alertes',
    'stats': 'Statistiques',
    'attempts': 'Tentatives (Alertes de vol)',
    
    // Material
    'maintenance': 'Maintenance du matériel',
    'management': 'Gestion du matériel',
    'inventory': 'Inventaire',
    'status': 'Statut',
    
    // User Management
    'manage_users': 'Gestion des utilisateurs',
    'add_user': 'Ajouter un utilisateur',
    'edit_user': 'Modifier un utilisateur',
    'name': 'Nom',
    'active': 'Actif',
    
    // Common
    'settings': 'Paramètres',
    'profile': 'Profil',
    'logout': 'Déconnexion',
    'search': 'Rechercher',
    'notifications': 'Notifications',
    'dark_mode': 'Mode sombre',
    'light_mode': 'Mode clair',
    'language': 'Langue',
    'save': 'Enregistrer',
    'cancel': 'Annuler',
    'submit': 'Soumettre',
    'delete': 'Supprimer',
    'edit': 'Modifier',
    'view': 'Voir',
    'back': 'Retour',
    'next': 'Suivant',
    'previous': 'Précédent',
  },
  en: {
    // Navbar
    'dashboard': 'Dashboard',
    'energy': 'Energy Consumption',
    'security': 'Security',
    'material': 'Material',
    'users': 'User Management',
    
    // Auth
    'welcome': 'Welcome to Mobilis',
    'login': 'Login',
    'email': 'Email',
    'password': 'Password',
    'role': 'Role',
    'admin': 'Administrator',
    'manager': 'Manager',
    'user': 'User',
    'remember': 'Remember me',
    'forgot': 'Forgot password?',
    'signin': 'Sign in',
    
    // Energy
    'solar_panels': 'Solar Panels',
    'temperature': 'Temperature',
    'rb_cells': 'RB Cells',
    'frequency': 'Frequency',
    'consumption': 'Consumption',
    'production': 'Production',
    'efficiency': 'Efficiency',
    
    // Security
    'rfid_users': 'RFID Users',
    'alerts': 'Alerts',
    'stats': 'Statistics',
    'attempts': 'Attempts (Theft Alerts)',
    
    // Material
    'maintenance': 'Material Maintenance',
    'management': 'Material Management',
    'inventory': 'Inventory',
    'status': 'Status',
    
    // User Management
    'manage_users': 'Manage Users',
    'add_user': 'Add User',
    'edit_user': 'Edit User',
    'name': 'Name',
    'active': 'Active',
    
    // Common
    'settings': 'Settings',
    'profile': 'Profile',
    'logout': 'Logout',
    'search': 'Search',
    'notifications': 'Notifications',
    'dark_mode': 'Dark Mode',
    'light_mode': 'Light Mode',
    'language': 'Language',
    'save': 'Save',
    'cancel': 'Cancel',
    'submit': 'Submit',
    'delete': 'Delete',
    'edit': 'Edit',
    'view': 'View',
    'back': 'Back',
    'next': 'Next',
    'previous': 'Previous',
  },
  ar: {
    // Navbar
    'dashboard': 'لوحة القيادة',
    'energy': 'استهلاك الطاقة',
    'security': 'الأمان',
    'material': 'المواد',
    'users': 'إدارة المستخدمين',
    
    // Auth
    'welcome': 'مرحبًا بك في موبيليس',
    'login': 'تسجيل الدخول',
    'email': 'البريد الإلكتروني',
    'password': 'كلمة المرور',
    'role': 'الدور',
    'admin': 'مسؤول',
    'manager': 'مدير',
    'user': 'مستخدم',
    'remember': 'تذكرني',
    'forgot': 'نسيت كلمة المرور؟',
    'signin': 'تسجيل الدخول',
    
    // Energy
    'solar_panels': 'الألواح الشمسية',
    'temperature': 'درجة الحرارة',
    'rb_cells': 'خلايا RB',
    'frequency': 'التردد',
    'consumption': 'الاستهلاك',
    'production': 'الإنتاج',
    'efficiency': 'الكفاءة',
    
    // Security
    'rfid_users': 'مستخدمو RFID',
    'alerts': 'التنبيهات',
    'stats': 'الإحصائيات',
    'attempts': 'المحاولات (تنبيهات السرقة)',
    
    // Material
    'maintenance': 'صيانة المواد',
    'management': 'إدارة المواد',
    'inventory': 'المخزون',
    'status': 'الحالة',
    
    // User Management
    'manage_users': 'إدارة المستخدمين',
    'add_user': 'إضافة مستخدم',
    'edit_user': 'تعديل المستخدم',
    'name': 'الاسم',
    'active': 'نشط',
    
    // Common
    'settings': 'الإعدادات',
    'profile': 'الملف الشخصي',
    'logout': 'تسجيل الخروج',
    'search': 'بحث',
    'notifications': 'الإشعارات',
    'dark_mode': 'الوضع المظلم',
    'light_mode': 'الوضع المضيء',
    'language': 'اللغة',
    'save': 'حفظ',
    'cancel': 'إلغاء',
    'submit': 'إرسال',
    'delete': 'حذف',
    'edit': 'تعديل',
    'view': 'عرض',
    'back': 'رجوع',
    'next': 'التالي',
    'previous': 'السابق',
  }
};

// Provider component
export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('fr');

  // Translation function
  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Custom hook for using the language context
export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
