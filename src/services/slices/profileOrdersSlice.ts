import { getOrdersApi } from '@/utils/burger-api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import type { TOrder } from '@/utils/types';
import type { SerializedError } from '@reduxjs/toolkit';

type TProfileOrders = {
  orders: TOrder[];
  isLoading: boolean;
  error: SerializedError | null;
};

const initialState: TProfileOrders = {
  orders: [],
  isLoading: false,
  error: null,
};

export const fetchProfileOrders = createAsyncThunk('fetchProfileOrders', async () => {
  const response = await getOrdersApi();
  return response;
});

const profileOrdersSlice = createSlice({
  name: 'profileOrders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfileOrders.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchProfileOrders.fulfilled, (state, action) => {
        state.orders = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchProfileOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error;
      });
  },
});

export const profileOrdersReducer = profileOrdersSlice.reducer;
