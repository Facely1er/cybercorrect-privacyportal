import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Shield, User, Settings, LogOut, Home, Database, Eye, UserCheck, FileText, HelpCircle } from 'lucide-react';
import { ThemeToggle } from '../ui/ThemeToggle';
import { NotificationDropdown } from '../notifications/NotificationDropdown';
import { useUser } from '../../hooks/useSupabase';
import { useBrand } from '../../hooks/useBrand';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { user, profile } = useUser();
  const { brand } = useBrand();

  // Handle scroll effect for sticky header
  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  const navigation = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Privacy Portal', href: '/privacy', icon: Database },
    { name: 'Exercise Data Rights', href: '/data-rights', icon: Eye },
    { name: 'My Privacy Duties', href: '/stakeholder-duties', icon: UserCheck },
    { name: 'How It Works', href: '/how-it-works', icon: HelpCircle },
  ];

  const isActivePath = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 w-full border-b transition-all duration-300 ${
      isScrolled 
        ? 'bg-background/95 backdrop-blur-md supports-[backdrop-filter]:bg-background/80 shadow-sm border-border/50' 
        : 'bg-background/80 backdrop-blur-sm border-transparent'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo and Brand */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <img 
                src="/logos/cybercorrect-logo.png" 
                alt={brand.logo.alt} 
                className="h-16 w-16"
              />
              <div className="hidden sm:flex sm:flex-col font-bold leading-tight">
                <span className="text-sm">{brand.companyNameWithTM}</span>
                <span className="text-xs font-medium">{brand.tagline}</span>
                <span className="text-xs font-normal text-muted-foreground">by {brand.legal.companyName}</span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActivePath(item.href)
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* Right side actions */}
          <div className="flex items-center space-x-2">
            <ThemeToggle />
            <NotificationDropdown />
            
            {/* User Menu */}
            <div className="relative">
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center space-x-1 p-2 rounded-md text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <User className="w-5 h-5" />
                <span className="hidden sm:inline text-sm">
                  {user ? (profile?.full_name || user.email?.split('@')[0] || 'Account') : 'Account'}
                </span>
              </button>

              {isUserMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-popover border border-border rounded-md shadow-lg py-1 z-50">
                  {user ? (
                    <>
                      <Link
                        to="/profile"
                        className="flex items-center px-4 py-2 text-sm hover:bg-accent transition-colors"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <User className="w-4 h-4 mr-2" />
                        Profile
                      </Link>
                      <Link
                        to="/settings"
                        className="flex items-center px-4 py-2 text-sm hover:bg-accent transition-colors"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <Settings className="w-4 h-4 mr-2" />
                        Settings
                      </Link>
                      <hr className="my-1" />
                      <Link
                        to="/login"
                        className="flex items-center px-4 py-2 text-sm hover:bg-accent transition-colors"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <LogOut className="w-4 h-4 mr-2" />
                        Sign Out
                      </Link>
                    </>
                  ) : (
                    <>
                      <Link
                        to="/login"
                        className="flex items-center px-4 py-2 text-sm hover:bg-accent transition-colors"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <User className="w-4 h-4 mr-2" />
                        Sign In
                      </Link>
                      <Link
                        to="/register"
                        className="flex items-center px-4 py-2 text-sm hover:bg-accent transition-colors"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <FileText className="w-4 h-4 mr-2" />
                        Register
                      </Link>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-border/50 py-3">
            <nav className="flex flex-col space-y-1">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActivePath(item.href)
                        ? 'bg-primary text-primary-foreground'
                        : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};