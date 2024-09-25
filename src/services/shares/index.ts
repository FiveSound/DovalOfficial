import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { API_URL } from "..";

export const getContacts = async (
  page: number,
  latitude: number | undefined,
  longitude: number | undefined
) => {
  const userToken = await AsyncStorage.getItem("userToken");

  const response = await axios.post(
    `${API_URL}/api/share/contacts`,
    {
      page: page,
      latitude: latitude,
      longitude: longitude,
    },
    {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    }
  );

  return response.data;
};
  // Busca los usuarios de la APP
  export const searchContact = async (query: string, page: number) => {
    const userToken = await AsyncStorage.getItem("userToken");
  
    const response = await axios.post(
      `${API_URL}/api/share/search`,
      {
        query: query,
        page: page,
      },
      {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      }
    );
  
    return response.data;
  };

  export const blockService = async (
    userID: string,
    message?: string | undefined
  ) => {
    const userToken = await AsyncStorage.getItem("userToken");
  
    const response = await axios.post(
      `${API_URL}/api/share/block`,
      { userID, message: message ? message : undefined },
      {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      }
    );
    return response.data;
  };
  
  export const blockPostService = async (postID: number) => {
    const userToken = await AsyncStorage.getItem("userToken");
    console.log("blockPostService called with postID:", postID);
    const response = await axios.post(
      `${API_URL}/api/share/block/post`,
      { postID },
      {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      }
    );

    console.log("blockPostService response:", response.data);
    return response.data;
  };

  // Reportar un post, recibe el postID y la lista de ID de los reportes (reportedListService)
export const reportService = async (postID: number, report_list: number[]) => {
  const userToken = await AsyncStorage.getItem("userToken");

  //Puedes bloquear un usuario sin estar logueado
  if (!userToken) {
    let response = await axios.post(`${API_URL}/api/share/report/public`, {
      postID,
      report_list,
    });

    return response.data;
  }

  // Bloquear usuario estando logueado
  const response = await axios.post(
    `${API_URL}/api/share/report`,
    { postID, report_list },
    {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    }
  );

  return response.data;
};

// Traer lista de reportes con su ID respectivo
export const reportedListService = async () => {
  const response = await axios.get(`${API_URL}/api/share/reports`);
  return response.data;
};

export const reportUserService = async (userID: string) => {
  const userToken = await AsyncStorage.getItem("userToken");

  const response = await axios.post(
    `${API_URL}/api/share/report/user`,
    {
      userID,
    },
    {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    }
  );

  return response.data;
};