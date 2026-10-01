import type { TOrder } from '@/utils/types';
import type { SerializedError } from '@reduxjs/toolkit';
import type { RootState } from '@services/store';

export const selectProfileOrders = (state: RootState): TOrder[] =>
  state.profileOrders.orders;

export const selectProfileOrdersLoading = (state: RootState): boolean =>
  state.profileOrders.isLoading;

export const selectProfileOrdersError = (state: RootState): SerializedError | null =>
  state.profileOrders.error;
