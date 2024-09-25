import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "../index";
import { Alert } from "react-native";

export const createCampaignService = async (
  body: object,
  reset: any,
  setSuccess: any
) => {
  try {
    const userToken = await AsyncStorage.getItem("userToken");

    const response = await axios.post(
      `${API_URL}/api/campaigns/create`,
      {
        ...body,
      },
      {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      }
    );

    reset();
    setSuccess(true);

    Alert.alert(
      "Creaste una nueva campaña!",
      "Ahora los usuarios podran ver tus campañas"
    );

    return response.data;
  } catch (error) {
    console.log({ error });
    setSuccess(false);
    return null;
  }
};
