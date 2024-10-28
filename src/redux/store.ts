import { configureStore } from '@reduxjs/toolkit';
import modalReducer from './slides/modalSlice';
import authReducer from './slides/authSlice';
import reactionsReducer from './slides/reactionsSlice';
import commentsReducer from './slides/commentsSlice';
import selectionReducer from './slides/selectionSlice';
import searchReducer from './slides/searchSlice';
import signupFormReducer from './slides/SignForm';
import personalizedReducer from './slides/personalizedSlice';
import locationReducer from './slides/locationSlice';
import navigationReducer from './slides/navigations';
import scrollReducer from './slides/scrollSlice';
import uploadReducer from './slides/uploadSlice';
import appReducer from './slides/appSlice';
const store = configureStore({
  reducer: {
    auth: authReducer,
    reactions: reactionsReducer,
    modal: modalReducer,
    comments: commentsReducer,
    selection: selectionReducer,
    search: searchReducer,
    signupForm: signupFormReducer,
    personalized: personalizedReducer,
    location: locationReducer,
    navigation: navigationReducer,
    scroll: scrollReducer,
    upload: uploadReducer,
    app: appReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
