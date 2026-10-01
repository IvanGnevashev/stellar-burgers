import type { TConstructorIngredient, TConstructorState } from '@/utils/types';
import type { RootState } from '@services/store';

export const selectBun = (state: RootState): TConstructorIngredient | null =>
  state.burger.bun;

export const selectIngredients = (state: RootState): TConstructorIngredient[] =>
  state.burger.ingredients;

export const selectConstructor = (state: RootState): TConstructorState => state.burger;
