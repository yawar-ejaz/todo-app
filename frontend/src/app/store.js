import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counterSlice";
import todoReducer from "../features/todoSlice";
import userReducer from "../features/userSlice";

const store = configureStore({
  reducer: {
    counter: counterReducer,
    todos: todoReducer,
    user: userReducer,
  },
});

export { store };
