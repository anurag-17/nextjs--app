// redux/slices/orderSlice.js
import { createSlice } from "@reduxjs/toolkit";

const getTokenFromLocalStorage = () => {
  if (typeof window !== "undefined") {
    return JSON.parse(localStorage.getItem("shippingDet") || null);
  }
  return null;
};


const initialState = {
  shippingDetails : {
    address: getTokenFromLocalStorage() 
  }
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setShippingDetails: (state, action) => {
        console.log(action);
      state.shippingDetails.address = action.payload ;
    if (typeof window !== "undefined") {
        localStorage.setItem("shippingDet", JSON.stringify(action?.payload));
    }
    },
  },
});

export const {setShippingDetails} = orderSlice.actions;
export default orderSlice.reducer;
