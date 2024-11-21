import React, { createContext, useContext, useState, ReactNode } from 'react';

interface SplashLoadingContextProps {
  isSplashLoading: boolean;
  setSplashLoading: (loading: boolean) => void;
}

const SplashLoadingContext = createContext<SplashLoadingContextProps | undefined>(undefined);

export const SplashLoadingProvider = ({ children }: { children: ReactNode }) => {
  const [isSplashLoading, setSplashLoading] = useState<boolean>(true);

  return (
    <SplashLoadingContext.Provider value={{ isSplashLoading, setSplashLoading }}>
      {children}
    </SplashLoadingContext.Provider>
  );
};

export const useSplashLoading = () => {
  const context = useContext(SplashLoadingContext);
  if (!context) {
    throw new Error('useSplashLoading must be used within a SplashLoadingProvider');
  }
  return context;
};