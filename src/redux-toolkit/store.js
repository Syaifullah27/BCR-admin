import { configureStore } from '@reduxjs/toolkit';
import dataReducer from './features/menuSlice';

const store = configureStore({
  reducer: {
    data: dataReducer,
  },
});

export default store;