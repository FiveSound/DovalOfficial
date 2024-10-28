import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { searchResults } from '../../services/search';

interface User {
  id: number;
  userID: string;
  avatar: string;
  name: string;
  follower_count: number;
  follow: boolean;
  verify: number;
  username: string;
}

interface SearchState {
  query: string;
  users: User[];
  isLoading: boolean;
  isError: boolean;
  error: string | null;
}

const initialState: SearchState = {
  query: '',
  users: [],
  isLoading: false,
  isError: false,
  error: null,
};

// Asynchronous thunk for performing search
export const fetchSearchResults = createAsyncThunk<
  User[],
  string,
  { rejectValue: string }
>('search/fetchSearchResults', async (query, thunkAPI) => {
  try {
    const result = await searchResults(query);
    const usersWithId: User[] = result.accounts.map(
      (account: any, index: number) => ({
        ...account,
        id: account.id || index, // Asegura que cada usuario tenga un `id`
      }),
    );
    console.log('[fetchSearchResults] Fetched Data with IDs:', usersWithId);
    return usersWithId;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(
      error.message || 'Failed to fetch search results',
    );
  }
});

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearchQuery(state, action: PayloadAction<string>) {
      state.query = action.payload;
    },
    clearSearchResults(state) {
      state.users = [];
      state.query = '';
      state.isError = false;
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchSearchResults.pending, state => {
        state.isLoading = true;
        state.isError = false;
        state.error = null;
      })
      .addCase(
        fetchSearchResults.fulfilled,
        (state, action: PayloadAction<User[]>) => {
          state.isLoading = false;
          state.users = action.payload;
          console.log('[searchSlice] Users state updated:', state.users);
        },
      )
      .addCase(fetchSearchResults.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.payload || 'Something went wrong';
      });
  },
});

export const { setSearchQuery, clearSearchResults } = searchSlice.actions;
export default searchSlice.reducer;
