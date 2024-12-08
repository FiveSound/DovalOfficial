import axios from 'axios';
import { API_URL } from './index';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { QueryKeyType } from '../types/ReactQuery.type';
import { USER_TOKEN } from '../constants';
import { storage } from '../components/native';

export const getCartService = async () => {
  try {
    const userToken = storage.getString(USER_TOKEN);
    const response = await axios.post(
      `${API_URL}/api/cart/get`,
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

export const addToCartService = async (
  recipeID: number,
  subvariants: number[],  
  qty: number,
) => {
  console.log('recipeID', recipeID);
  console.log('subvariants', subvariants);
  console.log('qty', qty);
  const userToken = storage.getString(USER_TOKEN);
  console.log('userToken', userToken);
  const response = await axios.post(
    `${API_URL}/api/cart`,
    {
      recipeID,
      subvariants,
      qty,
    },
    {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    },
  );
  console.log('response', response.data);
  return response.data;
};

export const removerCartService = async (cartItemID: number, recipeID: number) => {
  try {
    const userToken = storage.getString(USER_TOKEN);

    const response = await axios.delete(`${API_URL}/api/cart`, {
      data: { cartItemID, recipeID },
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });
    return response.data;
  } catch (error) {
    return null;
  }
};

export const getRecipeVariantsService = async ({ queryKey }: QueryKeyType) => {
  const userToken = storage.getString(USER_TOKEN);

  const response = await axios.post(
    `${API_URL}/api/cart/variants`,
    { recipeID: queryKey[1] },
    {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    },
  );
  console.log({ test: 1 });

  return response.data;
};

export const getTotalVariantsService = async ({ queryKey }: QueryKeyType) => {
  const userToken = storage.getString(USER_TOKEN);

  const response = await axios.post(
    `${API_URL}/api/cart/total`,
    {
      recipeID: queryKey[1],
      subvariants: queryKey[2],
      qty: queryKey[3],
    },
    { headers: { Authorization: `Bearer ${userToken}` } },
  );

  return response.data;
};

export const addCartQtyService = async (cartItemID: number) => {
  const userToken = storage.getString(USER_TOKEN);

  const response = await axios.post(
    `${API_URL}/api/cart/add`,
    { cartItemID },
    {
      headers: { Authorization: `Bearer ${userToken}` },
    }
  );

  return response.data;
};

export const getCartResumeService = async ({ queryKey }: QueryKeyType) => {
  const userToken = storage.getString(USER_TOKEN);

  const response = await axios.post(
    `${API_URL}/api/cart/resume`,
    { cartID: queryKey[1] },
    { headers: { Authorization: `Bearer ${userToken}` } }
  );

  return response.data;
};