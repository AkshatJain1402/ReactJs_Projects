import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";

import Dashboard from "./pages/Dashboard";
import Login from "./Authentications/Login";
import Signup from "./Authentications/Signup";
import NoPage from "./pages/NoPage";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login></Login>} />
        <Route path="/Home" element={<Home></Home>} />
        <Route path="/Login" element={<Login></Login>} />
        <Route path="/SignUp" element={<Signup></Signup>} />
        <Route path="/*" element={<NoPage></NoPage>} />
      </Routes>
    </Router>
  );
}

export default App;
