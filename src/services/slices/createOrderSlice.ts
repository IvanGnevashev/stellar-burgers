import { orderBurgerApi } from '@/utils/burger-api';
import { createAsyncThunk, createSlice, type SerializedError } from '@reduxjs/toolkit';

import type { TOrder } from '@/utils/types';

type TCreateOrderState = {
  order: TOrder | null;
  isLoading: boolean;
  error: SerializedError | null;
};

const initialState: TCreateOrderState = {
  order: null,
  isLoading: false,
  error: null,
};

export const fetchCreateOrder = createAsyncThunk(
  'createOrder/create',
  async (ingredientIds: string[]) => {
    const response = await orderBurgerApi(ingredientIds);
    return response.order;
  }
);

const createOrderSlice = createSlice({
  name: 'createOrder',
  initialState,
  reducers: {
    clearCreateOrder: (state) => {
      state.order = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCreateOrder.pending, (state) => {
        state.order = null;
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCreateOrder.fulfilled, (state, action) => {
        state.order = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(fetchCreateOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error;
      });
  },
});

export const { clearCreateOrder } = createOrderSlice.actions;
export const createOrderReducers = createOrderSlice.reducer;
