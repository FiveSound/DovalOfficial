import React from 'react';
import { Provider } from 'react-redux';
import App from '../App';
import { store } from './redux';

const ReduxApp: React.FC = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

export default ReduxApp;