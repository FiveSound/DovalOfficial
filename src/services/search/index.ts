import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '../index';

export const searchResults = async (query: string) => {
  try {
    const userToken = await AsyncStorage.getItem('userToken');

    const response = await axios.post(
      `${API_URL}/api/search`,
      {
        query,
      },
      {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      },
    );

    return response.data;
  } catch (error) {
    return error;
  }
};

export const initialData = async (page: number) => {
  try {
    const userToken = await AsyncStorage.getItem('userToken');

    const response = await axios.post(
      `${API_URL}/api/search/initial-data`,
      {
        page,
      },
      {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      },
    );

    return response.data;
  } catch (error) {
    return error;
  }
};
