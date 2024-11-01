import { createSlice, PayloadAction, createAction } from '@reduxjs/toolkit';
import { LocationObjectCoords } from 'expo-location';

interface ModalState {
  open: boolean;
  data: any;
  modalType: number;
  targetInputId: string | null;
  expandOnKeyboard: boolean;
}

const initialState: ModalState = {
  open: false,
  data: null,
  modalType: -1,
  targetInputId: null,
  expandOnKeyboard: false,
};

interface Tracking {
  businessID: number;
  businessLatitude: number;
  businessLongitude: number;
  business_name: string;
  canceled: boolean;
  creation_time: string;
  currentStep: number;
  estimated_time: string;
  latitude: number;
  locationDetails: string;
  longitude: number;
  minutes: number;
  orderID: number;
  payment_method: number;
  products: { id: number; qty: number; recipeID: string; thumbnail: string }[];
  products_length: number;
  riderID: string;
  rider_waiting: boolean;
  status: string;
  steps: {
    id: number;
    message: string;
    timeEstimated: string;
    title: string;
  }[];
  tag: string;
  total: number;
  verification_code: string | null;
  verified: boolean;
}

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openCommentModal(state, action: PayloadAction<{ postID: number }>) {
      state.open = true;
      state.data = action.payload.postID;
      state.modalType = 0;
    },
    openMoreOptionsModal(state, action: PayloadAction<{ postID: number }>) {
      state.open = true;
      state.data = action.payload;
      state.modalType = 1;
    },
    openAddressModal(state) {
      state.open = true;
      state.modalType = 2;
    },
    closeAddressModal(state) {
      state.open = false;
      state.modalType = 2;
    },
    openModalPin(state, action: PayloadAction<{ data: Tracking }>) {
      state.open = true;
      state.modalType = 3;
      state.data = action.payload.data;
    },
    openModalMoreOptionsProfile(state, action: PayloadAction<{ data: any }>) {
      state.open = true;
      state.modalType = 6;
      state.data = action.payload.data;
    },
    openModalAboutAccount(state) {
      state.open = true;
      state.modalType = 7;
    },
    closeModalAboutAccount(state) {
      state.open = false;
      state.modalType = 7;
    },
    closeModalPin(state) {
      state.open = false;
      state.modalType = 3;
    },
    closeMoreOptions(state) {
      state.open = false;
      state.data = null;
      state.modalType = 1;
    },
    clearModal(state) {
      state.open = false;
      state.data = null;
      state.modalType = -1;
      state.targetInputId = null;
      state.expandOnKeyboard = false;
    },
    setExpandOnKeyboard(state, action: PayloadAction<boolean>) {
      state.expandOnKeyboard = action.payload;
    },
    openOnboardingModal(state) {
      state.open = true;
      state.modalType = 4;
    },
    closeOnboardingModal(state) {
      state.open = false;
      state.modalType = 4;
    },
    openUploadModal(state) {
      state.open = true;
      state.modalType = 5;
    },
    closeUploadModal(state) {
      state.open = false;
      state.modalType = 5;
    },
    closeModalMoreOptionsProfile(state) {
      state.open = false;
      state.modalType = 6;
    },
    openLocationModal(state) {
      state.open = true;
      state.modalType = 8;
    },
    closeLocationModal(state) {
      state.open = false;
      state.modalType = 8;
    },
    
  },
  extraReducers: builder => {
    builder.addCase(
      setTargetInputId,
      (state, action: PayloadAction<string | null>) => {
        state.targetInputId = action.payload;
      },
    );
  },
});

export const setTargetInputId = createAction<string | null>(
  'modal/setTargetInputId',
);

export const {
  openCommentModal,
  clearModal,
  openMoreOptionsModal,
  closeMoreOptions,
  setExpandOnKeyboard,
  openAddressModal,
  openModalPin,
  closeModalPin,
  openModalMoreOptionsProfile,
  openUploadModal,
  closeUploadModal,
  openOnboardingModal,
  closeOnboardingModal,
  closeModalMoreOptionsProfile,
  openModalAboutAccount,
  closeModalAboutAccount,
  closeAddressModal,
  openLocationModal,
  closeLocationModal,
} = modalSlice.actions;

export default modalSlice.reducer;
