import React, {
  createContext,
  FC,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useAppDispatch, useAppSelector } from '../redux';
import {
  signInStart,
  signInSuccess,
  signInFailure,
  signOut,
  loadUser,
  setIsConnected,
} from '../redux/slides/authSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { usePushNotifications } from '../hooks/usePushNotifications';
import { subscribeNotificationsService } from '../services/notifications';
import NetInfo, { NetInfoState } from '@react-native-community/netinfo';
import { UserType } from '../types/User.types';
import { AppType } from '../types/Context.type';
import { useNavigation } from '../components/native';
import { MMKV } from 'react-native-mmkv';

const storage = new MMKV();

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext<AppType>({} as AppType);

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  const { expoPushToken } = usePushNotifications();
  const { user, isAuthenticated, isLoadingApp } = useAppSelector(
    state => state.auth,
  );

  const [retryCount, setRetryCount] = useState(0);
  const maxRetries = 5;

  const signIn = async (usr: UserType) => {
    dispatch(signInStart());
    try {
      await AsyncStorage.setItem('userToken', JSON.stringify(usr));
      dispatch(signInSuccess(usr));
    } catch (error) {
      dispatch(signInFailure());
      if (error instanceof Error) {
        console.error('Error al iniciar sesión:', error.message);
      } else {
        console.error('Error desconocido al iniciar sesión');
      }
      throw error;
    }
  };

  const signOutUser = async () => {
    dispatch(signOut());
    storage.clearAll()
    navigation.reset({
      index: 0,
      routes: [{ name: 'MyTabs' }],
    });
    // dispatch(reloadApp())
  };

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  useEffect(() => {
    const handleConnectivityChange = (state: NetInfoState) => {
      dispatch(setIsConnected(state.isConnected !== false));

      if (state.isConnected) {
        setRetryCount(0);
      } else {
        attemptReconnect();
      }
    };

    const unsubscribe = NetInfo.addEventListener(handleConnectivityChange);

    return () => unsubscribe();
  }, []);

  const attemptReconnect = () => {
    if (retryCount >= maxRetries) {
      console.warn('Máximo de intentos de reconexión alcanzado.');
      return;
    }

    const retryDelay = Math.min(1000 * 2 ** retryCount, 30000); // Exponential backoff up to 30 seconds

    console.log(`Intentando reconectar en ${retryDelay / 1000} segundos...`);

    setTimeout(() => {
      NetInfo.fetch().then(state => {
        if (state.isConnected) {
          dispatch(setIsConnected(true));
          setRetryCount(0);
        } else {
          setRetryCount(prev => prev + 1);
          attemptReconnect();
        }
      });
    }, retryDelay);
  };

  useEffect(() => {
    if (user && expoPushToken?.data) {
      subscribeNotificationsService(expoPushToken.data);
    }
  }, [user, expoPushToken]);

  return (
    <AuthContext.Provider
      value={{
        signed: !!user,
        user,
        signIn,
        signOut: signOutUser,
        isLoadingApp,
        isAuthenticated,
        currentLocation: null,
        setCurrentLocation: () => {},
        rol: null,
        isDataReady: false,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
