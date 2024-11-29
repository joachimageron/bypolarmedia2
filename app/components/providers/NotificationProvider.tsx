"use client"

import React, { createContext, useContext, useState } from 'react';
import NotificationModal from '@/app/components/NotificationModal';

type NotificationType = 'success' | 'error' | 'info';

interface NotificationModalContextProps {
  showNotification: (type: NotificationType, title: string, message: string) => void;
}

const NotificationModalContext = createContext<NotificationModalContextProps | undefined>(undefined);

export default function  NotificationProvider({ children }: Readonly<{ children: React.ReactNode }> ) {
  const [isOpen, setIsOpen] = useState(false);
  const [notificationType, setNotificationType] = useState<NotificationType>('info');
  const [notificationTitle, setNotificationTitle] = useState('');
  const [notificationMessage, setNotificationMessage] = useState('');
  
  const showNotification = (type: NotificationType, title: string, message: string) => {
    setNotificationType(type);
    setNotificationTitle(title);
    setNotificationMessage(message);
    setIsOpen(true);
  };
  
  const onClose = () => {
    setIsOpen(false);
  };
  
  return (
    <NotificationModalContext.Provider value={{ showNotification }}>
      {children}
      <NotificationModal
        isOpen={isOpen}
        onClose={onClose}
        type={notificationType}
        title={notificationTitle}
        message={notificationMessage}
      />
    </NotificationModalContext.Provider>
  );
};

export const useNotificationModal = () => {
  const context = useContext(NotificationModalContext);
  if (!context) {
    throw new Error('useNotificationModal doit être utilisé à l\'intérieur d\'un NotificationModalProvider');
  }
  return context;
};
