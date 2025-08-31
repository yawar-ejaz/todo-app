import React from "react";
import axios from "axios";
import { setTodos, deleteTodo, toggleTodo } from "../features/todoSlice";
import { useSelector, useDispatch } from "react-redux";

const Todo = ({ _id, title, description, date, isCompleted }) => {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const handleDelete = async (_id) => {
    try {
      axios.delete(`/todos/${_id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(deleteTodo(_id));
    } catch (error) {
      alert(error?.response?.data?.message);
    }
  };

  const handleToggle = async (_id) => {
    try {
      await axios.patch(
        `/todos`,
        { _id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch(toggleTodo(_id));
    } catch (error) {
      alert(error?.response?.data?.message);
    }
  };
  return (
    <div
      className={`flex justify-between items-center p-4 mb-4 border rounded-sm ${
        isCompleted ? "border-green-500" : "border-red-500"
      }`}
    >
      <div className="flex items-center space-x-4">
        <input
          name="checkbox"
          type="checkbox"
          className="checkbox border-white"
          checked={isCompleted}
          onChange={() => handleToggle(_id)}
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
          <p className="text-xs text-gray-400">
            {new Date(date).toLocaleDateString("en-GB")}
            {" - "}
            {new Date(date).toLocaleTimeString("en-GB", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        </div>
      </div>
      <button
        className="btn btn-error text-black rounded-sm"
        onClick={() => handleDelete(_id)}
      >
        Delete
      </button>
    </div>
  );
};

export default Todo;
