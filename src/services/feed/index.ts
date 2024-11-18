import axios from "axios";
import { API } from "..";

interface LocationDetails {
  latitude: number;
  longitude: number;
}

export const feedService = async (location: LocationDetails, userID: string, page: number) => {
  try {
    const response = await axios.get(
      `${API}/learn?user_id=${userID}&page=${page}&latitude=${location?.latitude}&longitude=${location?.longitude}`
    );
    console.log({ page });

    return response.data;
  } catch (error) {
    console.log({ FEED: error });
    return [];
  }
};
