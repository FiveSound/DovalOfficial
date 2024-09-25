import axios from "axios";
import { API_URL } from "../index";

export const getAllSongsService = async (page: number) => {
  try {
    const response = await axios.get(
      `${API_URL}/api/upload/songs/paginate/${page}`
    );

    return response.data;
  } catch (error) {
    console.log({ error });
    return [];
  }
};

export const getRamdomSongsService = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/upload/songs/random`);

    return response.data;
  } catch (error) {
    console.log({ error });
    return [];
  }
};

export const searchSongsService = async (query: string) => {
  try {
    const response = await axios.get(
      `${API_URL}/api/upload/songs/search/${query}`
    );

    return response.data;
  } catch (error) {
    console.log({ error });
    return [];
  }
};

export const getSongByIDService = async (id: number) => {
  try {
    const response = await axios.get(`${API_URL}/api/upload/songs/${id}`);

    return response.data;
  } catch (error) {
    console.log({ error });
    return [];
  }
};

export const getPostsBySongIDService = async (songID: number) => {
  try {
    const response = await axios.get(`${API_URL}/api/posts/song/${songID}`);

    return response.data;
  } catch (error) {
    console.log({ error });
    return [];
  }
};