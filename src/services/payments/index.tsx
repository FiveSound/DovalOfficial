import axios from 'axios';
import { Alert } from 'react-native';
import { API_URL } from '../index';
import { storage } from '@/src/components/native';

export const savePaymentDetailsService = async (paymentIntent: object) => {
  try {
    const userToken = storage.getString(USER_TOKEN);

    const response = await axios.post(
      `${API_URL}/api/payments-methods/add`,
      {
        ...paymentIntent,
      },
      {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      },
    );

    Alert.alert('Nuevo metodo de pago agregado con exito!');

    return response.data;
  } catch (error) {
    Alert.alert('Ha ocurrido un error!');
    return error;
  }
};

export const getPaymentDetailsService = async (
  setIsLoading: any,
  setMethodPayment: any,
) => {
  try {
    const userToken = storage.getString(USER_TOKEN);

    const response = await axios.post(
      `${API_URL}/api/payments-methods/get`,
      {},
      {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      },
    );

    setMethodPayment(response.data);
    setIsLoading(false);
    return response.data;
  } catch (error) {
    return error;
  }
};

export const deletePaymentDetailsService = async () => {
  try {
    const userToken = storage.getString(USER_TOKEN);

    await axios.post(
      `${API_URL}/api/payments-methods/delete`,
      {},
      {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      },
    );
    return {};
  } catch (error) {
    return error;
  }
};
