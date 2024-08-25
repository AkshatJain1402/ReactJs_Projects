import React, { useContext, useEffect, useState } from "react";
import "./Navbar.css";
import profileIcon from "../images/profile.png";
import LogoutLogo from "../images/LogoutLogo.png";
import { Context } from "../Context/Context";
import sunLogo from "../images/sunLogo.png";
import moonLogo from "../images/moonLogo.png";
import { useNavigate } from "react-router-dom";
function Navbar() {
  const HandleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("data");
    navigate("/");
  };
  const [user, setUser] = useState("");
  const navigate = useNavigate("/");
  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")));
  }, []);
  useEffect(() => {
    if (user == null || user == null) {
    }
  }, [user]);
  const { theme, toggleTheme } = useContext(Context);

  return (
    <div id="navbarMain">
      <div id="navbarLeft">
        <h2>gyanvesh</h2>
      </div>
      <div id="navbarRight">
        <div id="RightChild1">
          <img src={profileIcon} alt="profile" height={30} width={30} />
          {theme == "light" ? (
            <a onClick={toggleTheme}>
              <img src={sunLogo} height={30} width={30} />
            </a>
          ) : (
            <a onClick={toggleTheme}>
              <img src={moonLogo} height={30} width={30}></img>
            </a>
          )}
        </div>
        <div id="rightChild2">
          <img
            src={LogoutLogo}
            height={30}
            width={30}
            onClick={() => {
              console.log("dm");
              HandleLogout();
            }}
            alt="Logout"
          />
        </div>
      </div>
    </div>
  );
}

export default Navbar;
