import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '..';

export type Interests = {
  id: number;
  category?: string;
  interest: string;
};

// Trae la lista de intereses para presentar al usuario cuando entra a la app por primera vez
export const getInterestsService = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/onboarding/interests`);
    return response.data;
  } catch (error) {
    console.log({ error });
    return [];
  }
};

// Este service 'saveInterestsService' recibe una lista de los intereses que el usuario ha seleccionado (Interests[])
export const saveInterestsService = async (interests: Interests[]) => {
  try {
    const userToken = await AsyncStorage.getItem('userToken');

    const response = await axios.post(
      `${API_URL}/api/onboarding/save/interests`,
      {
        interests: interests,
      },
      {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      },
    );

    return response.data;
  } catch (error) {
    return {
      success: false,
      error: error,
    };
  }
};

// Este service trae la lista de intereses seleccionados, es util si no has terminado el proceso de onboarding
// usar el service (endOnboardingService) Para actualizar el campo 'onboarding=true'
export const getMyInterestsService = async () => {
  try {
    const userToken = await AsyncStorage.getItem('userToken');
    const response = await axios.post(
      `${API_URL}/api/onboarding/interests`,
      {},
      {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      },
    );

    return response.data;
  } catch (error) {
    console.log({ error });
    return [];
  }
};

// Este service finaliza el proceso de onboarding
// Recordar que el procesos termina cuando muestras el efecto 'Scrolling'
export const endOnboardingService = async () => {
  try {
    const userToken = await AsyncStorage.getItem('userToken');
    const response = await axios.post(
      `${API_URL}/api/onboarding/end`,
      {},
      {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      },
    );

    return response.data;
  } catch (error) {
    return {
      success: false,
      error: error,
    };
  }
};

//Trae el status "tutorial=true | false" si un usuario ya vio el tutorial de scroll
export const getStatusTutorialService = async () => {
  try {
    const userToken = await AsyncStorage.getItem('userToken');
    if (!userToken) {
      throw new Error('User not authenticated');
    }

    const response = await axios.post(
      `${API_URL}/api/onboarding/status/tutorial`,
      {},
      {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      },
    );

    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    return {
      success: false,
      error,
    };
  }
};

// Actualiza el campo tutorial a true
export const endTutorialService = async () => {
  try {
    const userToken = await AsyncStorage.getItem('userToken');
    const response = await axios.post(
      `${API_URL}/api/onboarding/update/tutorial`,
      {},
      {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    return {
      success: false,
      error,
    };
  }
};
