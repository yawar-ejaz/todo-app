import { useState } from "react";
import { useForm } from "react-hook-form";
import { jwtDecode } from "jwt-decode";
import { useDispatch } from "react-redux";
import { setUser } from "../../features/userSlice";

import axios from "axios";

const Login = () => {
  const dispatch = useDispatch();

  const { handleSubmit, register, reset } = useForm();
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (data) => {
    try {
      const result = await axios.post("/auth/login", data);
      localStorage.setItem("token", result?.data?.token);
      const user = jwtDecode(localStorage.getItem("token"));
        dispatch(setUser(user));
    } catch (error) {
      alert(error?.response?.data?.message);
      reset();
    }
  };

  return (
    <div className="min-h-screen flex">
      <div className="w-full flex items-center justify-center bg-base-100">
        <div className="bg-primary p-6 rounded-lg shadow-lg max-w-md w-full">
          <h2 className="text-2xl font-bold mb-5 text-center text-primary-content">
            Login
          </h2>
          <form onSubmit={handleSubmit(handleLogin)}>
            <div className="mb-4">
              <label
                className="block text-primary-content text-sm font-bold mb-2"
                htmlFor="emailOrUsername"
              >
                Email
              </label>
              <input
                type="text"
                id="emailOrUsername"
                name="emailOrUsername"
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
                Password
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
                Login
              </button>
            </div>
            <div className="text-center flex flex-col">
              <a
                href="/forgot-password"
                className="text-sm text-error hover:underline"
              >
                Forgot your password?
              </a>
              <a
                href="/signup"
                className="text-sm text-primary-content hover:underline my-2"
              >
                New to our website? Signup here
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
