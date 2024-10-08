import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "../index";

type queryKeyProps = {
  queryKey: any;
};

export const getProfileUserService = async ({ queryKey }: queryKeyProps) => {
  try {
    const response = await axios.post(`${API_URL}/api/account/profile-userid`, {
      userID: queryKey[1],
    });

    return response.data;
  } catch (error) {
    return error;
  }
};

export const getProfileUserByUsernameService = async ({
  queryKey,
}: queryKeyProps) => {
  try {
    const response = await axios.post(
      `${API_URL}/api/account/profile-username`,
      {
        username: queryKey[1],
      }
    );

    return response.data;
  } catch (error) {
    return error;
  }
};

export const getPostsProfileUserService = async ({
  queryKey,
}: queryKeyProps) => {
  try {
    const response = await axios.post(`${API_URL}/api/account/posts`, {
      username: queryKey[1],
    });
    return response.data;
  } catch (error) {
    return error;
  }
};

export const getRecipesProfileUserService = async ({
  queryKey,
}: queryKeyProps) => {
  try {
    const response = await axios.post(`${API_URL}/api/account/recipes`, {
      username: queryKey[1],
    });
    return response.data;
  } catch (error) {
    return error;
  }
};

export const getSavedProfileUserService = async ({
  queryKey,
}: queryKeyProps) => {
  try {
    const response = await axios.post(`${API_URL}/api/account/saved`, {
      userID: queryKey[1],
    });
    return response.data;
  } catch (error) {
    return error;
  }
};

export const disabledAccountService = async () => {
  try {
    const userToken = await AsyncStorage.getItem("userToken");

    const response = await axios.post(
      `${API_URL}/api/account/disabled-account`,
      {},
      {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      }
    );

    await AsyncStorage.clear();

    return response.data;
  } catch (error) {
    return error;
  }
};

export const getTopicsService = async () => {
  try {
    const response = await axios.post(`${API_URL}/api/posts/topics`, {});
    return response.data;
  } catch (error) {
    console.log({ error });
    return [];
  }
};
