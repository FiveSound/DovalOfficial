import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Photo {
  url: string;
}

interface FeedData {
  ProfileName: string;
  avatar: string;
  businessID: number | null;
  business_name: string | null;
  categories: string | null;
  cover: string | null;
  date: string;
  description: string;
  discount: string | null;
  hashtag: string[];
  id: number;
  latitude: number | null;
  longitude: number | null;
  mediaType: number;
  name: string;
  photos: Photo[];
  price: string | null;
  recipeID: number | null;
  recipeName: string | null;
  songID: number | null;
  tags: string[];
  thumbnail: string;
  topics: string[];
  userID: string;
  username: string;
  verify: number;
  videos: any[];
}

interface NavigationState {
  currentSlide: number;
  recipeID: number | null;
  businessID: number | null;
  postID: number | null;
  CurrentFeed: FeedData;
  isLoading: boolean;
  isError: boolean;
  orderID: number | null;
  cartID: number | null;
}

const initialState: NavigationState = {
  currentSlide: 0,
  recipeID: null,
  businessID: null,
  postID: null,
  CurrentFeed: [],
  isLoading: false,
  isError: false,
  orderID: null,
  cartID: null,
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
    setPostID(state, action: PayloadAction<number>) {
      state.postID = action.payload;
    },
    setFeedData(state, action: PayloadAction<FeedData[]>) {
      state.CurrentFeed = action.payload;
    },
    setOrderID(state, action: PayloadAction<number>) {
      state.orderID = action.payload;
    },
    setCartID(state, action: PayloadAction<number>) {
      state.cartID = action.payload;
    },
    resetNavigation(state) {
      state.currentSlide = 0;
      state.recipeID = null;
      state.businessID = null;
      state.postID = null;
      state.cartID = null;
    },
  },
});

export const { setCurrentSlide, setRecipeID, setBusinessID, resetNavigation, setPostID, setFeedData, setOrderID, setCartID } = navigationSlice.actions;

export default navigationSlice.reducer;
