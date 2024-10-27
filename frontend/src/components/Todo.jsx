import React, { useState } from "react";
import axios from "axios";

const Todo = ({ id, title, description, isCompleted, fetchTodos }) => {
  const handleDelete = async (id) => {
    try {
      const result = await axios.delete(`/todos/delete/${id}`);
      fetchTodos();
      //   setTodos(result.data.todos);
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
