import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../features/userSlice";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutUser = () => {
    localStorage.removeItem("token");
    dispatch(setUser(null));
  };

  return (
    <nav className="bg-primary p-4 h-16 flex justify-between items-center">
      <h1 className="text-2xl font-bold text-primary-content">Todo App</h1>
      <div>
        <button
          className="btn btn-sm btn-warning rounded-sm mr-2"
          onClick={() => navigate("/profile")}
        >
          Profile
        </button>
        <button
          className="btn btn-sm btn-error rounded-sm"
          onClick={logoutUser}
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
