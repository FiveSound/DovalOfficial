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
  latitude?: number;
  longitude?: number;
  formatted_address?: string;
}

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

    const location = response.data.results[0].geometry.location;

    addressDetails.latitude = location.lat;
    addressDetails.longitude = location.lng;
    addressDetails.formatted_address = response.data.results[0].formatted_address;

    return addressDetails;
  } catch (error) {
    console.error("Error fetching address details by Place ID:", error);
    return null;
  }
};

interface Prediction {
  description: string;
  place_id: string;
  // Agrega otros campos que necesites
}

interface QueryAutocompleteResponse {
  predictions: Prediction[];
  status: string;
  // Otros campos según la documentación
}

export const searchLocalAddressService = async (search: string): Promise<Prediction[]> => {
  try {
    const isString = typeof search === "string";
    const formatLocation = isString ? encodeURIComponent(search) : undefined;

    if (!formatLocation) throw Error("Invalid search location");

    const MAPS_URL = `https://maps.googleapis.com/maps/api/place/queryautocomplete/json?input=${formatLocation}&language=es&types=geocode&key=${KeyApi.GoogleMapApi}`;
    const result = await axios.get<QueryAutocompleteResponse>(MAPS_URL);

    const predictions = result.data.predictions || [];

    const filteredPredictions = predictions.filter((prediction) => !!prediction.place_id) || [];

    return filteredPredictions;
  } catch (error) {
    return [];
  }
};

export const getAddressDetailsByCoordsIdService = async (latitude: number, longitude: number) => {
  try {
    const response = await axios.get<GeocodeResponse>("https://maps.googleapis.com/maps/api/geocode/json", {
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
    const addressDetails = mapAddressComponents(addressComponents);

    const location = response.data.results[0].geometry.location;

    addressDetails.latitude = location.lat;
    addressDetails.longitude = location.lng;
    addressDetails.formatted_address = response.data.results[0].formatted_address;

    return addressDetails;
  } catch (error) {
    console.error("Error fetching address details by Place ID:", error);
    return null;
  }
};
