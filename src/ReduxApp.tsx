import React from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import store from './redux/store';
import AppWithReload from './AppWithReload';

const ReduxApp: React.FC = () => (
  <ReduxProvider store={store}>
    <AppWithReload />
  </ReduxProvider>
);

export default ReduxApp;
