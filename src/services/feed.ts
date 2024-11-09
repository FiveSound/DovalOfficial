import axios from 'axios';
const API = 'https://dovalai-develop.up.railway.app';

export const feedService = async (userID: string) => {
  const response = await axios.get(`${API}/recommended?user_id=${userID}`);
  return response.data;
};
