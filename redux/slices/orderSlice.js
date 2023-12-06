// redux/slices/orderSlice.js
import { createSlice } from "@reduxjs/toolkit";

const getTokenFromLocalStorage = () => {
  if (typeof window !== "undefined") {
    return JSON.parse(localStorage.getItem("shippingDet") || null);
  }
  return null;
};
const getLengthFromLocalStorage = () => {
  if (typeof window !== "undefined") {
    return JSON.parse(localStorage.getItem("productsLength") || 0);
  }
  return null;
};

const initialState = {
  shippingDetails: {
    address: getTokenFromLocalStorage(),
  },
  cartItem: getLengthFromLocalStorage(),
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setShippingDetails: (state, action) => {
      state.shippingDetails.address = action.payload;
      if (typeof window !== "undefined") {
        localStorage.setItem("shippingDet", JSON.stringify(action?.payload));
      }
    },
    setCartItems: (state, action) => {
      console.log(action?.payload?.length)
      state.cartItem = action.payload.length;
      if (typeof window !== "undefined") {
        localStorage.setItem("productsLength", JSON.stringify(action?.payload?.length));
      }
    },
  },
});

export const { setShippingDetails,setCartItems } = orderSlice.actions;
export default orderSlice.reducer;
