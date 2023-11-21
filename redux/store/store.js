// In redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../slices/authSlice';
import orderSlice from '../slices/orderSlice';


const store = configureStore({
  reducer: {
    order:orderSlice,
    auth: authReducer,
  },
});


export { store };
