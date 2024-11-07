import React, { createContext, useState, ReactNode } from 'react';

interface TabBarVisibilityContextProps {
  isTabBarVisible: boolean;
  setTabBarVisible: (visible: boolean) => void;
}

export const TabBarVisibilityContext = createContext<TabBarVisibilityContextProps>({
  isTabBarVisible: true,
  setTabBarVisible: () => {},
});

export const TabBarVisibilityProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isTabBarVisible, setTabBarVisible] = useState<boolean>(true);

  return (
    <TabBarVisibilityContext.Provider value={{ isTabBarVisible, setTabBarVisible }}>
      {children}
    </TabBarVisibilityContext.Provider>
  );
};