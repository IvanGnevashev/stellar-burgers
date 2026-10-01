import {
  forgotPasswordApi,
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  resetPasswordApi,
  updateUserApi,
  type TLoginData,
  type TRegisterData,
} from '@/utils/burger-api';
import { deleteCookie, setCookie } from '@/utils/cookie';
import { createAsyncThunk, createSlice, type SerializedError } from '@reduxjs/toolkit';

import type { TUser } from '@/utils/types';

type TAuthState = {
  user: TUser | null;
  isAuthChecked: boolean;
  isLoading: boolean;
  error: SerializedError | null;
  loginError: SerializedError | null;
  registerError: SerializedError | null;
  forgotPasswordLoading: boolean;
  forgotPasswordError: SerializedError | null;
  resetPasswordLoading: boolean;
  resetPasswordError: SerializedError | null;
  updateUserLoading: boolean;
  updateUserError: SerializedError | null;
  logoutLoading: boolean;
  logoutError: SerializedError | null;
};

const initialState: TAuthState = {
  user: null,
  isAuthChecked: false,
  isLoading: false,
  error: null,
  loginError: null,
  registerError: null,
  forgotPasswordLoading: false,
  forgotPasswordError: null,
  resetPasswordLoading: false,
  resetPasswordError: null,
  updateUserLoading: false,
  updateUserError: null,
  logoutLoading: false,
  logoutError: null,
};

export const fetchCurrentUser = createAsyncThunk('auth/fetchCurrentUser', async () => {
  const response = await getUserApi();
  return response.user;
});

export const loginUser = createAsyncThunk('auth/loginUser', async (data: TLoginData) => {
  const response = await loginUserApi(data);

  setCookie('accessToken', response.accessToken);
  localStorage.setItem('refreshToken', response.refreshToken);

  return response.user;
});

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (data: TRegisterData) => {
    const response = await registerUserApi(data);
    setCookie('accessToken', response.accessToken);
    localStorage.setItem('refreshToken', response.refreshToken);

    return response.user;
  }
);

export const requestPasswordReset = createAsyncThunk(
  'auth/requestPasswordReset',
  async (email: string) => {
    const response = await forgotPasswordApi({ email });
    localStorage.setItem('resetPassword', 'true');

    return response;
  }
);

export const resetPassword = createAsyncThunk(
  'auth/resetPassword',
  async ({ password, token }: Parameters<typeof resetPasswordApi>[0]) => {
    const response = await resetPasswordApi({ password, token });
    localStorage.removeItem('resetPassword');

    return response;
  }
);

export const updateUser = createAsyncThunk(
  'auth/updateUser',
  async (data: Partial<TRegisterData>) => {
    const response = await updateUserApi(data);
    return response.user;
  }
);

export const logoutUser = createAsyncThunk('auth/logoutUser', async () => {
  const response = await logoutApi();

  if (!response.success) {
    throw new Error('Не удалось выйти из аккаунта');
  }

  deleteCookie('accessToken');
  localStorage.removeItem('refreshToken');
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCurrentUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthChecked = true;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(fetchCurrentUser.rejected, (state, action) => {
        state.user = null;
        state.isAuthChecked = true;
        state.isLoading = false;
        state.error = action.error;
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.loginError = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthChecked = true;
        state.isLoading = false;
        state.error = null;
        state.loginError = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isAuthChecked = true;
        state.isLoading = false;
        state.error = action.error;
        state.loginError = action.error;
      })
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.registerError = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoading = false;
        state.isAuthChecked = true;
        state.registerError = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.registerError = action.error;
      })
      .addCase(requestPasswordReset.pending, (state) => {
        state.forgotPasswordLoading = true;
        state.forgotPasswordError = null;
      })
      .addCase(requestPasswordReset.fulfilled, (state) => {
        state.forgotPasswordLoading = false;
      })
      .addCase(requestPasswordReset.rejected, (state, action) => {
        state.forgotPasswordLoading = false;
        state.forgotPasswordError = action.error;
      })
      .addCase(resetPassword.pending, (state) => {
        state.resetPasswordLoading = true;
        state.resetPasswordError = null;
      })
      .addCase(resetPassword.fulfilled, (state) => {
        state.resetPasswordLoading = false;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.resetPasswordLoading = false;
        state.resetPasswordError = action.error;
      })
      .addCase(updateUser.pending, (state) => {
        state.updateUserLoading = true;
        state.updateUserError = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.updateUserLoading = false;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.updateUserLoading = false;
        state.updateUserError = action.error;
      })
      .addCase(logoutUser.pending, (state) => {
        state.logoutLoading = true;
        state.logoutError = null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.logoutLoading = false;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.logoutLoading = false;
        state.logoutError = action.error;
      });
  },
});

export const authReducer = authSlice.reducer;
