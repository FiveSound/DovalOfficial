import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '../index';
import { Alert } from 'react-native';
import { storage } from '@/src/components/native';
import { USER_TOKEN } from '@/src/constants';

export const createCampaignService = async (
  body: object,
  reset: any,
  setSuccess: any,
) => {
  try {
    const userToken = storage.getString(USER_TOKEN);

    const response = await axios.post(
      `${API_URL}/api/campaigns/create`,
      {
        ...body,
      },
      {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      },
    );

    reset();
    setSuccess(true);

    Alert.alert(
      'Creaste una nueva campaña!',
      'Ahora los usuarios podran ver tus campañas',
    );

    return response.data;
  } catch (error) {
    console.log({ error });
    setSuccess(false);
    return null;
  }
};
