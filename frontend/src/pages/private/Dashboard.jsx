import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Navbar, Todos } from "../../components";
import { useForm } from "react-hook-form";
import { jwtDecode } from "jwt-decode";
import { useSelector, useDispatch } from "react-redux";
import { setTodos, addTodo } from "../../features/todoSlice";

import axios from "axios";

function Dashboard() {
  const user = jwtDecode(localStorage.getItem("token"));
  const dispatch = useDispatch();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const { handleSubmit, register, reset } = useForm();

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const createTodo = async (data) => {
    data = { ...data, userId: user.id };
    try {
      const result = await axios.post("/todos", data);
      dispatch(addTodo(result?.data?.todo));
    } catch (error) {
      alert(error?.response?.data?.message);
      console.log(error);
    }
    reset();
    closeModal();
  };

  const fetchTodos = async () => {
    try {
      const result = await axios.get(`/todos/${user.id}`);
      dispatch(setTodos(result?.data?.todos));
    } catch (error) {
      alert(error?.response?.data?.message);
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div className="h-screen flex flex-col">
      {/* Navbar */}
      <Navbar />

      {/* Dashboard Content */}
      <div className="flex-1">
        <div className="flex justify-between bg-base-200 h-16 px-16 items-center">
          <h2 className="text-3xl font-bold">Welcome, {user.name}</h2>
          <button
            className="btn btn-md btn-success rounded-md"
            onClick={openModal}
          >
            Add Todo
          </button>
        </div>
        <div className="overflow-y-auto h-[calc(100vh-8rem)] p-4 scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-gray-500">
          <Todos />
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-base bg-opacity-50 flex justify-center items-center">
          <div className="bg-primary p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h3 className="text-lg font-semibold mb-4">Add a new Todo</h3>
            <form onSubmit={handleSubmit(createTodo)}>
              <div className="mb-4">
                <label className="block text-primary-content mb-2">Title</label>
                <input
                  type="text"
                  className="input input-bordered w-full rounded-md"
                  placeholder="Enter title"
                  required
                  {...register("title")}
                />
              </div>
              <div className="mb-4">
                <label className="block text-primary-content mb-2">
                  Description
                </label>
                <textarea
                  className="textarea textarea-bordered w-full rounded-md"
                  placeholder="Enter description"
                  required
                  {...register("description")}
                ></textarea>
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  className="btn btn-sm btn-error rounded-sm mr-2"
                  onClick={closeModal}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-sm btn-success rounded-sm"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
