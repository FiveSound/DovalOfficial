import axios from 'axios';

export const handleAxiosError = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    console.error('Error en la solicitud:', error.response?.data);
  } else {
    console.error('Error no identificado:', error);
  }
};
