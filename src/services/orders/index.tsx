import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "../index";
import { QueryKeyType } from "../../types/ReactQuery.type";
import KeyApi from "../../constants/KeyApi";
import { BusinessAddressType } from "../../types/FormType";

export const createOrderService = async () => {
  try {
    const userToken = await AsyncStorage.getItem("userToken");

    const response = await axios.post(
      `${API_URL}/api/orders/create`,
      {},
      {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error creating order:", error);
    return error;
  }
};

export const getOrderIDService = async ({ queryKey }: QueryKeyType) => {
  try {
    const userToken = await AsyncStorage.getItem("userToken");

    const response = await axios.post(
      `${API_URL}/api/orders/get`,
      {
        orderID: queryKey[1],
      },
      {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log({ orderID: error });
    return null;
  }
};

export const searchLocationsService = async ({ queryKey }: QueryKeyType): Promise<BusinessAddressType[]> => {
  try {
    const direccion = queryKey[1];

    const isString = typeof direccion === "string";

    const formatLocation = isString ? direccion.replace(/\s/g, "+") : undefined;

    if (formatLocation) {
      const MAPS_URL = `https://maps.googleapis.com/maps/api/place/queryautocomplete/json?input=${formatLocation}&language=es&types=geocode&key=${KeyApi.GoogleMapApi}`;
      const result = await axios.get(MAPS_URL);

      const predictions = result.data?.predictions;

      if (predictions && predictions.length > 0) {
        // Mapea las predicciones a BusinessAddressType
        return predictions.map((prediction: any) => ({
          address: prediction.description,
          latitude: 0, // Se actualizará al seleccionar una ubicación
          longitude: 0, // Se actualizará al seleccionar una ubicación
        }));
      }
    }

    return [];
  } catch (error) {
    console.error("Error en searchLocationsService:", error);
    return [];
  }
};

export const searchLocationByPlaceID = async ({ queryKey }: QueryKeyType): Promise<BusinessAddressType> => {
  try {
    const placeID = queryKey[1];
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?place_id=${placeID}&key=${KeyApi.GoogleMapApi}`
    );

    if (response.data && response.data.results && response.data.results.length > 0) {
      const result = response.data.results[0];
      const address = result.formatted_address;
      const latitude = result.geometry.location.lat;
      const longitude = result.geometry.location.lng;

      return {
        address,
        latitude,
        longitude,
      };
    }

    return {} as BusinessAddressType;
  } catch (error) {
    console.error("Error en searchLocationByPlaceID:", error);
    return {} as BusinessAddressType;
  }
};

export const addNewLocationService = async (body: object) => {
  try {
    const userToken = await AsyncStorage.getItem("userToken");

    const response = await axios.post(
      `${API_URL}/api/orders/add-new-location`,
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
  } catch (error) {
    return error;
  }
};

export const getMyLocations = async () => {
  try {
    const userToken = await AsyncStorage.getItem("userToken");

    const response = await axios.post(
      `${API_URL}/api/orders/get-locations`,
      {},
      {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    return [];
  }
};

export const setDefaultLocationService = async (locationID: string) => {
  try {
    const userToken = await AsyncStorage.getItem("userToken");

    const response = await axios.post(
      `${API_URL}/api/orders/set-default-location`,
      {
        locationID: locationID,
      },
      {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      }
    );

    if (response.data.success) {
      return true; // Operación exitosa
    }

    return false;
  } catch (error) {
    return false;
  }
};

export const getDefaultLocationService = async () => {
  try {
    const userToken = await AsyncStorage.getItem("userToken");

    const response = await axios.post(
      `${API_URL}/api/orders/default-location`,
      {},
      {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    return null;
  }
};

export const calculateCostsService = async () => {
  try {
    const userToken = await AsyncStorage.getItem("userToken");

    const response = await axios.post(
      `${API_URL}/api/orders/calculate-costs`,
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

export const getPendingOrders = async () => {
  try {
    const userToken = await AsyncStorage.getItem("userToken");

    const response = await axios.post(
      `${API_URL}/api/orders/pending-orders`,
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

export const cancelOrderService = async (orderID: string) => {
  try {
    const userToken = await AsyncStorage.getItem("userToken");

    const response = await axios.post(
      `${API_URL}/api/orders/cancel`,
      {
        orderID,
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

export const availableService = async () => {
  try {
    const userToken = await AsyncStorage.getItem("userToken");
    const response = await axios.post(
      `${API_URL}/api/orders/verificate`,
      {},
      {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    return false;
  }
};

export const verificateOrderService = async () => {
  try {
    const userToken = await AsyncStorage.getItem("userToken");

    const response = await axios.post(
      `${API_URL}/api/orders/resume`,
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


export const getOrdersService = async () => {
  const userToken = await AsyncStorage.getItem("userToken");

  const response = await axios.post(
    `${API_URL}/api/orders`,
    {},
    {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    }
  );

  return response.data;
};

export const getRiderDetailsService = async ({ queryKey }: QueryKeyType) => {
  try {
    const userToken = await AsyncStorage.getItem("userToken");

    const response = await axios.post(
      `${API_URL}/api/rider/details`,
      { riderID: queryKey[1] },
      {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      }
    );

    return response.data;

    return {};
  } catch (error) {
    return error;
  }
};

export const getCurrentLocationService = (): Promise<BusinessAddressType | null> => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const geocodingUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${KeyApi.GoogleMapApi}`;

        axios
          .get(geocodingUrl)
          .then((response) => {
            if (
              response.data &&
              response.data.results &&
              response.data.results.length > 0
            ) {
              const address = response.data.results[0].formatted_address;
              resolve({ address, latitude, longitude });
            } else {
              console.error("No se encontraron resultados en la Geocoding API.");
              resolve(null);
            }
          })
          .catch((error) => {
            console.error("Error en la solicitud de Geocoding:", error);
            resolve(null); // Evita rechazar la promesa para manejarlo en el componente
          });
      },
      (error) => {
        console.error("Error obteniendo ubicación actual:", error);
        reject(error);
      },
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  });
};

// Nuevo servicio para obtener todos los eventos
export const fetchAllEventsService = async (): Promise<EventType[]> => {
  try {
    const response = await axios.get(`${KeyApi.API_URL}/events`);
    return response.data.events;
  } catch (error) {
    console.error("Error en fetchAllEventsService:", error);
    return [];
  }
};
