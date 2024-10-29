import { lazy, Suspense, useEffect } from 'react';
import { IsLoading, LoadingScreen } from '../components/custom';
import { useAppSelector } from '../redux';
import { RootState } from '../redux/store';
import { useNavigation } from '../components/native';
import MainStackt from './MainStackt';
const LazyNavigation = lazy(() => import('./MainStackt'));

const RootNavigation = () => {
  const { isLoadingApp, isAuthenticated, user } = useAppSelector((state: RootState) => state.auth);
  const navigation = useNavigation();

  useEffect(() => {
    if (!isLoadingApp) {
      if (isAuthenticated) {
        if (!user?.onboarding) {
          navigation.navigate('Onboarding');
        }
      }
    }
  }, [isAuthenticated, isLoadingApp, user, navigation]);

  return (
    <Suspense fallback={<LoadingScreen />}>
      <LazyNavigation />
     </Suspense>
  );
};

export default RootNavigation;
