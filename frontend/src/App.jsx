import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Root, Login, Signup, NotFound } from "./pages/public";
import { Dashboard, Profile } from "./pages/private";
import { PublicRoute, PrivateRoute } from "./utils";
import axios from "axios";
import { useSelector } from "react-redux";
axios.defaults.baseURL = import.meta.env.VITE_SERVER_ADDRESS;

function App() {
  const user = useSelector((state) => state.user);
  return (
    <Router>
      <Routes>
        <Route element={<PublicRoute user={user} />}>
          <Route path="/" element={<Root />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<NotFound />} />
        </Route>
        <Route element={<PrivateRoute user={user} />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
