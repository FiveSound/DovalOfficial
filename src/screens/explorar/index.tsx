import { useCallback, useEffect, useState } from 'react';
import LoaderMain from './components/LoaderMain';
import { Main } from './components';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

const Home = () => {
  const { isLoadingApp, user } = useSelector((state: RootState) => state.auth);

  const { countryKey, location } = useSelector((state: RootState) => state.location);

  useEffect(() => {
    const setupLocation = () => {
      if (isLoadingApp) {
      } else {
          if (location !== null ) {
          }      
      }
    };

    setupLocation();
  }, [location, isLoadingApp]);


  if (isLoadingApp) {
    return <LoaderMain />;
  }

  // return <Main currentLocation={location} />;
};

export default Home;
