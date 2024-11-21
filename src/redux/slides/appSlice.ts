import { createSlice } from '@reduxjs/toolkit';

interface AppState {
  reloadKey: number;
}

const initialState: AppState = {
  reloadKey: 0,
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    reloadApp(state) {
      state.reloadKey += 1;
    },
  },
});

export const { reloadApp } = appSlice.actions;
export default appSlice.reducer;
