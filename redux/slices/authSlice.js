// redux/slices/authSlice.js
import { createSlice } from "@reduxjs/toolkit";

const getTokenFromLocalStorage = () => {
    if (typeof window !== "undefined") {
      // Check if the code is running in a browser environment
      return localStorage.getItem("token") || null;
    }
    return null;
  };

const initialState = {
    token: getTokenFromLocalStorage(),
  cart: [],
  totalCartItems : 0,
};


const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
      if (typeof window !== "undefined") {
        localStorage.setItem("token", action?.payload);
      }
    },
    addToCart: (state, action) => {
      state.cart.push(action.payload);
      // [...state.cart, action.payload];
    },
    removeFromCart: (state, action) => {
      state.cart = state.cart.filter(
        (item) => item?._id !== action.payload?._id
      );
    },
    cartProducts: (state, action) => {
        // console.log(action)
        state.cart = action.payload || [];
        state.totalCartItems = action.payload?.length || 0
      },
  },
});
console.log(authSlice.actions);

export const { setToken, addToCart, removeFromCart , cartProducts} = authSlice.actions;
export default authSlice.reducer;
