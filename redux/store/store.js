// In redux/store.js
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; 
import adminAuthSlice from '../slices/adminAuthSlice';
import authReducer from '../slices/authSlice';
import orderSlice from '../slices/orderSlice';


const persistConfig = {
  key: 'root',
  storage,
  // Optionally, you can whitelist specific reducers to persist
  // whitelist: ['auth'],
};

const rootReducer = combineReducers({
  adminAuth: adminAuthSlice,
  auth: authReducer,
  order: orderSlice,
})

const persistedReducer = persistReducer(persistConfig, rootReducer);


const store = configureStore({
  reducer: persistedReducer,
  middleware : (getDefaultMiddleware) => 
  getDefaultMiddleware({
    serializableCheck: false,
  }).concat()
});


const persistor = persistStore(store);

export { store, persistor };