import axios from "axios";
import { API_URL } from "../index";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { QueryKeyType } from "../../types/ReactQuery.type";

export const getMyBusinessService = async () => {
  try {
    const userToken = await AsyncStorage.getItem("userToken");

    const response = await axios.post(
      `${API_URL}/api/business/me`,
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
    return error;
  }
};

export const updateMyBusinessService = async (body: Object) => {
  try {
    const userToken = await AsyncStorage.getItem("userToken");

    const response = await axios.post(`${API_URL}/api/business/update`, body, {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });

    return response.data;
  } catch (error) {
    console.log({ error });
    return error;
  }
};

export const getOrdersBusinessService = async (status: string) => {
  try {
    const userToken = await AsyncStorage.getItem("userToken");

    const response = await axios.post(
      `${API_URL}/api/business/orders`,
      {
        status,
      },
      {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    return error;
  }
};

export const acceptOrderService = async (
  orderID: number,
  delivery: boolean
) => {
  try {
    const userToken = await AsyncStorage.getItem("userToken");

    const response = await axios.post(
      `${API_URL}/api/business/accept-order`,
      {
        orderID,
        delivery,
      },
      {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    return {
      riders: 0,
    };
  }
};

export const rejectOrderService = async (orderID: number) => {
  try {
    const userToken = await AsyncStorage.getItem("userToken");

    const response = await axios.post(
      `${API_URL}/api/business/reject-order`,
      {
        orderID,
      },
      {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    return error;
  }
};

export const deliverOrderService = async (orderID: number) => {
  try {
    const userToken = await AsyncStorage.getItem("userToken");

    const response = await axios.post(
      `${API_URL}/api/business/deliver-order`,
      {
        orderID,
      },
      {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    return error;
  }
};

export const getNearbyBusinessService = async (location: object) => {
  try {
    const response = await axios.post(`${API_URL}/api/business/nearby`, {
      ...location,
    });
    return response.data;
  } catch (error) {
    return error;
  }
};

export const getRecipesByBusinessIDService = async (
{ queryKey }: QueryKeyType
) => {
  try {
    const response = await axios.post(`${API_URL}/api/business/recipes`, {
     businessID: queryKey[1],
     ...queryKey[2],
    });
    console.log('queryKey', queryKey)
    return response.data;
  } catch (error) {
    return error;
  }
};

export const getDetailsBusinessIDService = async (
  location: object,
  businessID: string
) => {
  try {
    const response = await axios.post(`${API_URL}/api/business/details`, {
      businessID,
      ...location,
    });
    return response.data;
  } catch (error) {
    return error;
  }
};

export const getNearbyRecipesService = async (location: object) => {
  try {
    const response = await axios.post(
      `${API_URL}/api/business/recipes/nearby`,
      {
        ...location,
      }
    );
    return response.data;
  } catch (error) {
    return error;
  }
};
