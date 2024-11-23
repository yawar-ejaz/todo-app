import React, { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { setUser } from "../../features/userSlice";
import { jwtDecode } from "jwt-decode";

import axios from "axios";

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const { handleSubmit, register, reset } = useForm();
  const user = useSelector((state) => state.user);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { profilePic, name, email, dateJoined } = user;

  const editProfile = async (data) => {
    reset();
    setIsModalOpen(false);
    try {
      const result = await axios.patch(
        `/user`,
        {
          name: data.name,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      localStorage.setItem("token", result?.data?.token);
      const updatedUser = jwtDecode(localStorage.getItem("token"));
      dispatch(setUser(updatedUser));
    } catch (error) {
      alert(error?.response?.data?.message);
    }
  };

  return (
    <div className="max-h-screen bg-base-100 text-base-content flex flex-col items-center p-6">
      {/* Header */}
      <h1 className="text-4xl font-bold">My Profile</h1>

      {/* Profile Section */}
      <div className="m-6 bg-base-200 rounded-lg shadow-xl w-full max-w-lg p-8">
        {/* Profile Picture */}
        <div className="flex justify-center mb-6">
          {profilePic ? (
            <img
              src={profilePic}
              alt="Profile"
              className="w-40 h-40 rounded-full border-4 border-primary object-cover"
            />
          ) : (
            <FaUserCircle className="w-40 h-40 text-gray-400" />
          )}
        </div>

        {/* User Details */}
        <div className="text-center">
          <h2 className="text-3xl font-semibold">{name}</h2>
          <p className="text-lg text-gray-600 mt-2">{email}</p>
          <p className="text-sm text-gray-500 mt-4">
            Member since:{" "}
            <span className="font-medium text-gray-700">
              {new Date(dateJoined).toLocaleDateString("en-GB")}
            </span>
          </p>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex justify-center space-x-4">
          <button
            className="btn btn-sm btn-success rounded-md"
            onClick={() => setIsModalOpen(true)}
          >
            Edit
          </button>
          <button
            className="btn btn-sm btn-error rounded-md"
            onClick={() => navigate("/dashboard")}
          >
            Back
          </button>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-base-200 p-6 rounded-lg shadow-lg w-full max-w-sm">
            <h3 className="text-lg font-bold mb-4">Edit Name</h3>
            <form onSubmit={handleSubmit(editProfile)}>
              <input
                type="text"
                className="input input-bordered w-full mb-4 rounded-md"
                placeholder="Enter your new name"
                required
                {...register("name")}
              />
              <div className="flex justify-end space-x-2">
                <button
                  className="btn btn-sm btn-error rounded-md"
                  type="button"
                  onClick={() => {
                    reset();
                    setIsModalOpen(false);
                  }}
                >
                  Cancel
                </button>
                <button
                  className="btn btn-sm btn-success rounded-md"
                  type="submit"
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
};

export default Profile;
