import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ReactionsState {
  likes: { [postID: number]: number };
  liked: { [postID: number]: boolean };
  saved: { [postID: number]: boolean };
  savedCount: { [postID: number]: number };
  shared: { [postID: number]: boolean };
  sharedCount: { [postID: number]: number };
}

const initialState: ReactionsState = {
  likes: {},
  liked: {},
  saved: {},
  savedCount: {},
  shared: {},
  sharedCount: {},
};

const reactionsSlice = createSlice({
  name: 'reactions',
  initialState,
  reducers: {
    setLikes(state, action: PayloadAction<{ postID: number; likes: number }>) {
      state.likes[action.payload.postID] = action.payload.likes;
    },
    setLiked(state, action: PayloadAction<{ postID: number; liked: boolean }>) {
      state.liked[action.payload.postID] = action.payload.liked;
    },
    setSaved(state, action: PayloadAction<{ postID: number; saved: boolean }>) {
      state.saved[action.payload.postID] = action.payload.saved;
    },
    setSavedCount(
      state,
      action: PayloadAction<{ postID: number; count: number }>,
    ) {
      state.savedCount[action.payload.postID] = action.payload.count;
    },
    setShared(
      state,
      action: PayloadAction<{ postID: number; shared: boolean }>,
    ) {
      state.shared[action.payload.postID] = action.payload.shared;
    },
    setSharedCount(
      state,
      action: PayloadAction<{ postID: number; count: number }>,
    ) {
      state.sharedCount[action.payload.postID] = action.payload.count;
    },
  },
});

export const {
  setLikes,
  setLiked,
  setSaved,
  setSavedCount,
  setShared,
  setSharedCount,
} = reactionsSlice.actions;
export default reactionsSlice.reducer;
