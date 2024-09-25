import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "../index";

export const subscribeNotificationsService = async (token: string) => {
  try {
    const userToken = await AsyncStorage.getItem("userToken");
    console.log({ userToken });

    const response = await axios.post(
      `${API_URL}/api/notifications/subscription`,
      {
        token,
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
