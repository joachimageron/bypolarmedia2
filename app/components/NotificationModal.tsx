"use client";

import React, { useEffect } from 'react';
import {Modal, ModalContent, ModalHeader, ModalBody, Divider} from '@nextui-org/react';

interface NotificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'success' | 'error' | 'info';
  title: string;
  message: string;
}

const NotificationModal: React.FC<NotificationModalProps> = ({ isOpen, onClose, type, title, message }) => {
  let modalColor: string;
  
  switch (type) {
    case 'success':
      modalColor = 'success';
      break;
    case 'error':
      modalColor = 'danger';
      break;
    case 'info':
    default:
      modalColor = 'primary';
      break;
  }
  
  // Optionnel : Fermeture automatique après 4 secondes
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        onClose();
      }, 4000); // 3000 ms = 3 secondes
      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose]);
  
  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onClose}
      placement="top"
      backdrop={"transparent"}
      className={`bg-${modalColor}-500 text-zinc-50`}
    >
      <ModalContent>
        <>
          <ModalHeader className="">{title}</ModalHeader>
          <Divider  />
          <ModalBody className={""}>
            <div className={"bg-success-500 hidden"}></div>
            <div className={"bg-danger-500 hidden"}></div>
            <div className={"bg-primary-500 hidden"}></div>
            <p>{message}</p>
          </ModalBody>
        </>
      </ModalContent>
    </Modal>
  );
};

export default NotificationModal;
