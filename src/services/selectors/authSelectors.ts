import type { TUser } from '@/utils/types';
import type { SerializedError } from '@reduxjs/toolkit';
import type { RootState } from '@services/store';

export const selectAuthUser = (state: RootState): TUser | null => state.auth.user;

export const selectIsAuthChecked = (state: RootState): boolean =>
  state.auth.isAuthChecked;

export const selectAuthIsLoading = (state: RootState): boolean => state.auth.isLoading;

export const selectAuthError = (state: RootState): SerializedError | null =>
  state.auth.error;

export const selectLoginError = (state: RootState): SerializedError | null =>
  state.auth.loginError;

export const selectRegisterError = (state: RootState): SerializedError | null =>
  state.auth.registerError;

export const selectForgotPasswordLoading = (state: RootState): boolean =>
  state.auth.forgotPasswordLoading;

export const selectForgotPasswordError = (state: RootState): SerializedError | null =>
  state.auth.forgotPasswordError;

export const selectResetPasswordLoading = (state: RootState): boolean =>
  state.auth.resetPasswordLoading;

export const selectResetPasswordError = (state: RootState): SerializedError | null =>
  state.auth.resetPasswordError;

export const selectUpdateUserLoading = (state: RootState): boolean =>
  state.auth.updateUserLoading;

export const selectUpdateUserError = (state: RootState): SerializedError | null =>
  state.auth.updateUserError;

export const selectLogoutLoading = (state: RootState): boolean =>
  state.auth.logoutLoading;

export const selectLogoutError = (state: RootState): SerializedError | null =>
  state.auth.logoutError;
