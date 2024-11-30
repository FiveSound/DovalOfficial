import axios from 'axios';
import { API } from '..';

interface LocationDetails {
  latitude: number;
  longitude: number;
}

export const feedService = async (
  location: LocationDetails,
  userID: string,
  page: number,
) => {

  const url = `${API}/learn`;
  const params = {
    user_id: userID,
    page: page,
    latitude: location.latitude,
    longitude: location.longitude,
  };

  try {
    const response = await axios.get(url, { params });
    return response.data;
  } catch (error) {
    // Verificar si el error es de tipo AxiosError
    if (axios.isAxiosError(error)) {
      if (error.response) {
        console.error('AxiosError: Respuesta del servidor recibida pero con error.', {
          status: error.response.status,
          data: error.response.data,
          headers: error.response.headers,
        });
      } else if (error.request) {
        // La solicitud fue hecha pero no se recibió respuesta
        console.error('AxiosError: Solicitud hecha pero no se recibió respuesta.', {
          request: error.request,
        });
      } else {
        // Algo sucedió al configurar la solicitud que desencadenó un error
        console.error('AxiosError: Error al configurar la solicitud.', {
          message: error.message,
        });
      }
    } else {
      // Error no relacionado con Axios
      console.error('Error inesperado en feedService:', {
        message: (error as Error).message,
        stack: (error as Error).stack,
      });
    }

    return [];
  }
};