// components/UploadButton.tsx
import React, { useRef, ChangeEvent } from 'react';

type UploadButtonProps = {
  onFileSelect: (file: File) => void;
  children: React.ReactNode;
  className?: string;
};

const UploadButton: React.FC<UploadButtonProps> = ({ onFileSelect, children, className }) => {
  // Référence vers l'élément input de type file
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  
  // Fonction pour déclencher le clic sur l'input file
  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };
  
  // Fonction pour gérer la sélection de fichier
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files?.[0]) {
      onFileSelect(files[0]);
    }
  };
  
  return (
    <div>
      <button className={className} type="button" onClick={handleButtonClick}>
        {children}
      </button>
      {/* Input file caché */}
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />
    </div>
  );
};

export default UploadButton;
