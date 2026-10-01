import { combineReducers } from '@reduxjs/toolkit';

import { authReducer } from './slices/authSlice';
import { burgerReducer } from './slices/burgerSlice';
import { createOrderReducers } from './slices/createOrderSlice';
import { feedReducer } from './slices/feedsSlice';
import { ingredientsReducer } from './slices/ingredientsSlice';
import { orderReducer } from './slices/orderSlice';
import { profileOrdersReducer } from './slices/profileOrdersSlice';

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  feed: feedReducer,
  order: orderReducer,
  burger: burgerReducer,
  createdOrder: createOrderReducers,
  auth: authReducer,
  profileOrders: profileOrdersReducer,
});
