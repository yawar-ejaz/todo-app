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
    addTodo: (state, action) => {
      state.unshift(action.payload);
    },
    toggleTodo: (state, action) => {
      const todo = state.find((todo) => todo._id === action.payload);
      if (todo) {
        todo.isCompleted = !todo.isCompleted; // Toggle the isCompleted value
      }
    },
  },
});

export const { setTodos, deleteTodo, addTodo, toggleTodo } = todoSlice.actions;

export default todoSlice.reducer;
