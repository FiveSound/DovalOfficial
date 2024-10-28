import { createSlice } from '@reduxjs/toolkit';

interface ScrollState {
  isScrollEnabled: boolean;
}

const initialState: ScrollState = {
  isScrollEnabled: true,
};

const scrollSlice = createSlice({
  name: 'scroll',
  initialState,
  reducers: {
    enableScroll: state => {
      state.isScrollEnabled = true;
    },
    disableScroll: state => {
      state.isScrollEnabled = false;
    },
  },
});

export const { enableScroll, disableScroll } = scrollSlice.actions;
export default scrollSlice.reducer;
