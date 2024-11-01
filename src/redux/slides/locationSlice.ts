import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface LocationState {
  location: {
    accuracy: number;
    altitude: number;
    altitudeAccuracy: number;
    heading: number;
    latitude: number;
    longitude: number;
    speed: number;
  } | null;
  country: string;
  isLocationAvailable: boolean;
  isLoading: boolean;
  countryKey: string | null;
  latitude: number | null;
  longitude: number | null;
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
      action: PayloadAction<LocationState['location']>,
    ) => {
      state.location = action.payload;
      if (action.payload) {
        state.latitude = action.payload.latitude;
        state.longitude = action.payload.longitude;
        state.isLocationAvailable = true;
      } else {
        state.isLocationAvailable = false;
      }
    },
  },
});

export const { setLocationData } = locationSlice.actions;
export default locationSlice.reducer;