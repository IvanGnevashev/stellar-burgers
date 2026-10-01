import { getOrderByNumberApi } from '@/utils/burger-api';
import { createSlice, type SerializedError, createAsyncThunk } from '@reduxjs/toolkit';

import type { TOrder } from '@/utils/types';

type TOrderState = {
  order: TOrder | null;
  isLoading: boolean;
  error: SerializedError | null;
};

const initialState: TOrderState = {
  order: null,
  isLoading: false,
  error: null,
};

export const fetchOrder = createAsyncThunk(
  'order/fetchOrder',
  async (number: number) => {
    const response = await getOrderByNumberApi(number);
    return response.orders[0] ?? null;
  }
);

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrder.pending, (state) => {
        state.order = null;
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.order = action.payload;
      })
      .addCase(fetchOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error;
      });
  },
});

export const orderReducer = orderSlice.reducer;
