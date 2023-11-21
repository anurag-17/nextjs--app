// redux/slices/orderSlice.js
import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  shippingDetails : {
    address:""
  }
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setShippingDetails: (state, action) => {
        console.log(action);
    //   state.shippingDetails = action.payload ;
    if (typeof window !== "undefined") {
        localStorage.setItem("shippingDet", JSON.stringify(action?.payload));
    }
    },
  },
});

export const {setShippingDetails} = orderSlice.actions;
export default orderSlice.reducer;
