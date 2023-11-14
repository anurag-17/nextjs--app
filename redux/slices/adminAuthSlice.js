import { createSlice } from "@reduxjs/toolkit";

const getTokenFromLocalStorage = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("adminToken") || null;
  }
  return null;
};

const initialState = {
  token: getTokenFromLocalStorage(),
  cart: [],
  totalCartItems: 0,
};

const authSlice = createSlice({
  name: "adminAuth",
  initialState,
  reducers: {
    setAdminToken: (state, action) => {
      state.userDetails.token = action.payload;
      if (typeof window !== "undefined") {
        localStorage.setItem("adminToken", JSON.stringify(action?.payload));
      }
    },
    setAdminDetails: (state, action) => {
        state.userDetails.userID = action.payload?._id ;
        if (typeof window !== "undefined") {
          localStorage.setItem("adminID", JSON.stringify(action?.payload?._id));
        }
      },
  },
});

export const {setAdminToken,setAdminDetails} =
  authSlice.actions;
export default authSlice.reducer;
