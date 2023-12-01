// In redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import adminAuthSlice from '../slices/adminAuthSlice';
import authReducer from '../slices/authSlice';


const store = configureStore({
  reducer: {
    adminAuth:adminAuthSlice,
    auth: authReducer,
  },
});


export { store };
