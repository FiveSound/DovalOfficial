import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface LocationDetails {
  latitude: number;
  longitude: number;
}

interface LocationState {
  location: LocationDetails | null;
  isLoading: boolean;
  countryISO: string | null;
  latitude: number | null;
  longitude: number | null;
}

interface SetLocationDataPayload {
  location: LocationDetails;
  countryISO: string | null;
}

const initialState: LocationState = {
  location: null,
  isLoading: true,
  countryISO: null, 
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
        console.log('Setting Location Data in Redux - Location:', action.payload.location);
        state.location = action.payload.location;
        state.latitude = action.payload.location.latitude;
        state.longitude = action.payload.location.longitude;
        state.countryISO = action.payload.countryISO;
      }
    },
  },
});

export const { setLocationData } = locationSlice.actions;
export default locationSlice.reducer;