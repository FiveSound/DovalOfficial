import axios from "axios";
import { Alert } from "react-native";
import { API_URL } from "../index";
import { USER_TOKEN } from "@/src/constants";
import { storage } from "@/src/components/native";

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
      }
    );

    // Toast.show({
    //   type: "success",
    //   text1: "Metodo agregado con exito",
    // });

    return response.data;
  } catch (error) {
    Alert.alert("Ha ocurrido un error!");
    return error;
  }
};

export const getPaymentDetailsService = async () => {
  try {
    const userToken = storage.getString(USER_TOKEN);

    const response = await axios.post(
      `${API_URL}/api/payments-methods/get`,
      {},
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

export const deletePaymentDetailsService = async (id: string) => {
  try {
    const userToken = storage.getString(USER_TOKEN);

    const response = await axios.post(
      `${API_URL}/api/payments-methods/delete`,
      {
        id,
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

export const setPreferredPaymentService = async (id: string, cash: string | null) => {
  const userToken = storage.getString(USER_TOKEN);

  const response = await axios.post(
    `${API_URL}/api/payments-methods/preferred`,
    {
      id,
      cash,
    },
    {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    }
  );

  return response.data;
};

export const getPreferredPaymentService = async () => {
  try {
    const userToken = storage.getString(USER_TOKEN);

    const response = await axios.post(
      `${API_URL}/api/payments-methods/method-payment`,
      {},
      {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    return null;
  }
};
