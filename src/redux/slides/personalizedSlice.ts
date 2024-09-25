import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getStatusTutorialService } from '../../services/personalized';

export const fetchPersonalizedStatus = createAsyncThunk(
  'personalized/fetchStatus',
  async () => {
    const response = await getStatusTutorialService();
    return response.data;
  }
);

const personalizedSlice = createSlice({
  name: 'personalized',
  initialState: {
    isLoading: false,
    tutorialCompleted: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPersonalizedStatus.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchPersonalizedStatus.fulfilled, (state, action) => {
        state.isLoading = false;
        state.tutorialCompleted = action.payload.tutorial;
      })
      .addCase(fetchPersonalizedStatus.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export default personalizedSlice.reducer;