import axios from "axios";
import KeyApi from "../constants/KeyApi";

export const mapAddressComponents = (
  addressComponents: GeocodeResponse["results"][0]["address_components"]
): AddressDetails => {
  const addressDetails: AddressDetails = {};

  addressComponents.forEach((component) => {
    const types = component.types;
    if (types.includes("street_number")) {
      addressDetails.street = `${component.long_name} ${addressDetails.street || ""}`.trim();
    }
    if (types.includes("route")) {
      addressDetails.street = `${addressDetails.street || ""} ${component.long_name}`.trim();
    }
    if (types.includes("neighborhood")) {
      addressDetails.neighborhood = component.long_name;
    }
    if (types.includes("locality")) {
      addressDetails.city = component.long_name;
    }
    if (types.includes("administrative_area_level_1")) {
      addressDetails.state = component.long_name;
    }
    if (types.includes("postal_code")) {
      addressDetails.postalCode = component.long_name;
    }
    if (types.includes("country")) {
      addressDetails.country = component.long_name;
    }
  });

  return addressDetails;
};

interface GeocodeResponse {
  results: Array<{
    address_components: Array<{
      long_name: string;
      short_name: string;
      types: string[];
    }>;
    formatted_address: string;
    geometry: {
      location: {
        lat: number;
        lng: number;
      };
      location_type: string;
      viewport: {
        northeast: {
          lat: number;
          lng: number;
        };
        southwest: {
          lat: number;
          lng: number;
        };
      };
    };
    place_id: string;
    types: string[];
  }>;
  status: string;
  error_message?: string;
}

interface AddressDetails {
  street?: string;
  neighborhood?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  country?: string;
}

export const getAddressDetailsService = async (
  latitude: number | null,
  longitude: number | null
): Promise<AddressDetails | null> => {
  try {
    // if (!latitude || !longitude) throw Error("Lo have coords!");

    const response = await axios.get<GeocodeResponse>(`https://maps.googleapis.com/maps/api/geocode/json`, {
      params: {
        latlng: `${latitude},${longitude}`,
        key: KeyApi.GoogleMapApi,
      },
    });

    if (response.data.status !== "OK") {
      console.error("Geocoding API error:", response.data.status, response.data.error_message);
      return null;
    }

    const addressComponents = response.data.results[0].address_components;
    const location = response.data.results[0].geometry.location;
    console.log({ location });

    const addressDetails: AddressDetails = {};

    addressDetails.latitude = location.lat;
    addressDetails.longitude = location.lng;

    addressComponents.forEach((component) => {
      const types = component.types;
      if (types.includes("street_number")) {
        addressDetails.street = component.long_name + " " + (addressDetails.street || "");
      }
      if (types.includes("route")) {
        addressDetails.street = (addressDetails.street || "") + component.long_name;
      }
      if (types.includes("neighborhood")) {
        addressDetails.neighborhood = component.long_name;
      }
      if (types.includes("locality")) {
        addressDetails.city = component.long_name;
      }
      if (types.includes("administrative_area_level_1")) {
        addressDetails.state = component.long_name;
      }
      if (types.includes("postal_code")) {
        addressDetails.postalCode = component.long_name;
      }
      if (types.includes("country")) {
        addressDetails.country = component.long_name;
      }
    });

    return addressDetails;
  } catch (error) {
    console.error("Error fetching address details:", error);
    return null;
  }
};

export const getAddressDetailsByPlaceIdService = async (placeId: string): Promise<AddressDetails | null> => {
  try {
    const response = await axios.get<GeocodeResponse>("https://maps.googleapis.com/maps/api/geocode/json", {
      params: {
        place_id: placeId,
        key: KeyApi.GoogleMapApi,
      },
    });

    if (response.data.status !== "OK") {
      console.error("Geocoding API error:", response.data.status, response.data.error_message);
      return null;
    }

    const addressComponents = response.data.results[0].address_components;
    const addressDetails = mapAddressComponents(addressComponents);

    // Extraer latitud y longitud
    const location = response.data.results[0].geometry.location;
    addressDetails.latitude = location.lat;
    addressDetails.longitude = location.lng;

    console.log({ location });

    return addressDetails;
  } catch (error) {
    console.error("Error fetching address details by Place ID:", error);
    return null;
  }
};

export const searchLocalAddressService = async (search: string) => {
  try {
    const isString = typeof search === "string";

    const formatLocation = isString ? search.replace(/\s/g, "+") : undefined;

    if (formatLocation) {
      const MAPS_URL = `https://maps.googleapis.com/maps/api/place/queryautocomplete/json?input=${formatLocation}&language=es&types=geocode&key=${KeyApi.GoogleMapApi}`;
      const result = await axios.get(MAPS_URL);

      const predictions = result.data?.predictions;

      return predictions ? predictions : [];
    }

    return [];
  } catch (error) {
    return [];
  }
};
