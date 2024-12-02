import axios from "axios";
import { storage } from "../components/native";
import { USER_TOKEN } from "../constants";
import { API_URL, API } from ".";

export const getAvailableProgrammableService = async () => {
  const userToken = storage.getString(USER_TOKEN);

  const response = await axios.post(
    `${API_URL}/api/programmable`,
    {},
    {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    }
  );

  return response.data;
};

type ProgramableType = {
  orderID: number;
  schedule_creation_time: string;
  schedule_estimated_time: string;
};
export const programmableService = async (body: ProgramableType) => {
  const userToken = storage.getString(USER_TOKEN);

  const response = await axios.post(
    `${API_URL}/api/programmable/create`,
    {
      ...body,
    },
    {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    }
  );

  return response.data;
};
