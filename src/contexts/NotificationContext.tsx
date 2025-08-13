import React, { createContext, useContext, useState, useCallback } from 'react';

export interface Notification {
  id?: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
  timestamp: number;
  read: boolean;
  category: 'system' | 'privacy' | 'compliance' | 'data_rights';
  action?: {
    label: string;
    onClick: () => void;
  };
}

interface NotificationContextType {
  notifications: Notification[];
  addNotification: (notification: Notification) => void;
  removeNotification: (id: string) => void;
  markAsRead: (id: string) => void;
  clearAll: () => void;
  unreadCount: number;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export function NotificationProvider({ children }: { children: React.ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const addNotification = useCallback((notification: Notification) => {
    const id = notification.id || Date.now().toString();
    const newNotification = { ...notification, id };
    setNotifications(prev => [newNotification, ...prev]);
    
    // Auto-remove success notifications after 5 seconds
    if (notification.type === 'success') {
      setTimeout(() => {
        removeNotification(id);
      }, 5000);
    }
  }, []);

  const removeNotification = useCallback((id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  }, []);

  const markAsRead = useCallback((id: string) => {
    setNotifications(prev => prev.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  }, []);

  const clearAll = useCallback(() => {
    setNotifications([]);
  }, []);

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <NotificationContext.Provider value={{
      notifications,
      addNotification,
      removeNotification,
      markAsRead,
      clearAll,
      unreadCount
    }}>
      {children}
    </NotificationContext.Provider>
  );
}

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within NotificationProvider');
  }
  return context;
};

export const createNotification = {
  dataReset: (): Notification => ({
    type: 'info',
    title: 'Demo Data Reset',
    message: 'All demo data has been cleared from your account',
    timestamp: Date.now(),
    read: false,
    category: 'system'
  }),
  dataRightsRequest: (type: string): Notification => ({
    type: 'success',
    title: 'Data Rights Request Submitted',
    message: `Your ${type} request has been submitted successfully`,
    timestamp: Date.now(),
    read: false,
    category: 'data_rights'
  }),
  privacyIncident: (): Notification => ({
    type: 'warning',
    title: 'Privacy Incident Reported',
    message: 'Your privacy incident report has been submitted',
    timestamp: Date.now(),
    read: false,
    category: 'privacy'
  })
};