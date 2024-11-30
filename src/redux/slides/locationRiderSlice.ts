import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface LocationDetails {
  latitude: number;
  longitude: number;
}

interface LocationState {
  location: LocationDetails | null;
  latitude: number | null;
  longitude: number | null;
}

interface SetLocationDataPayload {
  location: LocationDetails;
}

const initialState: LocationState = {
  location: null,
  latitude: null,
  longitude: null,
};

const locationRiderSlice = createSlice({
  name: 'location',
  initialState,
  reducers: {
    setLocationRiderData: (
      state,
      action: PayloadAction<SetLocationDataPayload | null>,
    ) => {
      if (action.payload) {
        state.location = action.payload.location;
        state.latitude = action.payload.location.latitude;
        state.longitude = action.payload.location.longitude;
      }
    },
  },
});

export const { setLocationRiderData } = locationRiderSlice.actions;
export default locationRiderSlice.reducer;