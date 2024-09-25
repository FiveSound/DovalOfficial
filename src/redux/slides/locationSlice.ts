import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    location: null,
    country: '',
    isLocationAvailable: false,
    isLoading: true,
    countryKey: null,
    latitude: null,
    longitude: null
};

const locationSlice = createSlice({
    name: 'location',
    initialState,
    reducers: {
        setLocationData: (state, action) => {
            return { ...state, ...action.payload };
        }
    }
});

export const { setLocationData } = locationSlice.actions;
export default locationSlice.reducer;