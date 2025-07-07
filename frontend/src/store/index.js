import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import topicsReducer from './slices/topicsSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    topics: topicsReducer,
  },
}); 