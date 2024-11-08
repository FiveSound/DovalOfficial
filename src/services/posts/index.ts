import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '../index';
import { QueryKeyType } from '../../types/ReactQuery.type';

export const publishPostService = async (body: object) => {
  const userToken = await AsyncStorage.getItem('userToken');

  await axios.post(
    `${API_URL}/api/posts/add`,
    {
      ...body,
    },
    {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    },
  );
};

export const getMyPostService = async () => {
  try {
    const userToken = await AsyncStorage.getItem('userToken');

    const response = await axios.post(
      `${API_URL}/api/posts/my-posts`,
      {},
      {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      },
    );

    return response.data;
  } catch (error) {
    console.log({ error });
    return [];
  }
};

export const getMyPostAndRecipesService = async () => {
  try {
    const userToken = await AsyncStorage.getItem('userToken');

    const response = await axios.post(
      `${API_URL}/api/posts/my-posts-and-recipes`,
      {},
      {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      },
    );

    return response.data;
  } catch (error) {
    console.log({ error });
    return [];
  }
};

export const getAllReactions = async (postID: number, setTestData: any) => {
  try {
    const response = await axios.post(
      `${API_URL}/api/posts/getAllVisualizations`,
      {
        postID,
      },
    );

    setTestData(response.data);

    // return response.data;
  } catch (error) {
    console.log({ LIKEDYOU: error });

    // return error;
  }
};

export const handleLikeService = async (postID: number, liked: boolean) => {
  try {
    const userToken = await AsyncStorage.getItem('userToken');

    await axios.post(
      `${API_URL}/api/posts/liked`,
      {
        postID,
        liked,
      },
      {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      },
    );

    return {};
  } catch (error) {
    // console.log({ error });
    // console.log("INICIAR SECCION:", error);
    if ((error as any).response && (error as any).response.status === 403) {
      // openBottomSheet();
    }
    return {};
  }
};

export const handleViewService = async (postID: number) => {
  try {
    const userToken = await AsyncStorage.getItem('userToken');

    await axios.post(
      `${API_URL}/api/posts/visualization`,
      {
        postID,
      },
      {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      },
    );

    // return response.data;
  } catch (error) {
    console.log({ error });
    // return null;
  }
};

export const CommentService = async (postID: number, comment: string) => {
  try {
    const userToken = await AsyncStorage.getItem('userToken');

    const response = await axios.post(
      `${API_URL}/api/posts/comment`,
      {
        postID,
        comment,
      },
      {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      },
    );

    return response.data;
  } catch (error) {
    return error;
  }
};

export const ReplyCommentService = async (
  postID: number,
  commentID: number,
  comment: string,
) => {
  try {
    const userToken = await AsyncStorage.getItem('userToken');

    const response = await axios.post(
      `${API_URL}/api/posts/reply`,
      {
        postID,
        commentID,
        comment,
      },
      {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      },
    );

    return response.data;
  } catch (error) {
    return error;
  }
};

export const getCommentByPostService = async (
  postID: number,
  setData: any,
  setLoading: any,
) => {
  try {
    const userToken = await AsyncStorage.getItem('userToken');

    const response = await axios.post(
      `${API_URL}/api/posts/get-comments`,
      {
        postID,
      },
      {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      },
    );
    // console.log({ COMMENTS: response.data });
    setData(response.data);
    setLoading(false);
  } catch (error) {
    console.log({ error });
  }
};

export const getRepliesCommentService = async (commentID: number) => {
  try {
    const userToken = await AsyncStorage.getItem('userToken');

    const response = await axios.post(
      `${API_URL}/api/posts/get-replies`,
      {
        commentID,
      },
      {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      },
    );

    return response.data;
  } catch (error) {
    return error;
  }
};

export const setLikesCommentService = async (commentID: number) => {
  try {
    const userToken = await AsyncStorage.getItem('userToken');

    const response = await axios.post(
      `${API_URL}/api/posts/set-likes-comment`,
      {
        commentID,
      },
      {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    return {};
  }
};

export const desLikesCommentService = async (commentID: number) => {
  try {
    const userToken = await AsyncStorage.getItem('userToken');

    await axios.post(
      `${API_URL}/api/posts/deslikes-comment`,
      {
        commentID,
      },
      {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      },
    );
    return 1;
  } catch (error) {
    return 0;
  }
};

export const getLikesCommentService = async (commentID: number) => {
  try {
    const userToken = await AsyncStorage.getItem('userToken');

    const response = await axios.post(
      `${API_URL}/api/posts/get-likes-comment`,
      {
        commentID,
      },
      {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    return 0;
  }
};

// Individual Post
export const getMyPostByIDService = async ({ queryKey }: QueryKeyType) => {
  try {
    const response = await axios.post(`${API_URL}/api/posts/post`, {
      postID: queryKey[1],
    });

    return response.data;
  } catch (error) {
    console.log({ error });
    return [];
  }
};

// Tag user from create post
export const tagUserService = async (postID: number, userID: string) => {
  const userToken = await AsyncStorage.getItem('userToken');
  const response = await axios.post(
    `${API_URL}/api/posts/tag`,
    {
      postID,
      userID,
    },
    {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    },
  );

  return response.data;
};

export const saveDraftService = async (key: string[]) => {
  const userToken = await AsyncStorage.getItem('userToken');

  const response = await axios.post(
    `${API_URL}/api/posts/draft`,
    { key },
    {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    },
  );
  return response.data;
};

export const getTagsService = async () => {
  const response = await axios.get(`${API_URL}/api/posts/tags`);
  return response.data;
};

export const getTopicsService = async () => {
  const response = await axios.get(`${API_URL}/api/posts/topics`);
  return response.data;
};

export const getHashtagsService = async () => {
  const response = await axios.get(`${API_URL}/api/posts/hashtags`);
  return response.data;
};
