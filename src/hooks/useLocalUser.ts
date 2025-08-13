import { useState, useEffect } from 'react';

interface LocalUser {
  id: string;
  name: string;
  email: string;
  role: string;
  preferences: Record<string, any>;
}

export function useLocalUser() {
  const [localUser, setLocalUser] = useState<LocalUser | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem('local_user');
    if (stored) {
      try {
        setLocalUser(JSON.parse(stored));
      } catch (error) {
        console.error('Error parsing local user data:', error);
        localStorage.removeItem('local_user');
      }
    }
  }, []);

  const saveLocalUser = (userData: LocalUser) => {
    setLocalUser(userData);
    localStorage.setItem('local_user', JSON.stringify(userData));
  };

  const updateLocalUser = (updates: Partial<LocalUser>) => {
    if (localUser) {
      const updatedUser = { ...localUser, ...updates };
      setLocalUser(updatedUser);
      localStorage.setItem('local_user', JSON.stringify(updatedUser));
    }
  };

  const clearLocalUser = () => {
    setLocalUser(null);
    localStorage.removeItem('local_user');
  };

  const saveNewsletterSubscription = (email: string) => {
    const subscriptions = JSON.parse(localStorage.getItem('newsletter_subscriptions') || '[]');
    subscriptions.push({
      email,
      timestamp: new Date().toISOString(),
      userId: localUser?.id || 'anonymous'
    });
    localStorage.setItem('newsletter_subscriptions', JSON.stringify(subscriptions));
  };

  return {
    localUser,
    saveLocalUser,
    updateLocalUser,
    clearLocalUser,
    saveNewsletterSubscription
  };
}