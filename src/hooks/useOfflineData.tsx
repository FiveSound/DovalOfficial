import { useState, useEffect, useCallback, useRef } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo, { NetInfoState } from '@react-native-community/netinfo';
import { useAuth } from '../context/AuthContext';

interface OfflineDataHook<T> {
  data: T;
  saveData: (value: T) => Promise<void>;
  loadData: () => Promise<void>;
  isLoading: boolean;
  isConnected: boolean | null;
}

const useOfflineData = <T,>(
  key: string,
  initialState: T,
  fetchFunction: () => Promise<T>
): OfflineDataHook<T> => {
  const { user } = useAuth();
  const storageKey = `${user?.userID}_${key}`;
  const [data, setData] = useState<T>(initialState);
  const [isLoading, setIsLoading] = useState(true);
  const [isConnected, setIsConnected] = useState<boolean | null>(null);
  const lastUserID = useRef(user?.userID);

  const clearData = useCallback(async (): Promise<void> => {
    try {
      await AsyncStorage.removeItem(storageKey);
    } catch (e) {
      console.error('Error clearing data', e);
    }
  }, [storageKey]);

  const saveData = useCallback(async (value: T): Promise<void> => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(storageKey, jsonValue);
      setData(value);
    } catch (e) {
      console.error('Error saving data', e);
    }
  }, [storageKey]);

  const loadDataFromAPI = useCallback(async (): Promise<void> => {
    try {
      const freshData = await fetchFunction();
      await saveData(freshData);
    } catch (e) {
      console.error('Error fetching data from API', e);
    }
  }, [fetchFunction, saveData]);

  const loadData = useCallback(async (): Promise<void> => {
    setIsLoading(true);
    try {
      const connectionInfo: NetInfoState = await NetInfo.fetch();
      setIsConnected(connectionInfo.isConnected);

      if (connectionInfo.isConnected) {
        await loadDataFromAPI();
      } else {
        const jsonValue = await AsyncStorage.getItem(storageKey);
        if (jsonValue != null) {
          const offlineData = JSON.parse(jsonValue) as T;
          setData(offlineData);
        } else {
          console.log("No hay datos offline válidos");
          const unsubscribe = NetInfo.addEventListener((state: NetInfoState) => {
            if (state.isConnected) {
              loadDataFromAPI().finally(() => unsubscribe());
            }
          });
        }
      }
    } catch (e) {
      console.error('Error fetching data', e);
    } finally {
      setIsLoading(false);
    }
  }, [storageKey, loadDataFromAPI]);


  useEffect(() => {
    if (user?.userID !== lastUserID.current) {
      clearData();
      setData(initialState);
      lastUserID.current = user?.userID;
    }
    void loadData();
  }, [user?.userID, loadData, clearData, initialState]);

  return { data, saveData, loadData, isLoading, isConnected };
};

export default useOfflineData;