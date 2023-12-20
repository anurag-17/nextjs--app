// redux/slices/authSlice.js
import { createSlice } from "@reduxjs/toolkit";

// const getTokenFromLocalStorage = () => {
//   if (typeof window !== "undefined") {
//     return JSON.parse(localStorage.getItem("userToken")) || null;
//   }
//   return null;
// };


const initialState = {
  userDetails : {
    token: null,
    userID: null,
    number: "",
    email: "",
    address:"",
  },
  userWishList: [],
  cart:[],
  totalCartItems: 0,
};


const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.userDetails.token = action.payload;
      // if (typeof window !== "undefined") {
      //   localStorage.setItem("userToken", JSON.stringify(action?.payload));
      // }
    },

    getUserWishList : (state, action) => {
      state.userWishList = action.payload || [] ;
     
    },
    getCartProducts: (state, action) => {
      state.cart = action.payload || [];
   
    },
    getUserAddress: (state, action) => {
      state.userDetails.address = action.payload?.address ;
      state.userDetails.number = action.payload?.mobile ;
      state.userDetails.email = action.payload?.email ;
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
