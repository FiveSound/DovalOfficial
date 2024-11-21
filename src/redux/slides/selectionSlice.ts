import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SelectionState {
  selectedItem: any | null;
}

const initialState: SelectionState = {
  selectedItem: null,
};

const selectionSlice = createSlice({
  name: 'selection',
  initialState,
  reducers: {
    selectItem(state, action: PayloadAction<any>) {
      state.selectedItem = action.payload;
    },
    clearSelection(state) {
      state.selectedItem = null;
    },
  },
});

export const { selectItem, clearSelection } = selectionSlice.actions;
export default selectionSlice.reducer;
