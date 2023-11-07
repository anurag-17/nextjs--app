// redux/slices/authSlice.js
import { createSlice } from "@reduxjs/toolkit";

const getTokenFromLocalStorage = () => {
  if (typeof window !== "undefined") {
    // Check if the code is running in a browser environment
    return localStorage.getItem("userToken") || null;
  }
  return null;
};

const initialState = {
  userDetails : {
    token: getTokenFromLocalStorage(),
    userID: null,
    userWishList: [],
  },
  cart: [],
  totalCartItems: 0,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUserDetails: (state, action) => {
      state.userDetails.token = action.payload?.token;
      state.userDetails.userID = action.payload?.user?._id ;
      state.userDetails.userWishList = action.payload?.user?.wishlist ;
      if (typeof window !== "undefined") {
        localStorage.setItem("userToken", JSON.stringify(action?.payload?.token));
      }
      if (typeof window !== "undefined") {
        localStorage.setItem("userID", JSON.stringify(action?.payload?.user?._id));
      }
      if (typeof window !== "undefined") {
        localStorage.setItem(
          "wishList",
          JSON.stringify(action?.payload?.user?.wishlist)
        );
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
      state.totalCartItems = action.payload?.length || 0;
    },
  },
});
console.log(authSlice.actions);

export const {addToCart, removeFromCart, cartProducts,setUserDetails } =
  authSlice.actions;
export default authSlice.reducer;
