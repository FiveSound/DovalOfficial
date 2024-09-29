import axios from "axios";
import { API_URL } from "./index";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { QueryKeyType } from "../types/ReactQuery.type";

export const getCartService = async () => {
  try {
    const userToken = await AsyncStorage.getItem("userToken");
    const response = await axios.post(
      `${API_URL}/api/cart/get`,
      {},
      {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      }
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
  qty: number
) => {
  console.log('recipeID', recipeID);
  console.log('subvariants', subvariants);
  console.log('qty', qty);
  const userToken = await AsyncStorage.getItem("userToken");
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
    }
  );
  console.log('response', response.data);
  return response.data;
  
};

export const removerCartService = async (recipeID: number, subVariants: number[]) => {
  try {
    const userToken = await AsyncStorage.getItem("userToken");

    const response = await axios.delete(`${API_URL}/api/cart`, {
      data: { recipeID, subVariants },
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
  const userToken = await AsyncStorage.getItem("userToken");

  const response = await axios.post(
    `${API_URL}/api/cart/variants`,
    { recipeID: queryKey[1] },
    {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    }
  );
  console.log({ test: 1 });

  return response.data;
};

export const getTotalVariantsService = async ({ queryKey }: QueryKeyType) => {
  const userToken = await AsyncStorage.getItem("userToken");

  const response = await axios.post(
    `${API_URL}/api/cart/total`,
    {
      recipeID: queryKey[1],
      subvariants: queryKey[2],
      qty: queryKey[3],
    },
    { headers: { Authorization: `Bearer ${userToken}` } }
  );

  return response.data;
};