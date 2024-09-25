import { useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

type UseAsyncStorageReturn<T> = {
  storedValue: string | null; // Cambiado a string
  setValue: (value: T) => Promise<void>;
  removeValue: () => Promise<void>;
  loading: boolean;
  error: string | null;
};

function useAsyncStorage<T>(key: string, initialValue: T): UseAsyncStorageReturn<T> {
  const [storedValue, setStoredValue] = useState<string | null>(null); // Cambiado a string
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadStoredValue = async () => {
      try {
        const item = await AsyncStorage.getItem(key);
        setStoredValue(item ?? JSON.stringify(initialValue)); // Guardar como string
      } catch (error) {
        setError(`Error loading stored value: ${error}`);
      } finally {
        setLoading(false);
      }
    };

    loadStoredValue();
  }, [key, initialValue]);

  const setValue = useCallback(async (value: T) => {
    try {
      setLoading(true);
      const valueToStore = JSON.stringify(value); // Guardar como string
      setStoredValue(valueToStore);
      await AsyncStorage.setItem(key, valueToStore);
      console.log(`New value set for key "${key}":`, valueToStore);
    } catch (error) {
      setError(`Error setting value: ${error}`);
    } finally {
      setLoading(false);
    }
  }, [key]);

  const removeValue = useCallback(async () => {
    try {
      setLoading(true);
      setStoredValue(null);
      await AsyncStorage.removeItem(key);
    } catch (error) {
      setError(`Error removing value: ${error}`);
    } finally {
      setLoading(false);
    }
  }, [key]);

  return { storedValue, setValue, removeValue, loading, error };
}

export default useAsyncStorage;