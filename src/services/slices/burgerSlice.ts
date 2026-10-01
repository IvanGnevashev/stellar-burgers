import { createSlice, nanoid, type PayloadAction } from '@reduxjs/toolkit';

import type {
  TIngredient,
  TConstructorIngredient,
  TConstructorState,
} from '@/utils/types';

const initialState: TConstructorState = {
  bun: null,
  ingredients: [],
};

const burgerSlice = createSlice({
  name: 'burger',
  initialState,
  reducers: {
    addIngredient: {
      reducer(state, action: PayloadAction<TConstructorIngredient>) {
        if (action.payload.type === 'bun') {
          state.bun = action.payload;
        } else {
          state.ingredients.push(action.payload);
        }
      },
      prepare(ingredient: TIngredient) {
        return {
          payload: { ...ingredient, id: nanoid() },
        };
      },
    },
    removeIngredient(state, action: PayloadAction<string>) {
      state.ingredients = state.ingredients.filter(
        (ingredient) => ingredient.id !== action.payload
      );
    },
    moveIngredient(
      state,
      action: PayloadAction<{ fromIndex: number; toIndex: number }>
    ) {
      const { fromIndex, toIndex } = action.payload;
      const ingredients = state.ingredients;

      if (
        fromIndex < 0 ||
        fromIndex >= ingredients.length ||
        toIndex < 0 ||
        toIndex >= ingredients.length
      ) {
        return;
      }

      const [moveIngredient] = ingredients.splice(fromIndex, 1);
      ingredients.splice(toIndex, 0, moveIngredient);
    },
    clearConstructor(state) {
      state.bun = null;
      state.ingredients = [];
    },
  },
});

export const { addIngredient, removeIngredient, moveIngredient, clearConstructor } =
  burgerSlice.actions;

export const burgerReducer = burgerSlice.reducer;
