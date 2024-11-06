import React from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-base text-base-content flex flex-col justify-center items-center">
      <div className="text-center p-10 bg-primary rounded-md flex flex-col gap-4 ">
        <h1 className="text-4xl font-bold text-base-content">404</h1>
        <p className="text-lg text-primary-content mb-8">
          Oops! The page you’re looking for doesn’t exist.
        </p>
        <button
          onClick={() => navigate("/")}
          className="btn btn-success rounded-md"
        >
          Go to Home
        </button>
      </div>
    </div>
  );
};

export default NotFound;
