import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface NavigationState {
  currentSlide: number;
  recipeID: number | null;
  businessID: number | null;
}

const initialState: NavigationState = {
  currentSlide: 0,
  recipeID: null,
  businessID: null,
};

const navigationSlice = createSlice({
  name: 'navigation',
  initialState,
  reducers: {
    setCurrentSlide(state, action: PayloadAction<number>) {
      state.currentSlide = action.payload;
    },
    setRecipeID(state, action: PayloadAction<number>) {
      state.recipeID = action.payload;
    },
    setBusinessID(state, action: PayloadAction<number>) {
      state.businessID = action.payload;
    },
    resetNavigation(state) {
      state.currentSlide = 0;
      state.recipeID = null;
      state.businessID = null;
    },
  },
});

export const { setCurrentSlide, setRecipeID, setBusinessID, resetNavigation } =
  navigationSlice.actions;

export default navigationSlice.reducer;
