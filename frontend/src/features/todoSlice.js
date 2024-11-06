import { createSlice } from "@reduxjs/toolkit";

export const todoSlice = createSlice({
  name: "todos",
  initialState: [],
  reducers: {
    setTodos: (state, action) => {
      return action.payload;
    },
    deleteTodo: (state, action) => {
      return state.filter((todo) => todo._id !== action.payload);
    },
  },
});

export const { setTodos, deleteTodo } = todoSlice.actions;

export default todoSlice.reducer;
