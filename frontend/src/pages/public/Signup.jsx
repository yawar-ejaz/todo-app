import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

const Signup = () => {
  const navigate = useNavigate();
  const { handleSubmit, register, reset } = useForm();
  const [showPassword, setShowPassword] = useState(false);

  const handleSignup = async (data) => {
    try {
      const result = await axios.post("/auth/signup", data);
      console.log(result);
      localStorage.setItem("user", JSON.stringify(result.data));
      //   console.log(jwtDecode(result.data.token));
        navigate("/dashboard");
    } catch (error) {
      console.log(error);
      alert(error.response.data.message);
      reset();
    }
  };

  return (
    <div className="min-h-screen flex">
      <div className="w-full flex items-center justify-center bg-base-100">
        <div className="bg-primary p-6 rounded-lg shadow-lg max-w-md w-full">
          <h2 className="text-2xl font-bold mb-5 text-center text-primary-content">
            Signup
          </h2>
          <form onSubmit={handleSubmit(handleSignup)}>
            <div className="mb-4">
              <label
                className="block text-primary-content text-sm font-bold mb-2"
                htmlFor="name"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="input input-bordered w-full rounded-md"
                placeholder="Enter your name"
                autoComplete="off"
                required
                {...register("name")}
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-primary-content text-sm font-bold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                type="text"
                id="email"
                name="email"
                className="input input-bordered w-full rounded-md"
                placeholder="Enter your email"
                autoComplete="off"
                required
                {...register("email")}
              />
            </div>
            <div className="mb-6 relative">
              <label
                className="block text-primary-content text-sm font-bold mb-2"
                htmlFor="password"
              >
                Create password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  className="input input-bordered w-full pr-16 rounded-md"
                  placeholder="Enter your password"
                  autoComplete="off"
                  required
                  {...register("password")}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center px-3 text-sm leading-5 text-base-content font-bold"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>
            <div className="flex items-center justify-between mb-4">
              <button
                type="submit"
                className="btn btn-success w-full rounded-md"
              >
                Signup
              </button>
            </div>
            <div className="text-center flex flex-col">
              <a
                href="/login"
                className="text-sm text-primary-content hover:underline"
              >
                Already have an account? Login here
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
