import type { TFeedState, TOrder } from '@/utils/types';
import type { SerializedError } from '@reduxjs/toolkit';
import type { RootState } from '@services/store';

export const selectFeedsOrders = (state: RootState): TOrder[] => state.feed.orders;

export const selectFeedsLoading = (state: RootState): boolean => state.feed.isLoading;

export const selectFeedsError = (state: RootState): SerializedError | null =>
  state.feed.error;

export const selectFeed = (state: RootState): TFeedState => state.feed;
