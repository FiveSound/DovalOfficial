import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { UserType } from '../../types/User.types';
import { verifyCodeService, signInEmailService, signInPhoneService, signInEmailAndPasswordService } from '../../services/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Interfaces para las respuestas de los servicios
interface VerifyCodeResponse {
  success: boolean;
  token?: string;
  userDetails?: UserType;
  message?: string;
}

interface ResendCodeResponse {
  success: boolean;
  error?: string;
}

interface LoginResponse {
  success: boolean;
  token?: string;
  userDetails?: UserType;
  message?: string;
}

// Estado inicial
interface AuthState {
  user: UserType | null;
  isAuthenticated: boolean;
  isLoadingApp: boolean;
  isVerifying: boolean;
  isVerified: boolean;
  codeError: boolean;
  codeSuccess: boolean;
  message: string | null;
  isResending: boolean;
  canResend: boolean;
  resendTimer: number;
  screenLoading: boolean;
  token: string | null; 
  loginLoading: boolean;
  loginError: boolean;
  loginMessage: string | null;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoadingApp: false,
  isVerifying: false,
  isVerified: false,
  codeError: false,
  codeSuccess: false,
  message: null,
  isResending: false,
  canResend: false,
  resendTimer: 10,
  screenLoading: false,
  token: null,
  loginLoading: false,
  loginError: false,
  loginMessage: null,
};

// Thunk para verificar el código
export const verifyCode = createAsyncThunk<
  VerifyCodeResponse, 
  { user: string; code: string },
  { rejectValue: string }
>(
  'auth/verifyCode',
  async ({ user, code }, thunkAPI) => {
    try {
      const response = await verifyCodeService(user, code);
      if (response.success && response.token && response.userDetails) {
        await AsyncStorage.setItem('userToken', response.token);
        return { success: true, token: response.token, userDetails: response.userDetails };
      } else {
        return thunkAPI.rejectWithValue(response.message || 'Error al verificar el código');
      }
    } catch (error) {
      return thunkAPI.rejectWithValue('Error al verificar el código');
    }
  }
);

// Thunk para reenviar el código
export const resendCode = createAsyncThunk<
  ResendCodeResponse, 
  { method: number; phone: string; user: string },
  { rejectValue: string }
>(
  'auth/resendCode',
  async ({ method, phone, user }, thunkAPI) => {
    try {
      const response = method === 0 
        ? await signInPhoneService(phone) 
        : await signInEmailService(user);
      if (response.success) {
        return { success: true };
      } else {
        return thunkAPI.rejectWithValue(response.error || 'Error al reenviar el código');
      }
    } catch (error) {
      return thunkAPI.rejectWithValue('Error al reenviar el código');
    }
  }
);

// Thunk para el inicio de sesión
export const login = createAsyncThunk<
  LoginResponse,
  { email: string; password: string },
  { rejectValue: string }
>(
  'auth/login',
  async ({ email, password }, thunkAPI) => {
    try {
      const response = await signInEmailAndPasswordService(email, password);
      if (response.success && response.token && response.userDetails) {
        await AsyncStorage.setItem('userToken', response.token);
        return { success: true, token: response.token, userDetails: response.userDetails };
      } else {
        return thunkAPI.rejectWithValue(response.message || 'Error al iniciar sesión');
      }
    } catch (error) {
      return thunkAPI.rejectWithValue('Error al iniciar sesión');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signInStart(state) {
      state.isLoadingApp = true;
    },
    signInSuccess(state, action: PayloadAction<UserType>) {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.isLoadingApp = false;
    },
    signInFailure(state) {
      state.isLoadingApp = false;
    },
    signOut(state) {
      state.user = null;
      state.isAuthenticated = false;
      state.isLoadingApp = false;
      state.token = null; // Limpiar el token al cerrar sesión
    },
  },
  extraReducers: (builder) => {
    // Thunk para verificar el código
    builder.addCase(verifyCode.pending, (state) => {
      state.isVerifying = true;
      state.isLoadingApp = true;
      state.message = null;
      state.codeError = false;
      state.codeSuccess = false;
    });
    builder.addCase(verifyCode.fulfilled, (state, action) => {
      state.isVerifying = false;
      state.isLoadingApp = false;
      state.isVerified = true;
      state.codeSuccess = true;
      state.message = 'Código verificado correctamente';
      state.user = action.payload.userDetails || null;
      state.isAuthenticated = true;
      state.token = action.payload.token || null; // Almacenar el token en el estado
    });
    builder.addCase(verifyCode.rejected, (state, action) => {
      state.isVerifying = false;
      state.isLoadingApp = false;
      state.codeError = true;
      state.message = action.payload || 'Error al verificar el código';
    });

    // Thunk para reenviar el código
    builder.addCase(resendCode.pending, (state) => {
      state.isResending = true;
      state.isLoadingApp = true;
      state.message = null;
    });
    builder.addCase(resendCode.fulfilled, (state) => {
      state.isResending = false;
      state.isLoadingApp = false;
      state.message = 'Código reenviado con éxito';
      state.resendTimer = 10;
      state.canResend = false;
    });
    builder.addCase(resendCode.rejected, (state, action) => {
      state.isResending = false;
      state.isLoadingApp = false;
      state.message = action.payload || 'Error al reenviar el código';
    });

    // Thunk para el inicio de sesión
    builder.addCase(login.pending, (state) => {
      state.loginLoading = true;
      state.loginError = false;
      state.loginMessage = null;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.loginLoading = false;
      state.isAuthenticated = true;
      state.user = action.payload.userDetails || null;
      state.token = action.payload.token || null;
      state.loginMessage = 'Inicio de sesión exitoso';
    });
    builder.addCase(login.rejected, (state, action) => {
      state.loginLoading = false;
      state.loginError = true;
      state.loginMessage = action.payload || 'Error al iniciar sesión';
    });
  },
});

export const { signInStart, signInSuccess, signInFailure, signOut } = authSlice.actions;
export default authSlice.reducer;