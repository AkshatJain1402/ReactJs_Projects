import React, { useContext, useEffect, useState } from "react";
import "./SideNavbar.css";
import { replace, useNavigate } from "react-router-dom";
import app from "../firebase";
import { getDatabase, ref as dbRef, onValue, ref } from "firebase/database";
import { Context } from "../Context/Context";
const db = getDatabase(app);

function SideNavbar() {
  const [user, setUser] = useState("");

  const { authLevel } = useContext(Context);
  const [data, setData] = useState({});
  const [BlockNames, setBlockNames] = useState([]);
  const [districtNames, setDistrictNames] = useState([]);
  const [isBlockOpen, setIsBlockOpen] = useState(false);
  const [isDistrictOpen, setIsDistrictOpen] = useState(false);
  useEffect(() => {
    try {
      console.log(
        JSON.parse(localStorage.getItem("data"))
          ? JSON.parse(localStorage.getItem("data"))
          : "arey data nahi hai"
      );
      setBlockNames(
        JSON.parse(localStorage.getItem("data"))
          ? Object.keys(JSON.parse(localStorage.getItem("data")))
          : null
      );
      setData(
        JSON.parse(localStorage.getItem("data"))
          ? JSON.parse(localStorage.getItem("data"))
          : null
      );

      setUser(JSON.parse(localStorage.getItem("user")));
      // console.log(localStorage.getItem("user"));
    } catch (e) {
      console.log(e);
    }
  }, [db]);

  useEffect(() => {
    console.log(BlockNames);
  }, [BlockNames]);
  const navigate = useNavigate(); // React Router hook for navigation

  const handleSelect = (path) => {
    path = String(path).replace("/", "");
    const placeData = data[path];
    //console.log(Object.keys(placeData));
    navigate("/" + path, { state: { placeData }, replace: false });
    setIsBlockOpen(false);
  };

  const handleDistrictSelect = () => {};

  return (
    <div id="mainContainerSB">
      {user ? (
        <div>
          <div id="profile">
            <p>{user.displayName}</p>
            <img src={user["photoURL"]} width={120} height={120}></img>
          </div>
          <div id="blockContainerSB">
            <div className="dropdown"></div>
          </div>
          {authLevel == "District" ? (
            <div id="districtContainerSB">
              <div className="dropdown">
                <button
                  id="dropdownButton"
                  onClick={() => setIsDistrictOpen(!isDistrictOpen)}
                >
                  Districts
                </button>
                {isDistrictOpen && (
                  <div className="dropdownMenu">
                    {BlockNames.map((option) => (
                      <div
                        key={option}
                        onClick={() => handleSelect(option)}
                        className="dropdownItem"
                      >
                        {option}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ) : BlockNames ? (
            BlockNames.map((option) => (
              <div
                key={option}
                onClick={() => handleSelect(option)}
                className="dropdownItem"
              >
                {option}
              </div>
            ))
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
export default SideNavbar;
