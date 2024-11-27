import axios from 'axios';
import { API_URL } from '../index';
import { storage } from '@/src/components/native';
import { USER_TOKEN } from '@/src/constants';

export const subscribeNotificationsService = async (token: string) => {
  alert(`Attempting to subscribe with token: ${token}`);
  
  try {
    const userToken = storage.getString(USER_TOKEN);
    alert(`Retrieved user token: ${userToken}`);
    
    const response = await axios.post(
      `${API_URL}/api/notifications/subscription`,
      {
        token,
      },
      {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      },
    );
    
    alert('Subscription API call successful.');
    return response.data;
  } catch (error) {
    alert(`Error during subscription API call: ${error}`);
    return error;
  }
};
