import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  user: null,
  isLoggedIn: false,
  email:null,
  fullName:null,
  id:null,

  //username,email,password is imp. only
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
export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
export const selectUserEmail = (state) => state.auth.email;
export const selectUserFullName = (state) => state.auth.fullName;
export const selectUserId = (state) => state.auth.id;


export default authSlice.reducer;
