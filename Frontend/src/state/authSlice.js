import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  user: null,
  isLoggedIn: false,
  email:null,
  fullName:null,

  //username,email,password
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    // initialsState passed
    login(state, action) {
      state.email = action.payload.email;
      state.fullName = action.payload.fullName;
      state.isLoggedIn = true;
      state.id = action.payload.id;
    },
    logout(state) {
      state.id = null;
      state.email = null;
      state.fullName = null;
      state.isLoggedIn = false;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
