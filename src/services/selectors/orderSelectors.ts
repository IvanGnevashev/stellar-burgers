import type { TOrder } from '@/utils/types';
import type { SerializedError } from '@reduxjs/toolkit';
import type { RootState } from '@services/store';

export const selectOrder = (state: RootState): TOrder | null => state.order.order;

export const selectOrderLoading = (state: RootState): boolean => state.order.isLoading;

export const selectOrderError = (state: RootState): SerializedError | null =>
  state.order.error;
