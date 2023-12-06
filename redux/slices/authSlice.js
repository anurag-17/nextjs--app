// redux/slices/authSlice.js
import { createSlice } from "@reduxjs/toolkit";

const getTokenFromLocalStorage = () => {
  if (typeof window !== "undefined") {
    // Check if the code is running in a browser environment
    return JSON.parse(localStorage.getItem("userToken")) || null;
  }
  return null;
};

const getWishListFromLocalStorage = () => {
  if (typeof window !== "undefined") {
    // Check if the code is running in a browser environment
    return JSON.parse(localStorage.getItem("wishList")) || [];
  }
  return null;
};

const getAddFromLocalStorage = () => {
  if (typeof window !== "undefined") {
    // Check if the code is running in a browser environment
    return JSON.parse(localStorage.getItem("userAdd")) || [];
  }
  return null;
};

const getNoFromLocalStorage = () => {
  if (typeof window !== "undefined") {
    // Check if the code is running in a browser environment
    return JSON.parse(localStorage.getItem("userNum")) || [];
  }
  return null;
};

const getMailFromLocalStorage = () => {
  if (typeof window !== "undefined") {
    // Check if the code is running in a browser environment
    return JSON.parse(localStorage.getItem("userMail")) || [];
  }
  return null;
};

const initialState = {
  userDetails : {
    token: getTokenFromLocalStorage(),
    userID: null,
    userWishList: getWishListFromLocalStorage(),
    userAddress:getAddFromLocalStorage(),
    userNumber: getNoFromLocalStorage(),
    userEmail: getMailFromLocalStorage(),
  },
  cart: [],
  totalCartItems: 0,
};


const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.userDetails.token = action.payload;
      if (typeof window !== "undefined") {
        localStorage.setItem("userToken", JSON.stringify(action?.payload));
      }
    },
    setUserDetails: (state, action) => {
      state.userDetails.userID = action.payload?._id ;
      state.userDetails.userWishList = action.payload?.wishlist ;
      state.userDetails.userAddress = action.payload?.address ;
      state.userDetails.userNumber = action.payload?.mobile ;
      state.userDetails.userEmail = action.payload?.email ;
      if (typeof window !== "undefined") {
        localStorage.setItem("userID", JSON.stringify(action?.payload?._id));
        localStorage.setItem("userAdd", JSON.stringify(action?.payload?.address));
        localStorage.setItem("userNum", JSON.stringify(action?.payload?.mobile));
        localStorage.setItem("userMail", JSON.stringify(action?.payload?.email));
        localStorage.setItem( "wishList",JSON.stringify(action?.payload?.wishlist) );
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

export const {addToCart, removeFromCart, cartProducts,setUserDetails,setToken} =
  authSlice.actions;
export default authSlice.reducer;
