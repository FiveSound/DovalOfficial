import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "../index";
import { UserType } from "../../types/User.types";

export const initialStateService = async () => {
  try {
    const userToken = await AsyncStorage.getItem("userToken");
    const response = await axios.post(
      `${API_URL}/api/auth/me`,
      {},
      {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      }
    );
    // await AsyncStorage.removeItem('userToken')
    return { ...response.data, token: userToken };
  } catch (error) {
    return null;
  }
};

interface SignUpResponse {
  success: boolean;
  message?: string;
}

export const signUpService = async (
  user: Object,
  navigation?: any,
  setLoginSuccess?: (value: boolean) => void,
  setRegisterError?: (value: boolean) => void,
  signIn?: (userDetails: any) => void
): Promise<SignUpResponse> => {
  try {
    const response = await axios.post(`${API_URL}/api/auth/sign-up`, user);

    if (response.status === 201) {
      await AsyncStorage.setItem("userToken", response.data.token);
      if (setLoginSuccess) setLoginSuccess(true);
      if (setRegisterError) setRegisterError(false);
      if (signIn) signIn(response.data.userDetails);
      if (navigation) navigation.navigate("TabsNavigator");
      return { success: true };
    } else {
      return { success: false, message: "Registro fallido. Intente de nuevo." };
    }
  } catch (error) {
    console.log({ error });
    if (setLoginSuccess) setLoginSuccess(false);
    if (setRegisterError) setRegisterError(true);
    let message = "Error de registro. Por favor, intente de nuevo.";
    if (error) {
      switch (error) {
        case 400:
          message = "Datos inválidos. Por favor, revise el formulario.";
          break;
        case 409:
          message = "El usuario ya existe.";
          break;
        case 500:
          message = "Error interno del servidor. Intente de nuevo más tarde.";
          break;
      }
    }
    return { success: false, message };
  }
};

interface SignInResponse {
  success: boolean;
  userDetails: UserType | null;
  message?: string;
  error?: unknown;
}
export const signInService = async (user: Object): Promise<SignInResponse> => {
  try {
    const response = await axios.post(`${API_URL}/api/auth/sign-in`, user);
    if (response.status !== 200) throw Error("Ha ocurrido un error!");

    await AsyncStorage.setItem("userToken", response.data.token);

    return {
      success: true,
      userDetails: {
        ...response.data.userDetails,
        token: response.data.token,
      },
    };
  } catch (error) {
    return {
      success: false,
      userDetails: null,
      error,
    };
  }
};

export const signInWithPhoneService = async (
  phone: string,
) => {
  try {
    await axios.post(`${API_URL}/api/auth/sign-in-with-phone`, {
      phone,
    });

  } catch (error) {
    console.log({ error });
  }
};

export const confirmCodeService = async (
  signIn: (usr: object) => void,
  phone: string,
  code: string,
  handleClose: () => void,
  reset: () => void,
  handleError: (msg: string) => void
) => {
  try {
    const response = await axios.post(`${API_URL}/api/auth/verification-code`, {
      phone,
      code,
    });

    if (response.status === 205) {
      console.log("Error 404");

      handleError("Tu codigo es incorrecto");
    }

    if (response.status === 200 || response.status === 201) {
      await AsyncStorage.setItem("userToken", response.data.token);
      signIn(response.data.userDetails);
      handleError("");
      handleClose();
      reset();
    }
  } catch (error) {
    console.log({ error });
  }
};

export const getBannerProfileService = async () => {
  try {
    const userToken = await AsyncStorage.getItem("userToken");

    const response = await axios.post(
      `${API_URL}/api/auth/banner_profile`,
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

export const getBioService = async () => {
  try {
    const userToken = await AsyncStorage.getItem("userToken");
    const response = await axios.post(
      `${API_URL}/api/auth/bio`,
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

    return error;
  }
};

export const updateBioService = async (data: Object, setIsloading: any) => {
  try {
    setIsloading(true);
    const userToken = await AsyncStorage.getItem("userToken");

    const response = await axios.post(
      `${API_URL}/api/auth/update-details`,
      {
        ...data,
      },
      {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      }
    );

    setTimeout(() => {
      setIsloading(false);
    }, 3000);
  } catch (error) {
    console.log({ error });
    setIsloading(false);
  }
};

export const updateAvatarBusinessAndUser = async (key: String) => {
  try {
    const userToken = await AsyncStorage.getItem("userToken");

    const response = await axios.post(
      `${API_URL}/api/auth/update-avatar`,
      {
        key,
      },
      {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      }
    );
  } catch (error) {
    console.log({ error });
  }
};

export const sentEmailVerificationService = async () => {
  try {
    const userToken = await AsyncStorage.getItem("userToken");
    const response = await axios.post(
      `${API_URL}/api/account/reset-password`,
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

export const updatePasswordService = async (data: object) => {
  try {
    const userToken = await AsyncStorage.getItem("userToken");
    const response = await axios.post(
      `${API_URL}/api/account/update-password`,
      {
        ...data,
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

export const validateUserNameService = async (
  username: string,
  setLoadUserName: (load: boolean) => void,
  setValidUserName: (load: boolean) => void,
  onError: (error: any) => void
) => {
  try {
    setLoadUserName(true);
    const response = await axios.post(`${API_URL}/api/account/valid-username`, {
      username,
    });

    const { available } = response.data;

    setValidUserName(available);
    setLoadUserName(false);

    return response.data;
  } catch (error) {
    onError(error);
    return error;
  }
};

export const getProfileService = async () => {
  try {
    const userToken = await AsyncStorage.getItem("userToken");
    const response = await axios.post(
      `${API_URL}/api/auth/get-profile-service`,
      {},
      {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    return {
      error,
    };
  }
};

type ProfileProps = {
  avatar: string;
  username: string;
  name: string;
  phone: string;
  bio: string;
  country: string;
};

export const updateProfileService = async (details: ProfileProps) => {
  try {
    const userToken = await AsyncStorage.getItem("userToken");

    await axios.post(
      `${API_URL}/api/auth/update-profile`,
      {
        ...details,
      },
      {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      }
    );
    return {
      success: true,
    };
  } catch (error) {
    return {
      success: false,
      error,
    };
  }
};

// Send email
export const resetPasswordService = async (email: string) => {
  try {
    await axios.post(`${API_URL}/api/auth/reset-password`, {
      email: email,
    });
  } catch (error) {
    console.log({ error });
  }
};

// Verify code email
export const verifyResetPasswordService = async (
  email: string,
  code: string
) => {
  try {
    const response = await axios.post(`${API_URL}/api/auth/verification`, {
      email: email,
      code: code,
    });
    return response.data.token;
  } catch (error) {
    console.log({ error });
  }
};

// Change new password
export const changePasswordService = async (
  password: string,
  token: string
) => {
  try {
    await axios.post(
      `${API_URL}/api/auth/change-password`,
      {
        password: password,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    console.log({ error });
  }
};


export const signInPhoneService = async (phone: string) => {
  console.log("Calling signInPhoneService with phone:", phone); // Log event
  try {
    const response = await axios.post(`${API_URL}/api/auth/v2/phone`, {
      user: phone,
    });
    console.log("signInPhoneService response:", response.data); // Log event

    // Si exist = true, el usuario existe y llevar a la pantalla de verificar codigo
    // si exist = false, el usuario no existe y llevar a verificar codigo para despues completar el registro
    // Respuesta: { success: true, exist: true | false, user: phone }

    return response.data;
  } catch (error) {
    console.error("signInPhoneService error:", error); // Log event
    return {
      success: false,
      exist: false,
      user: null,
      error: error.message,
    };
  }
};

export const signInEmailService = async (email: string) => {
  try {
    const response = await axios.post(`${API_URL}/api/auth/v2/email`, {
      user: email,
    });

    return response.data;
  } catch (error) {
    return {
      success: false,
      exist: false,
      user: null,
      error,
    };
  }
};

export const signInEmailAndPasswordService = async (
  email: string,
  password: string
) => {
  try {
    const response = await axios.post(`${API_URL}/api/auth/v2/email/signin`, {
      user: email,
      password: password,
    });
    return response.data;
  } catch (error) {
    return {
      success: false,
      error,
    };
  }
};

export const verifyCodeService = async (user: string, code: string) => {
  console.log("Calling verifyCodeService with user:", user, "and code:", code); // Log event
  try {
    const response = await axios.post(`${API_URL}/api/auth/v2/verify`, {
      user: user,
      code: code,
    });
    console.log("Verification response:", response.data); // Log event
    return response.data;
  } catch (error) {
    console.error("Verification error:", error); // Log event
    return {
      success: false,
      message: error.response?.data?.message || error.message,
    };
  }
};

export type PhoneDetails = {
  name: string;
  username: string;
  country: string;
};

export const completeWithPhoneService = async (
  body: PhoneDetails,
  token: string
) => {
  console.log("Calling completeWithPhoneService with body:", body, "and token:", token); // Log event
  try {
    const response = await axios.post(
      `${API_URL}/api/auth/v2/phone/complete`,
      {
        ...body,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log("Complete with phone response:", response.data); //

    return response.data;
  } catch (error) {
    console.error("Complete with phone error:", error); // Log event
    return {
      success: false,
      message: error.message,
    };
  }
};

type EmailDetails = {
  email: string;
  name: string;
  username: string;
  password: string;
};

export const completeWithEmailService = async (
  body: EmailDetails,
  token: string
) => {
  try {
    const response = await axios.post(
      `${API_URL}/api/auth/v2/email/complete`,
      {
        ...body,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    // Despues de verificar el codigo (email) enviar 'EmailDetails' para completar el registro
    // Respuesta: { success: true, userID: uuidv4() }
    return response.data;
  } catch (error) {
    return {
      success: false,
      error,
    };
  }
};

export const signInWithGoogleService = async (accessToken: string) => {
  try {
    const response = await axios.post(`${API_URL}/api/auth/google`, {
      accessToken,
    });

    await AsyncStorage.setItem("userToken", response.data.token);

    return { ...response.data.userDetails, token: response.data.token };
  } catch (error) {
    return null;
  }
};

export const signInWithFacebookService = async (accessToken: string) => {
  try {
    const response = await axios.post(`${API_URL}/api/auth/facebook`, {
      accessToken,
    });

    await AsyncStorage.setItem("userToken", response.data.token);

    return { ...response.data.userDetails, token: response.data.token };
  } catch (error) {
    return null;
  }
};

export const getCountryListService = async () => {
  try {
    const result = await axios.get(`${API_URL}/api/auth/country`);
    return result.data;
  } catch (error) {
    return [];
  }
};

export const aboutService = async (userID: string) => {
  const response = await axios.post(`${API_URL}/api/auth/about`, { userID });
  return response.data;
};