import type { SerializedError } from '@reduxjs/toolkit';
import type { RootState } from '@services/store';
import type { TOrder } from '@utils-types';

export const selectCreatedOrder = (state: RootState): TOrder | null =>
  state.createdOrder.order;

export const selectCreateOrderLoading = (state: RootState): boolean =>
  state.createdOrder.isLoading;

export const selectCreateOrderError = (state: RootState): SerializedError | null =>
  state.createdOrder.error;
