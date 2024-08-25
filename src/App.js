import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, json } from "react-router-dom";
import app from "./firebase";
import { getDatabase, ref, onValue } from "firebase/database";
import { ContextProvider } from "./Context/Context";
import Home from "./pages/Home";

import { useContext, useEffect, useState } from "react";
import BlockPage from "./pages/BlockPage";
import Login from "./pages/LoginPage";
import { snapshotEqual } from "firebase/firestore";
import { Context } from "./Context/Context";
import ChatPage from "./pages/ChatPage";
const db = getDatabase(app);

function App() {
  const [user, setUser] = useState("");

  return (
    <ContextProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login></Login>} />

          <Route path="/Home" element={<Home />} />

          <Route path="/:placeName" element={<BlockPage />} />
          <Route path="*" element={<div>404 Not Found</div>} />
          {/* <Route path="/Chatgpt" element={<ChatPage></ChatPage>} /> */}
        </Routes>
      </Router>
    </ContextProvider>
  );
}

export default App;
