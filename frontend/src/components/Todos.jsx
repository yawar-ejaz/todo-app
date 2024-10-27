import React, { useState } from "react";
import Todo from "./Todo";

const Todos = ({ todos, fetchTodos }) => {
  return (
    <div className="h-full">
      {todos.map((todo) => (
        <Todo
          key={todo._id}
          id={todo._id}
          title={todo.title}
          description={todo.description}
          isCompleted={todo.isCompleted}
          fetchTodos={fetchTodos}
        />
      ))}
    </div>
  );
};

export default Todos;
