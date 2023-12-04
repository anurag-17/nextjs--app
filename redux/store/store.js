// In redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import adminAuthSlice from '../slices/adminAuthSlice';
import authReducer from '../slices/authSlice';
import orderSlice from '../slices/orderSlice';


const store = configureStore({
  reducer: {
    adminAuth:adminAuthSlice,
    auth: authReducer,
    order: orderSlice,
  },
});


export { store };
