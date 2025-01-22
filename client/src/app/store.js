import { configureStore } from '@reduxjs/toolkit';
import refineReducer from '../features/refineSlice';

export const store = configureStore({
  reducer: {
    refine: refineReducer, // Use the reducer exported from refineSlice
  },
});


