import { createSlice } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";

const decodeToken = (token) => {
  try {
    return jwtDecode(token);
  } catch (error) {
    localStorage.removeItem("token");
    return null;
  }
};

const token = localStorage.getItem("token");
const initialState = token ? decodeToken(token) : null;

export const userSlice = createSlice({
  name: "userSlice",
  initialState: initialState,
  reducers: {
    setUser: (state, action) => {
      return action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
