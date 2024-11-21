import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SignupFormState {
  name: string;
  username: string;
  isUsernameValid: boolean;
  validationMessage: string;
  isSubmitting: boolean;
}

const initialState: SignupFormState = {
  name: '',
  username: '',
  isUsernameValid: false,
  validationMessage: '',
  isSubmitting: false,
};

const signupFormSlice = createSlice({
  name: 'signupForm',
  initialState,
  reducers: {
    setName(state, action: PayloadAction<string>) {
      state.name = action.payload;
    },
    setUsername(state, action: PayloadAction<string>) {
      state.username = action.payload;
    },
    setIsUsernameValid(state, action: PayloadAction<boolean>) {
      state.isUsernameValid = action.payload;
    },
    setValidationMessage(state, action: PayloadAction<string>) {
      state.validationMessage = action.payload;
    },
    setIsSubmitting(state, action: PayloadAction<boolean>) {
      state.isSubmitting = action.payload;
    },
  },
});

export const {
  setName,
  setUsername,
  setIsUsernameValid,
  setValidationMessage,
  setIsSubmitting,
} = signupFormSlice.actions;
export default signupFormSlice.reducer;
