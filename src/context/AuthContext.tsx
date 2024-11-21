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
    await AsyncStorage.clear();
    dispatch(signOut());
    storage.clearAll()
    navigation.reset({
      index: 0,
      routes: [{ name: 'MyTabs' }],
    });
  };

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);


  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state: NetInfoState) => {
      dispatch(setIsConnected(state.isConnected !== false));
      
    });

    return () => unsubscribe();
  }, []);


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
