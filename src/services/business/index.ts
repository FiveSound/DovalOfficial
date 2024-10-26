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

export const notificationsService = async () => {
  const userToken = await AsyncStorage.getItem("userToken");

  const response = await axios.post(
    `${API_URL}/api/business/notifications`,
    {},
    { headers: { Authorization: `Bearer ${userToken}` } }
  );

  return response.data;
};

export const notificationsUpdateService = async (body: object) => {
  const userToken = await AsyncStorage.getItem("userToken");

  const response = await axios.post(
    `${API_URL}/api/business/notifications/update`,
    {
      ...body,
    },
    { headers: { Authorization: `Bearer ${userToken}` } }
  );

  return response.data;
};

export const updateCoverProfileService = async (key: string) => {
  const userToken = await AsyncStorage.getItem("userToken");

  const response = await axios.post(
    `${API_URL}/api/business/profile/edit/cover`,
    { key },
    { headers: { Authorization: `Bearer ${userToken}` } }
  );

  return response.data;
};

export const supportService = async (body: object) => {
  const userToken = await AsyncStorage.getItem("userToken");

  const response = await axios.post(
    `${API_URL}/api/business/support`,
    {
      ...body,
    },
    { headers: { Authorization: `Bearer ${userToken}` } }
  );

  return response.data;
};


export const getHeaderDasboardService = async () => {
  const userToken = await AsyncStorage.getItem("userToken");

  const response = await axios.post(
    `${API_URL}/api/business/header/dashboard`,
    {},
    {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    }
  );

  return response.data;
};

export const getTabsDashboardService = async () => {
  const userToken = await AsyncStorage.getItem("userToken");

  const response = await axios.post(
    `${API_URL}/api/business/tabs/dashboard`,
    {},
    {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    }
  );

  return response.data;
};

export const getDashboardOrderService = async ({ queryKey }: QueryKeyType) => {
  const userToken = await AsyncStorage.getItem("userToken");

  const response = await axios.post(
    `${API_URL}/api/business/orders/dashboard`,
    {
      status: queryKey[1],
      page: queryKey[2],
    },
    {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    }
  );

  return response.data;
};

export const getAllOrdersService = async ({ queryKey }: QueryKeyType) => {
  const userToken = await AsyncStorage.getItem("userToken");

  const response = await axios.post(
    `${API_URL}/api/business/orders/all`,
    { page: queryKey[1], search: queryKey[2] }, //tags: queryKey[3]
    {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    }
  );

  return response.data;
};

export const getOrderIDService = async (orderID: number) => {
  const userToken = await AsyncStorage.getItem("userToken");

  const response = await axios.post(
    `${API_URL}/api/business/order/id`,
    { orderID },
    {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    }
  );

  return response.data;
};

export const getPaymentsHistoryService = async ({ queryKey }: QueryKeyType) => {
  const userToken = await AsyncStorage.getItem("userToken");

  const response = await axios.post(
    `${API_URL}/api/business/payments/history`,
    {
      page: queryKey[1],
    },
    {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    }
  );

  return response.data;
};

export const getAnalitycsService = async () => {
  const userToken = await AsyncStorage.getItem("userToken");

  const response = await axios.post(
    `${API_URL}/api/business/analitycs`,
    {},
    { headers: { Authorization: `Bearer ${userToken}` } }
  );

  return response.data;
};


export const deliverOrderMyRiderService = async (orderID: number | null) => {
  const userToken = await AsyncStorage.getItem("userToken");
  const response = await axios.post(
    `${API_URL}/api/business/order/rider`,
    { orderID },
    {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    }
  );
  return response.data;
};

export const completeOrderService = async (orderID: number | null) => {
  const userToken = await AsyncStorage.getItem("userToken");
  const response = await axios.post(
    `${API_URL}/api/business/order/complete`,
    { orderID },
    {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    }
  );
  return response.data;
};

export const verifyOrderService = async (code: string | undefined, orderID: number | null) => {
  const userToken = await AsyncStorage.getItem("userToken");

  const response = await axios.post(
    `${API_URL}/api/business/order/verify`,
    { code, orderID },
    {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    }
  );

  return response.data;
};

export const delayOrderService = async (delay: string | number | undefined, orderID: number | null) => {
  const userToken = await AsyncStorage.getItem("userToken");

  const response = await axios.post(
    `${API_URL}/api/business/order/delay`,
    { delay, orderID },
    {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    }
  );

  return response.data;
};


export const getMenuManagementService = async ({ queryKey }: QueryKeyType) => {
  const userToken = await AsyncStorage.getItem("userToken");

  const response = await axios.post(
    `${API_URL}/api/business/menu/management`,
    { page: queryKey[1], search: queryKey[2] },
    { headers: { Authorization: `Bearer ${userToken}` } }
  );

  return response.data;
};

export const deleteMenuOrderIDService = async (id: number) => {
  const userToken = await AsyncStorage.getItem("userToken");

  const response = await axios.post(
    `${API_URL}/api/business/menu/delete/id`,
    { id },
    { headers: { Authorization: `Bearer ${userToken}` } }
  );

  return response.data;
};

export const getProfileEditService = async () => {
  const userToken = await AsyncStorage.getItem("userToken");

  const response = await axios.post(
    `${API_URL}/api/business/profile/get`,
    {},
    { headers: { Authorization: `Bearer ${userToken}` } }
  );

  return response.data;
};

export const editProfileService = async (body: object) => {
  const userToken = await AsyncStorage.getItem("userToken");

  const response = await axios.post(`${API_URL}/api/business/profile/edit`, body, {
    headers: { Authorization: `Bearer ${userToken}` },
  });

  return response.data;
};