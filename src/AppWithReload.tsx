import React, { useEffect } from 'react';
import { RootState } from './redux/store';
import App from '../App';
import { loadUser } from './redux/slides/authSlice';
import { useAppDispatch, useAppSelector } from './redux';
import { useSplashLoading } from './context/SplashLoadingContext';

const AppWithReload: React.FC = () => {
  const reloadKey = useAppSelector((state: RootState) => state.app.reloadKey);
  const dispatch = useAppDispatch();
  const { setSplashLoading } = useSplashLoading(); 

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  useEffect(() => {
    setSplashLoading(true);
  }, [reloadKey, setSplashLoading]);

  return (
    <App key={reloadKey} />
  );
};

export default AppWithReload;