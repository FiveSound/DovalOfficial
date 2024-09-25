import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Alert } from 'react-native';
import { addToCartService, getCartService, removerCartService } from '../../services/cart';
import { createOrderService } from '../../services/orders';

const initialState = {
  isLoading: false,
  isError: false,
  cart: [],
  submitting: false,
};

export const fetchCart = createAsyncThunk('cart/fetchCart', async (_, { rejectWithValue }) => {
  try {
    const response = await getCartService();
    return response;
  } catch (error) {
    console.error("Error fetching cart:", error);
    return rejectWithValue(error);
  }
});

export const addProduct = createAsyncThunk('cart/addProduct', async (recipeID, { rejectWithValue }) => {
  try {
    const response = await addToCartService(recipeID);
    console.log("Response from add to cart service", response);
    return response;
  } catch (error) {
    console.error("Error adding product:", error);
    return rejectWithValue(error);
  }
});

export const removeProduct = createAsyncThunk('cart/removeProduct', async (recipeID, { rejectWithValue }) => {
  try {
    const response = await removerCartService(recipeID);
    console.log("Response from remove cart service", response);
    return response;
  } catch (error) {
    console.error("Error removing product:", error);
    return rejectWithValue(error);
  }
});

export const createNewOrder = createAsyncThunk('cart/createNewOrder', async (_, { rejectWithValue }) => {
  try {
    const response = await createOrderService();
    return response;
  } catch (error) {
    console.error("Error creating new order:", error);
    return rejectWithValue(error);
  }
});

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    handleEditCart: (state, action) => {
      const { recipeID, remove } = action.payload;
      state.cart = state.cart.map(innerArray => 
        innerArray.map(row => 
          row.recipeID === recipeID ? { ...row, qty: remove ? row.qty - 1 : row.qty + 1 } : row
        )
      );
    },
    handleRemoveCart: (state, action) => {
      const { recipeID } = action.payload;
      state.cart = state.cart.map(innerArray => 
        innerArray.filter(row => row.recipeID !== recipeID)
      ).filter(row => row.length > 0);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cart = action.payload;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        console.error("Fetch cart rejected:", action.payload);
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        if (!action.payload.success) {
          state.cart = state.cart.map(innerArray => 
            innerArray.map(row => 
              row.recipeID === action.payload.recipeID ? { ...row, qty: row.qty - 1 } : row
            )
          );
        }
        if (action.payload.isNew) {
          fetchCart();
        }
      })
      .addCase(addProduct.rejected, (state, action) => {
        console.error("Add product rejected:", action.payload);
      })
      .addCase(removeProduct.fulfilled, (state, action) => {
        if (!action.payload.success) {
          state.cart = state.cart.map(innerArray => 
            innerArray.map(row => 
              row.recipeID === action.payload.recipeID ? { ...row, qty: row.qty + 1 } : row
            )
          );
        }
        if (action.payload.isLast) {
          state.cart = state.cart.map(innerArray => 
            innerArray.filter(row => row.recipeID !== action.payload.recipeID)
          ).filter(row => row.length > 0);
        }
      })
      .addCase(removeProduct.rejected, (state, action) => {
        console.error("Remove product rejected:", action.payload);
      })
      .addCase(createNewOrder.pending, (state) => {
        state.submitting = true;
      })
      .addCase(createNewOrder.fulfilled, (state, action) => {
        state.submitting = false;
        // Handle navigation and socket emission here
      })
      .addCase(createNewOrder.rejected, (state, action) => {
        state.submitting = false;
        Alert.alert("No se ha podido crear tu orden!");
        console.error("Create new order rejected:", action.payload);
      });
  },
});

export const { handleEditCart, handleRemoveCart } = cartSlice.actions;
export default cartSlice.reducer;