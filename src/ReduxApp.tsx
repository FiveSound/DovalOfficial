import React from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import App from '../App';
import { store } from './redux';


const ReduxApp: React.FC = () => (
  <ReduxProvider store={store}>
            <App />
  </ReduxProvider>
);

export default ReduxApp;