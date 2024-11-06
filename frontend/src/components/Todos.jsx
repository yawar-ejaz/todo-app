import React, { useState } from "react";
import Todo from "./Todo";
import { useSelector, useDispatch } from "react-redux";

const Todos = () => {
  const todos = useSelector((state) => state.todos);

  return (
    <div className="h-full">
      {todos.map((todo) => (
        <Todo
          key={todo._id}
          id={todo._id}
          title={todo.title}
          description={todo.description}
          isCompleted={todo.isCompleted}
        />
      ))}
    </div>
  );
};

export default Todos;
