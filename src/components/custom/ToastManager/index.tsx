import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react';
import CustomToast from './CustomToast';

type ToastType = 'success' | 'error' | 'info';

type ToastMessage = {
  id: number;
  type: ToastType;
  message: string;
  duration: number;
};

type ToastContextType = {
  showToast: (type: ToastType, message: string, duration?: number) => void;
};

const ToastContext = createContext<ToastContextType | undefined>(undefined);

let toastId = 0;

export const ToastProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [toastQueue, setToastQueue] = useState<ToastMessage[]>([]);
  const [currentToast, setCurrentToast] = useState<ToastMessage | null>(null);

  const processQueue = useCallback(() => {
    if (currentToast || toastQueue.length === 0) return;

    const nextToast = toastQueue[0];
    setCurrentToast(nextToast);
    setToastQueue(prev => prev.slice(1));
  }, [currentToast, toastQueue]);

  const showToast = useCallback((type: ToastType, message: string, duration: number = 3000) => {
    const newToast: ToastMessage = {
      id: toastId++,
      type,
      message,
      duration,
    };
    setToastQueue(prev => [...prev, newToast]);
  }, []);

  const handleHide = useCallback(() => {
    setCurrentToast(null);
  }, []);

  React.useEffect(() => {
    processQueue();
  }, [processQueue, currentToast]);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {currentToast && (
        <CustomToast toast={currentToast} onHide={handleHide} />
      )}
    </ToastContext.Provider>
  );
};

export const useToast = (): ToastContextType => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast debe ser usado dentro de un ToastProvider');
  }
  return context;
};