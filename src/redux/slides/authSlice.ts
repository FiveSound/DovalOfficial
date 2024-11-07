import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { UserType } from '../../types/User.types';
import {
  verifyCodeService,
  signInEmailService,
  signInPhoneService,
  signInEmailAndPasswordService,
  initialStateService,
} from '../../services/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
  user?: UserType;
  message?: string;
}

interface AuthState {
  user: UserType | null;
  business: boolean | null;
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
  onboarding: boolean;
  businessVerified: boolean;
}

const initialState: AuthState = {
  user: null,
  business: null,
  isAuthenticated: false,
  isLoadingApp: true,
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
  onboarding: false,
  businessVerified: false,
};

// Thunk para cargar el usuario al inicio
export const loadUser = createAsyncThunk<
  LoginResponse,
  void,
  { rejectValue: string }
>(
  'auth/loadUser',
  async (_, thunkAPI) => {
    try {
      const data = await initialStateService();
      // console.log('initialStateService data:', data);

      if (data && data.token) {
        const { token, ...user } = data;
        // console.log('Destructured user:', user);

        // Validar que `userID` existe
        if (!user.userID) {
          // console.log('loadUser: userID es undefined en los datos del usuario');
          return thunkAPI.rejectWithValue('Detalles del usuario incompletos');
        }

        await AsyncStorage.setItem('user', JSON.stringify(user));
        await AsyncStorage.setItem('userToken', token);
        // console.log('loadUser from initialStateService successful:', { token, user });
        return { success: true, token, user: user as UserType };
      } else {
        const token = await AsyncStorage.getItem('userToken');
        const userData = await AsyncStorage.getItem('user');

        if (token && userData) {
          const user: UserType = JSON.parse(userData);
          // console.log('loadUser successful from AsyncStorage:', { token, user });
          return { success: true, token, user };
        } else {
          return thunkAPI.rejectWithValue('No hay detalles del usuario');
        }
      }
    } catch (error) {
      console.log('loadUser error:', error);
      return thunkAPI.rejectWithValue('Error al cargar el usuario');
    }
  }
);

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
      console.log('response', response);
      if (response.success && response.token) {
        // Guardar el token en AsyncStorage
        await AsyncStorage.setItem('userToken', response.token);
        // console.log('Token guardado exitosamente:', response.token);

        // Llamar a initialStateService para obtener los datos del usuario
        const userData = await initialStateService();
        // console.log('Datos del usuario obtenidos:', userData);

        if (userData && userData.userID) {
          await AsyncStorage.setItem('user', JSON.stringify(userData));
          // console.log('Datos del usuario guardados en AsyncStorage');

          return {
            success: true,
            token: response.token,
            user: userData as UserType,
          };
        } else {
          // console.log('Datos del usuario incompletos en initialStateService');
          return thunkAPI.rejectWithValue('Detalles del usuario incompletos');
        }
      } else {
        console.log('verifyCode rechazado:', response.message);
        return thunkAPI.rejectWithValue(
          response.message || 'Error al verificar el código',
        );
      }
    } catch (error) {
      console.log('verifyCode error:', error);
      return thunkAPI.rejectWithValue('Error al verificar el código');
    }
  }
);

// Thunk para reenviar el código
export const resendCode = createAsyncThunk<
  ResendCodeResponse,
  { method: number; phone: string; user: string },
  { rejectValue: string }
>('auth/resendCode', async ({ method, phone, user }, thunkAPI) => {
  try {
    const response =
      method === 0
        ? await signInPhoneService(phone)
        : await signInEmailService(user);
    if (response.success) {
      // console.log('resendCode fulfilled:', response);
      return { success: true };
    } else {
      console.log('resendCode rejected:', response.error);
      return thunkAPI.rejectWithValue(
        response.error || 'Error al reenviar el código',
      );
    }
  } catch (error) {
    console.log('resendCode error:', error);
    return thunkAPI.rejectWithValue('Error al reenviar el código');
  }
});

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
      // console.log('login response:', response);
      
      if (response.success && response.token) {
        // Guardar solo el token en AsyncStorage
        await AsyncStorage.setItem('userToken', response.token);
        // console.log('Token guardado exitosamente:', response.token);
        
        // Llamar a initialStateService para obtener los datos del usuario
        const userData = await initialStateService();
        // console.log('Datos del usuario obtenidos:', userData);
        
        if (userData && userData.userID) {
          await AsyncStorage.setItem('user', JSON.stringify(userData));
          // console.log('Datos del usuario guardados en AsyncStorage');
          
          return {
            success: true,
            token: response.token,
            user: userData as UserType,
          };
        } else {
          // console.log('loadUser: Datos del usuario incompletos en initialStateService');
          return thunkAPI.rejectWithValue('Detalles del usuario incompletos');
        }
      } else {
        return thunkAPI.rejectWithValue(response.message || 'Error al iniciar sesión');
      }
    } catch (error) {
      console.log('login error:', error);
      return thunkAPI.rejectWithValue('Error al iniciar sesión');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signInStart(state) {
      state.isLoadingApp = false;
    },
    signInSuccess(state, action: PayloadAction<UserType>) {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.isLoadingApp = false;
      state.business = action.payload.businessVerified;
    },
    signInFailure(state) {
      state.isLoadingApp = false;
    },
    signOut(state) {
      state.user = null;
      state.isAuthenticated = false;
      state.isLoadingApp = false;
      state.token = null;
      state.business = null;
    },
    refreshProfileData(state, action: PayloadAction<boolean>) {
      state.isLoadingApp = action.payload;
    },
  },
  extraReducers: builder => {
    // Thunk para verificar el código
    builder.addCase(verifyCode.pending, state => {
      state.isVerifying = true;
      state.isLoadingApp = false;
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
      state.user = action.payload.user || null;
      state.isAuthenticated = true;
      state.token = action.payload.token || null;
    });
    builder.addCase(verifyCode.rejected, (state, action) => {
      state.isVerifying = false;
      state.isLoadingApp = false;
      state.codeError = true;
      state.message = action.payload || 'Error al verificar el código';
    });

    // Thunk para reenviar el código
    builder.addCase(resendCode.pending, state => {
      state.isResending = true;
      state.isLoadingApp = false;
      state.message = null;
    });
    builder.addCase(resendCode.fulfilled, state => {
      state.isResending = false;
      state.isLoadingApp = false;
      state.message = 'Código reenviado con éxito';
      state.resendTimer = 10;
      state.canResend = false;
    });
    builder.addCase(resendCode.rejected, (state, action) => {
      // console.log('resendCode rejected:', action.payload);
      state.isResending = false;
      state.isLoadingApp = false;
      state.message = action.payload || 'Error al reenviar el código';
    });

    // Thunk para el inicio de sesión
    builder.addCase(login.pending, state => {
      state.loginLoading = true;
      state.loginError = false;
      state.loginMessage = null;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.loginLoading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user || null;
      state.token = action.payload.token || null;
      state.loginMessage = 'Inicio de sesión exitoso';
      state.isLoadingApp = false;
      state.onboarding = action.payload.user?.onboarding || false;
      state.businessVerified = action.payload.user?.businessVerified || false;
    });
    builder.addCase(login.rejected, (state, action) => {
      // console.log('login rejected:', action.payload);
      state.loginLoading = false;
      state.loginError = true;
      state.loginMessage = action.payload || 'Error al iniciar sesión';
    });

    // Thunk para cargar el usuario al inicio
    builder.addCase(loadUser.pending, state => {
      // console.log('extraReducers: loadUser: Pendiente');
      state.isLoadingApp = true;
    });
    builder.addCase(loadUser.fulfilled, (state, action) => {
      // console.log('loadUser fulfilled payload:', action.payload);
      
      if (action.payload.user && action.payload.user.userID) {
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.token = action.payload.token || null;
        state.isLoadingApp = false;
        state.onboarding = action.payload.user.onboarding || false;
        state.businessVerified = action.payload.user.businessVerified || false;
      } else {
        // console.log('loadUser: Datos del usuario incompletos en payload');
        state.isAuthenticated = false;
        state.user = null;
        state.token = null;
        state.isLoadingApp = false;
        state.message = 'Datos del usuario incompletos';
      }
    });
    builder.addCase(loadUser.rejected, (state, action) => {
      // console.log('extraReducers: loadUser: Rejected:', action.payload);
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
      state.isLoadingApp = false;
      state.message = action.payload || 'Error al cargar el usuario';
    });
  },
});

export const {
  signInStart,
  signInSuccess,
  signInFailure,
  signOut,
  refreshProfileData,
} = authSlice.actions;
export default authSlice.reducer;
