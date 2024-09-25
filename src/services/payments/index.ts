import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";
import { API_URL } from "../index";

export const savePaymentDetailsService = async (paymentIntent: object) => {
  try {
    const userToken = await AsyncStorage.getItem("userToken");

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
    const userToken = await AsyncStorage.getItem("userToken");

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
    const userToken = await AsyncStorage.getItem("userToken");

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

export const setPreferredPaymentService = async (
  id: string,
  cash: string | null
) => {
  try {
    const userToken = await AsyncStorage.getItem("userToken");

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

    return {};
  } catch (error) {
    return null;
  }
};

export const getPreferredPaymentService = async () => {
  try {
    const userToken = await AsyncStorage.getItem("userToken");

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
