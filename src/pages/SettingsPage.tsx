import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Bell,
  Moon,
  Sun,
  Lock,
  Eye,
  EyeOff,
  LogOut,
  Save,
  Loader2,
  AlertCircle,
  CheckCircle,
  MailIcon,
  BellRing,
  BellOff,
  Laptop
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Breadcrumb } from '../components/ui/Breadcrumb';
import { useUser } from '../hooks/useSupabase';
import { useTheme } from '../components/theme/ThemeProvider';

export function SettingsPage() {
  const { user, profile, signOut, updateProfile, loading: userLoading } = useUser();
  const { theme, setTheme } = useTheme();
  const navigate = useNavigate();
  
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Get current settings from profile or use defaults
  const defaultSettings = {
    notifications: {
      email: true,
      push: true,
      digest: 'daily'
    },
    privacy: {
      profileVisibility: 'institution',
      activityTracking: true
    },
    appearance: {
      theme: theme
    },
    language: 'en'
  };

  const [settings, setSettings] = useState(profile?.settings || defaultSettings);

  // Load settings from profile if available
  React.useEffect(() => {
    if (profile?.settings) {
      setSettings(profile.settings);
    }
  }, [profile]);

  // Handle saving settings
  const handleSaveSettings = async () => {
    if (!user) return;
    
    setIsSaving(true);
    setError(null);
    setSuccess(null);
    
    try {
      const updates = {
        settings,
        updated_at: new Date().toISOString()
      };
      
      const { error } = await updateProfile(updates);
      
      if (error) {
        setError(error.message || 'Failed to update settings');
      } else {
        setSuccess('Settings updated successfully');
        
        // Hide success message after 3 seconds
        setTimeout(() => {
          setSuccess(null);
        }, 3000);
      }
    } catch (err) {
      console.error('Error updating settings:', err);
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleLogout = async () => {
    await signOut();
    navigate('/login');
  };

  // Handle theme change
  const handleThemeChange = (newTheme: 'light' | 'dark' | 'system') => {
    setTheme(newTheme);
    setSettings(prev => ({
      ...prev,
      appearance: {
        ...prev.appearance,
        theme: newTheme
      }
    }));
  };

  // Handle notification toggle
  const handleNotificationToggle = (key: string, value: boolean) => {
    setSettings(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [key]: value
      }
    }));
  };

  // Handle privacy settings toggle
  const handlePrivacyToggle = (key: string, value: boolean | string) => {
    setSettings(prev => ({
      ...prev,
      privacy: {
        ...prev.privacy,
        [key]: value
      }
    }));
  };

  if (userLoading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="flex justify-center items-center h-64">
          <div className="flex flex-col items-center">
            <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
            <p className="text-muted-foreground">Loading settings...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumb />
      
      <div className="max-w-4xl">
        <h1 className="text-3xl font-bold mb-6">Account Settings</h1>
        
        {/* Error/Success Messages */}
        {error && (
          <div className="p-4 mb-6 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-900 rounded-lg">
            <div className="flex items-center gap-2 text-red-700 dark:text-red-400">
              <AlertCircle className="h-4 w-4 flex-shrink-0" />
              <p>{error}</p>
            </div>
          </div>
        )}
        
        {success && (
          <div className="p-4 mb-6 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-900 rounded-lg">
            <div className="flex items-center gap-2 text-green-700 dark:text-green-400">
              <CheckCircle className="h-4 w-4 flex-shrink-0" />
              <p>{success}</p>
            </div>
          </div>
        )}

        <div className="space-y-6">
          {/* Appearance Settings */}
          <div className="bg-white dark:bg-gray-800 rounded-lg border shadow-sm">
            <div className="px-6 py-4 border-b">
              <h2 className="text-xl font-semibold">Theme Settings</h2>
            </div>
            <div className="p-6">
              <div>
                <p className="text-sm text-muted-foreground mb-4">
                  Choose your preferred theme for the application.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button
                    variant={theme === 'light' ? 'default' : 'outline'}
                    onClick={() => handleThemeChange('light')}
                    className="flex flex-col items-center px-6 py-4 h-auto gap-2"
                  >
                    <Sun className="h-6 w-6" />
                    <span>Light</span>
                  </Button>
                  <Button
                    variant={theme === 'dark' ? 'default' : 'outline'}
                    onClick={() => handleThemeChange('dark')}
                    className="flex flex-col items-center px-6 py-4 h-auto gap-2"
                  >
                    <Moon className="h-6 w-6" />
                    <span>Dark</span>
                  </Button>
                  <Button
                    variant={theme === 'system' ? 'default' : 'outline'}
                    onClick={() => handleThemeChange('system')}
                    className="flex flex-col items-center px-6 py-4 h-auto gap-2"
                  >
                    <Laptop className="h-6 w-6" />
                    <span>System</span>
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Notification Settings */}
          <div className="bg-white dark:bg-gray-800 rounded-lg border shadow-sm">
            <div className="px-6 py-4 border-b">
              <h2 className="text-xl font-semibold">Notification Preferences</h2>
            </div>
            <div className="p-6">
              <p className="text-sm text-muted-foreground mb-4">
                Configure how and when you receive notifications.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-full bg-primary-100 dark:bg-primary-900">
                      <MailIcon className="h-5 w-5 text-primary-600 dark:text-primary-300" />
                    </div>
                    <div>
                      <h3 className="font-medium">Email Notifications</h3>
                      <p className="text-sm text-muted-foreground">Receive updates and alerts via email</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={settings.notifications.email}
                        onChange={() => handleNotificationToggle('email', !settings.notifications.email)}
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary-600"></div>
                    </label>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-full bg-primary-100 dark:bg-primary-900">
                      <BellRing className="h-5 w-5 text-primary-600 dark:text-primary-300" />
                    </div>
                    <div>
                      <h3 className="font-medium">Push Notifications</h3>
                      <p className="text-sm text-muted-foreground">Receive in-app notifications</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={settings.notifications.push}
                        onChange={() => handleNotificationToggle('push', !settings.notifications.push)}
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary-600"></div>
                    </label>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-full bg-primary-100 dark:bg-primary-900">
                      <Bell className="h-5 w-5 text-primary-600 dark:text-primary-300" />
                    </div>
                    <div>
                      <h3 className="font-medium">Digest Frequency</h3>
                      <p className="text-sm text-muted-foreground">How often you receive summary emails</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <select 
                      className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-transparent"
                      value={settings.notifications.digest}
                      onChange={(e) => {
                        setSettings(prev => ({
                          ...prev,
                          notifications: {
                            ...prev.notifications,
                            digest: e.target.value
                          }
                        }));
                      }}
                    >
                      <option value="daily">Daily</option>
                      <option value="weekly">Weekly</option>
                      <option value="never">Never</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Privacy Settings */}
          <div className="bg-white dark:bg-gray-800 rounded-lg border shadow-sm">
            <div className="px-6 py-4 border-b">
              <h2 className="text-xl font-semibold">Privacy Settings</h2>
            </div>
            <div className="p-6">
              <p className="text-sm text-muted-foreground mb-4">
                Control your privacy and data sharing preferences.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-full bg-primary-100 dark:bg-primary-900">
                      <Eye className="h-5 w-5 text-primary-600 dark:text-primary-300" />
                    </div>
                    <div>
                      <h3 className="font-medium">Profile Visibility</h3>
                      <p className="text-sm text-muted-foreground">Who can see your profile information</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <select 
                      className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-transparent"
                      value={settings.privacy.profileVisibility}
                      onChange={(e) => handlePrivacyToggle('profileVisibility', e.target.value)}
                    >
                      <option value="private">Only Me</option>
                      <option value="institution">My Institution</option>
                      <option value="public">Public</option>
                    </select>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-full bg-primary-100 dark:bg-primary-900">
                      <Lock className="h-5 w-5 text-primary-600 dark:text-primary-300" />
                    </div>
                    <div>
                      <h3 className="font-medium">Activity Tracking</h3>
                      <p className="text-sm text-muted-foreground">Allow tracking of your learning progress</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={settings.privacy.activityTracking}
                        onChange={() => handlePrivacyToggle('activityTracking', !settings.privacy.activityTracking)}
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary-600"></div>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row justify-between gap-4">
            <Button 
              onClick={handleSaveSettings}
              disabled={isSaving}
              className="flex-1"
            >
              {isSaving ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Save Settings
                </>
              )}
            </Button>
            
            <Button 
              variant="destructive" 
              onClick={handleLogout}
              className="flex-1"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Sign Out
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}