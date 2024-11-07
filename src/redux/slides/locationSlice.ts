import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface LocationDetails {
  accuracy: number;
  altitude: number;
  altitudeAccuracy: number;
  heading: number;
  latitude: number;
  longitude: number;
  speed: number;
}

interface LocationState {
  location: LocationDetails | null;
  country: string;
  isLocationAvailable: boolean;
  isLoading: boolean;
  countryKey: string | null;
  latitude: number | null;
  longitude: number | null;
}

interface SetLocationDataPayload {
  location: LocationDetails;
  country: string;
  countryKey: string | null;
}

const initialState: LocationState = {
  location: null,
  country: '',
  isLocationAvailable: false,
  isLoading: true,
  countryKey: null,
  latitude: null,
  longitude: null,
};

const locationSlice = createSlice({
  name: 'location',
  initialState,
  reducers: {
    setLocationData: (
      state,
      action: PayloadAction<SetLocationDataPayload | null>,
    ) => {
      if (action.payload) {
        state.location = action.payload.location;
        state.latitude = action.payload.location.latitude;
        state.longitude = action.payload.location.longitude;
        state.country = action.payload.country;
        state.countryKey = action.payload.countryKey;
        state.isLocationAvailable = true;
      } else {
        state.location = null;
        state.latitude = null;
        state.longitude = null;
        state.country = '';
        state.countryKey = null;
        state.isLocationAvailable = false;
      }
    },
  },
});

export const { setLocationData } = locationSlice.actions;
export default locationSlice.reducer;