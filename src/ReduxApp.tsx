import React from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import store from './redux/store';
import AppWithReload from './AppWithReload';
import { SplashLoadingProvider } from './context/SplashLoadingContext';

const ReduxApp: React.FC = () => (
  <ReduxProvider store={store}>
    <SplashLoadingProvider>
      <AppWithReload />
    </SplashLoadingProvider>
  </ReduxProvider>
);

export default ReduxApp;
