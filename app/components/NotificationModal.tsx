"use client";

import React, { useEffect } from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from '@nextui-org/react';

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
  
  // Optionnel : Fermeture automatique après 3 secondes
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000); // 3000 ms = 3 secondes
      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose]);
  
  return (
    <Modal isOpen={isOpen} onOpenChange={onClose} placement="top" backdrop={"transparent"}>
      <ModalContent>
        <>
          <ModalHeader className="flex flex-col gap-1">{title}</ModalHeader>
          <ModalBody>
            <p>{message}</p>
          </ModalBody>
          <ModalFooter>

          </ModalFooter>
        </>
      </ModalContent>
    </Modal>
  );
};

export default NotificationModal;
