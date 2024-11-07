import React, { useEffect } from 'react';
import { RootState } from './redux/store';
import App from '../App';
import { loadUser } from './redux/slides/authSlice';
import { useAppDispatch , useAppSelector} from './redux';

const AppWithReload: React.FC = () => {
  const reloadKey = useAppSelector((state: RootState) => state.app.reloadKey);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  return (
      <App key={reloadKey} />
  );
};

export default AppWithReload;
