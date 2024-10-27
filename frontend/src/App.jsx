import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Root, Login, Signup } from "./pages/public";
import { Dashboard } from "./pages/private";
import axios from "axios";
axios.defaults.baseURL = import.meta.env.VITE_SERVER_ADDRESS;

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Root />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/dashboard" element={<Dashboard />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
