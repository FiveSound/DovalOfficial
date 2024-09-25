import axios from "axios";
import { API_URL } from "../index";

interface feedBackFieldsInterface {
  name: string;
  username: string;
  email: string;
  message: string;
  phone: string;
}

export const sendFeedbackService = async (body: feedBackFieldsInterface) => {
  try {
    const response = await axios.post(`${API_URL}/api/feedback/create`, {
      ...body,
    });
    return response.data;
  } catch (error) {
    console.log({ error });
    return error;
  }
};