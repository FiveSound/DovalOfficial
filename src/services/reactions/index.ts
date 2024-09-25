import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import { Alert } from "react-native";
import { API_URL } from "../index";
import { QueryKeyType } from "../../types/ReactQuery.type";

export const savedService = async (postID: number) => {
  try {
    const userToken = await AsyncStorage.getItem("userToken");

    await axios.post(
      `${API_URL}/api/saved`,
      {
        post: true,
        savedID: postID,
      },
      {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      }
    );

    return {};
  } catch (error) {
    console.log({ error });
    console.log("INICIAR SECCION:", error);
    if ((error as any).response && (error as any).response.status === 403) {
      // openBottomSheet();
    }
    return {};
  }
};

export const unSavedService = async (postID: number) => {
  try {
    const userToken = await AsyncStorage.getItem("userToken");

    await axios.post(
      `${API_URL}/api/saved/unsaved`,
      {
        savedID: postID,
      },
      {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      }
    );

    return {};
  } catch (error) {
    console.log({ error });

    return {};
  }
};

export const getSavedPostsService = async (
  postID: number,
  setSaved: any,
  setCounter: any
) => {
  try {
    const userToken = await AsyncStorage.getItem("userToken");
    const response = await axios.post(
      `${API_URL}/api/saved/posts`,
      {
        postID,
      },
      {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      }
    );

    setSaved(response.data.saved);
    setCounter(response.data.counter);
    return response.data;
  } catch (error) {
    console.log({ error });
    return {};
  }
};

export const getMySavedPostsService = async () => {
  try {
    const userToken = await AsyncStorage.getItem("userToken");

    const response = await axios.post(
      `${API_URL}/api/saved/my-posts`,
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

// Fix reactions
export const getLikePostService = async ({ queryKey }: QueryKeyType) => {
  try {
    const params = queryKey[1];
    const response = await axios.post(
      `${API_URL}/api/likes`,
      {
        params,
      },
      {}
    );

    return response.data;
  } catch (error) {
    console.log({ error });
    return null;
  }
};

export const handleLikeService = async (postID: number) => {
  try {
    const userToken = await AsyncStorage.getItem("userToken");

    const response = await axios.post(
      `${API_URL}/api/likes/liked`,
      {
        postID,
      },
      {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.log({ error });
  }
};

// Views
export const getViewPostService = async ({ queryKey }: QueryKeyType) => {
  try {
    const response = await axios.post(`${API_URL}/api/views`, {
      postID: queryKey[1],
    });

    return response.data;
  } catch (error) {
    return error;
  }
};

export const handleViewService = async (postID: number) => {
  try {
    const userToken = await AsyncStorage.getItem("userToken");

    await axios.post(
      `${API_URL}/api/views/add`,
      {
        postID,
      },
      {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      }
    );

    // return response.data;
  } catch (error) {
    console.log({ error });
    // return null;
  }
};

// Saved
export const getSavedPostService = async ({ queryKey }: QueryKeyType) => {
  try {
    const response = await axios.post(`${API_URL}/api/saved/all`, {
      params: queryKey[1],
    });

    return response.data;
  } catch (error) {
    return error;
  }
};

export const handleSavedService = async (postID: number) => {
  try {
    const userToken = await AsyncStorage.getItem("userToken");

    await axios.post(
      `${API_URL}/api/saved/add`,
      {
        postID,
      },
      {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      }
    );

    // return response.data;
  } catch (error) {
    console.log({ error });
    // return null;
  }
};

// Comments
export const getCommentsPostService = async ({ queryKey }: QueryKeyType) => {
  try {
    const response = await axios.post(`${API_URL}/api/comments`, {
      postID: queryKey[1],
    });

    return response.data;
  } catch (error) {
    return error;
  }
};

export const getSharePostService = async ({ queryKey }: QueryKeyType) => {
  try {
    const response = await axios.post(`${API_URL}/api/share`, {
      params: queryKey[1],
    });
    return response.data;
  } catch (error) {
    console.log({ error });
    return error;
  }
};

export const sharingService = async (
  postID: number | null,
  url: string | null
) => {
  try {
    const userToken = await AsyncStorage.getItem("userToken");

    const response = await axios.post(
      `${API_URL}/api/share/sharing`,
      {
        postID,
        url,
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

export const mySharedgService = async () => {
  try {
    const userToken = await AsyncStorage.getItem("userToken");

    const response = await axios.post(
      `${API_URL}/api/share/my-shared`,
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

export const sharedByUserService = async (username: string) => {
  try {
    const response = await axios.post(`${API_URL}/api/share/shared-by-user`, {
      username,
    });
    return response.data;
  } catch (error) {
    return error;
  }
};
