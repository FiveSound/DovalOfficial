import React, { createContext, useState, ReactNode, useEffect } from 'react';

type Tab = 'Feed' | 'ChatIa' | 'Home' | 'Portal' | 'Profile';

interface ActiveTabContextProps {
  activeTab: Tab;
  setActiveTab: (tab: Tab) => void;
}

export const ActiveTabContext = createContext<ActiveTabContextProps>({
  activeTab: 'Feed',
  setActiveTab: () => {},
});

interface ProviderProps {
  children: ReactNode;
}

export const ActiveTabProvider = ({ children }: ProviderProps) => {
  const [activeTab, setActiveTabState] = useState<Tab>('Feed');

  const setActiveTab = (tab: Tab) => {
    setActiveTabState(tab);
  };

  useEffect(() => {
  }, [activeTab]);

  return (
    <ActiveTabContext.Provider value={{ activeTab, setActiveTab }}>
      {children}
    </ActiveTabContext.Provider>
  );
};