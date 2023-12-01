import { createSlice } from "@reduxjs/toolkit";

const getTokenFromLocalStorage = () => {
  if (typeof window !== "undefined") {
    return JSON.parse(localStorage.getItem("adminToken") || null);
  }
  return null;
};

const initialState = {
  auth_token: getTokenFromLocalStorage(),
  userDetails:[]
};

const adminAuthSlice = createSlice({
  name: "adminAuth",
  initialState,
  reducers: {
    setAdminToken: (state, action) => {
      state.auth_token = action.payload;
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
  adminAuthSlice.actions;
export default adminAuthSlice.reducer;
