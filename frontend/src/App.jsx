import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Root, Login, Signup, NotFound } from "./pages/public";
import { Dashboard } from "./pages/private";
import { PublicRoute, PrivateRoute } from "./utils";
import axios from "axios";
import { useState } from "react";
import Counter from "./Counter";
import Buttons from "./Buttons";
axios.defaults.baseURL = import.meta.env.VITE_SERVER_ADDRESS;

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<PublicRoute user={false} />}>
          <Route path="/" element={<Root />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<NotFound />} />
        </Route>
        <Route element={<PrivateRoute user={true} />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
