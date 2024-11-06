import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = ({ user }) => {
  if (user) {
    return <Outlet />;
  }
  return <Navigate to={"/signup"} />;
};

export default PrivateRoute;
