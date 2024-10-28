import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from './redux/store';
import App from '../App';

const AppWithReload: React.FC = () => {
  const reloadKey = useSelector((state: RootState) => state.app.reloadKey);

  return <App key={reloadKey} />;
};

export default AppWithReload;
