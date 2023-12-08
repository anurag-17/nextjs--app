// redux/slices/authSlice.js
import { createSlice } from "@reduxjs/toolkit";

const getTokenFromLocalStorage = () => {
  if (typeof window !== "undefined") {
    return JSON.parse(localStorage.getItem("userToken")) || null;
  }
  return null;
};

const getWishListFromLocalStorage = () => {
  if (typeof window !== "undefined") {
    return JSON.parse(localStorage.getItem("wishList")) || [];
  }
  return null;
};

const getCartFromLocalStorage = () => {
  if (typeof window !== "undefined") {
    return JSON.parse(localStorage.getItem("cart_item")) || [];
  }
  return null;
};

const getAddFromLocalStorage = () => {
  if (typeof window !== "undefined") {
    return JSON.parse(localStorage.getItem("user_address")) || "";
  }
  return null;
};

const getNoFromLocalStorage = () => {
  if (typeof window !== "undefined") {
    return JSON.parse(localStorage.getItem("user_number")) || "";
  }
  return null;
};

const getMailFromLocalStorage = () => {
  if (typeof window !== "undefined") {
    return JSON.parse(localStorage.getItem("user_mail")) || "";
  }
  return null;
};

const initialState = {
  userDetails : {
    token: getTokenFromLocalStorage(),
    userID: null,
    number: getNoFromLocalStorage(),
    email: getMailFromLocalStorage(),
    address:getAddFromLocalStorage(),
  },
  userWishList: getWishListFromLocalStorage(),
  cart:getCartFromLocalStorage(),
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

    getUserWishList : (state, action) => {
      state.userWishList = action.payload ;
      if (typeof window !== "undefined") {
        localStorage.setItem( "wishList",JSON.stringify(action?.payload) );
      }
    },
    getCartProducts: (state, action) => {
      state.cart = action.payload || [];
      if (typeof window !== "undefined") {
        localStorage.setItem("cart_item", JSON.stringify(action?.payload));
      }
    },
    getUserAddress: (state, action) => {
      state.userDetails.address = action.payload?.address ;
      state.userDetails.number = action.payload?.mobile ;
      state.userDetails.email = action.payload?.email ;
      if (typeof window !== "undefined") {
        localStorage.setItem("user_address", JSON.stringify(action?.payload?.address));
        localStorage.setItem("user_number", JSON.stringify(action?.payload?.mobile));
        localStorage.setItem("user_mail", JSON.stringify(action?.payload?.email));
      }
    },
    removeFromCart: (state, action) => {
      state.cart = state.cart.filter(
        (item) => item?._id !== action.payload?._id
      );
    },
  },
});
console.log(authSlice.actions);

export const {removeFromCart, getCartProducts,setToken,getUserWishList,getUserAddress} =
  authSlice.actions;
export default authSlice.reducer;
