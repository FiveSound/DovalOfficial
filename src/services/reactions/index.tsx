import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import { Alert } from "react-native";
import { API_URL } from '../index';

export const savedService = async (postID: number) => {
  try {
    const userToken = await AsyncStorage.getItem('userToken');

    await axios.post(
      `${API_URL}/api/saved`,
      {
        post: true,
        savedID: postID,
      },
      {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      },
    );

    return {};
  } catch (error) {
    console.log({ error });
    console.log('INICIAR SECCION:', error);
    if ((error as any).response && (error as any).response.status === 403) {
      // openBottomSheet();
    }
    return {};
  }
};

export const unSavedService = async (postID: number) => {
  try {
    const userToken = await AsyncStorage.getItem('userToken');

    await axios.post(
      `${API_URL}/api/saved/unsaved`,
      {
        savedID: postID,
      },
      {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      },
    );

    return {};
  } catch (error) {
    console.log({ error });

    return {};
  }
};

export const getSavedPostsService = async (
  postID: number,
  setSaved: any,
  setCounter: any,
) => {
  try {
    const userToken = await AsyncStorage.getItem('userToken');

    const response = await axios.post(
      `${API_URL}/api/saved/posts`,
      {
        postID,
      },
      {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      },
    );

    setSaved(response.data.saved);
    setCounter(response.data.counter);

    return response.data;
  } catch (error) {
    console.log({ error });
    return {};
  }
};
