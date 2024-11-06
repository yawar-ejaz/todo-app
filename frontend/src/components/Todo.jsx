import React from "react";
import axios from "axios";
import { setTodos, deleteTodo } from "../features/todoSlice";
import { useSelector, useDispatch } from "react-redux";

const Todo = ({ id, title, description, isCompleted }) => {
  const dispatch = useDispatch();
  const handleDelete = async (id) => {
    try {
      axios.delete(`/todos/delete/${id}`);
      dispatch(deleteTodo(id));
    } catch (error) {
      alert(error?.response?.data?.message);
      console.log(error);
    }
  };

  const handleToggle = (id) => {
    // setTodos(
    //   todos.map((todo) =>
    //     todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
    //   )
    // );
  };
  return (
    <div
      className={`flex justify-between items-center p-4 mb-4 border rounded-sm ${
        isCompleted ? "border-green-500" : "border-red-500"
      }`}
    >
      <div className="flex items-center space-x-4">
        <input
          type="checkbox"
          className="checkbox border-white"
          checked={isCompleted}
          onChange={() => handleToggle(id)}
        />
        <div>
          <h3
            className={`text-lg font-bold ${
              isCompleted ? "line-through text-green-500" : "text-red-500"
            }`}
          >
            {title}
          </h3>
          <p
            className={`text-sm ${
              isCompleted ? "line-through text-green-400" : "text-red-400"
            }`}
          >
            {description}
          </p>
        </div>
      </div>
      <button
        className="btn bg-white text-black rounded-sm"
        onClick={() => handleDelete(id)}
      >
        Delete
      </button>
    </div>
  );
};

export default Todo;
