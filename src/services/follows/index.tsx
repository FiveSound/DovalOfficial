import axios from 'axios';
import { API_URL } from '../index';
import { QueryKeyType } from '../../types/ReactQuery.type';
import { storage } from '@/src/components/native';
import { USER_TOKEN } from '@/src/constants';

type Params = {
  text: string;
  userID: string | undefined;
  username: string;
};

export const getFollowersService = async () => {
  try {
    const userToken = storage.getString(USER_TOKEN);

    const response = await axios.post(
      `${API_URL}/api/follows/followers`,
      {},
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

export const followService = async (followerID: String) => {
  try {
    const userToken = storage.getString(USER_TOKEN);

    const response = await axios.post(
      `${API_URL}/api/follows/follow`,
      {
        followerID,
      },
      {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      },
    );

    return response.data;
  } catch (error) {
    return null;
  }
};

export const getFollowersAccount = async (
  followerID: string,
  setFollowersAccount: (value: number) => void,
) => {
  try {
    const response = await axios.post(
      `${API_URL}/api/follows/followers-account`,
      {
        followerID,
      },
    );

    setFollowersAccount(response.data);
    return response.data;
  } catch (error) {
    return error;
  }
};

// Ver personas que sigo yo o cualquier otro usuario
export const getFollowingAccountsService = async (
  userID: string | undefined, //con este ID puedo saber si sigo a alguien de la lista (normalmente es el mio)
  username: string | undefined, //username o userID del usuario que quiero checar
  page: number,
) => {
  try {
    const response = await axios.post(`${API_URL}/api/follows/following`, {
      userID,
      username,
      page,
    });
    return response.data;
  } catch (error) {
    return error;
  }
};

// Ver mis seguidores o los de otra persona
export const getFollowersAccountsService = async (
  userID: string | undefined, //userID para saber si ese usuario sigue a alguien de la lista (normalmente es el mio)
  username: string | undefined, //username o userID del usuario para ver sus seguidores
  page: number,
) => {
  try {
    const response = await axios.post(`${API_URL}/api/follows/followers/me`, {
      userID,
      username,
      page,
    });
    return response.data;
  } catch (error) {
    return error;
  }
};

export const getFollowingProfileService = async ({
  queryKey,
}: QueryKeyType) => {
  try {
    const response = await axios.post(
      `${API_URL}/api/follows/check/following`,
      {
        userID: queryKey[1],
        myUserID: queryKey[2],
      },
    );
    return response.data;
  } catch (error) {
    return {
      following: false,
      userID: null,
    };
  }
};

export const handleProfileFollowingService = async (userID: string) => {
  try {
    const userToken = storage.getString(USER_TOKEN);

    const response = await axios.post(
      `${API_URL}/api/follows/follow/v2`,
      {
        userID,
      },
      {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    return null;
  }
};

export const handleSearchFollowersService = async (params: Params) => {
  try {
    const userToken = storage.getString(USER_TOKEN);

    const response = await axios.post(
      `${API_URL}/api/follows/followers/search`,
      {
        ...params,
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

export const handleSearchFollowingService = async (params: Params) => {
  try {
    const userToken = storage.getString(USER_TOKEN);

    const response = await axios.post(
      `${API_URL}/api/follows/following/search`,
      {
        ...params,
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
