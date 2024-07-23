import React, { useEffect, useState } from "react";
import "./Navbar.css";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
function Navbar() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    if (localStorage.getItem("user")) {
      setUser(JSON.parse(localStorage.getItem("user")));
    }
  }, []);
  const navigate = useNavigate();

  return (
    <div className="mainContainerNav">
      <div id="navDiv">
        <p>Where is My Bus</p>
        {user ? (
          <p style={{ fontSize: 25 }}> Welcome {user["displayName"]}</p>
        ) : null}

        <Link
          style={{ alignSelf: "end", textDecoration: "none", color: "white" }}
          to="/AboutUs"
        >
          About us
        </Link>

        <button
          style={{
            alignSelf: "end",
            backgroundColor: "transparent",
            color: "white",
          }}
          onClick={() => {
            localStorage.setItem("user", null);
            navigate("/");
          }}
        >
          {" "}
          Logout
        </button>
      </div>
    </div>
  );
}

export default Navbar;
