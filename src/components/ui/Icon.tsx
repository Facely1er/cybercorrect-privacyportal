import React from 'react';

// Import only the icons we actually use to reduce bundle size
import {
  User,
  Settings,
  LogOut,
  Home,
  Database,
  Eye,
  UserCheck,
  FileText,
  HelpCircle,
  Menu,
  X,
  Bell,
  Moon,
  Sun,
  Monitor,
  Shield,
  Users,
  Building,
  AlertTriangle,
  CheckCircle,
  Clock,
  BarChart3,
  TrendingUp,
  ArrowRight,
  Calendar,
  Lock,
  Info,
  AlertCircle,
  ChevronDown,
  ChevronRight,
  Zap,
  Mail,
  Phone,
  PanelLeftClose,
  PanelLeftOpen,
  Edit,
  Trash2,
  Download,
  Globe,
  RefreshCw
} from 'lucide-react';

// Create a mapping of icon names to components
const iconMap = {
  user: User,
  settings: Settings,
  'log-out': LogOut,
  home: Home,
  database: Database,
  eye: Eye,
  'user-check': UserCheck,
  'file-text': FileText,
  'help-circle': HelpCircle,
  menu: Menu,
  x: X,
  bell: Bell,
  moon: Moon,
  sun: Sun,
  monitor: Monitor,
  shield: Shield,
  users: Users,
  building: Building,
  'alert-triangle': AlertTriangle,
  'check-circle': CheckCircle,
  clock: Clock,
  'bar-chart-3': BarChart3,
  'trending-up': TrendingUp,
  'arrow-right': ArrowRight,
  calendar: Calendar,
  lock: Lock,
  info: Info,
  'alert-circle': AlertCircle,
  'chevron-down': ChevronDown,
  'chevron-right': ChevronRight,
  zap: Zap,
  mail: Mail,
  phone: Phone,
  'panel-left-close': PanelLeftClose,
  'panel-left-open': PanelLeftOpen,
  edit: Edit,
  'trash-2': Trash2,
  download: Download,
  globe: Globe,
  'refresh-cw': RefreshCw
} as const;

type IconName = keyof typeof iconMap;

interface IconProps {
  name: IconName;
  className?: string;
  size?: number;
  [key: string]: any;
}

export function Icon({ name, className = '', size = 16, ...props }: IconProps) {
  const IconComponent = iconMap[name];
  
  if (!IconComponent) {
    console.warn(`Icon "${name}" not found`);
    return null;
  }

  return (
    <IconComponent 
      className={className} 
      size={size} 
      {...props} 
    />
  );
}

// Export individual icons for backward compatibility
export {
  User,
  Settings,
  LogOut,
  Home,
  Database,
  Eye,
  UserCheck,
  FileText,
  HelpCircle,
  Menu,
  X,
  Bell,
  Moon,
  Sun,
  Monitor,
  Shield,
  Users,
  Building,
  AlertTriangle,
  CheckCircle,
  Clock,
  BarChart3,
  TrendingUp,
  ArrowRight,
  Calendar,
  Lock,
  Info,
  AlertCircle,
  ChevronDown,
  ChevronRight,
  Zap,
  Mail,
  Phone,
  PanelLeftClose,
  PanelLeftOpen,
  Edit,
  Trash2,
  Download,
  Globe,
  RefreshCw
};