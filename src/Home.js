import React, { useDebugValue, useState } from "react";
import SignOutUser from "./SignOut";
import "./Home.css";
export default function Home() {
  const [openProfile, setOpenProfile] = useState(false);
  const [listopen, setListOpen] = useState("listHide");
  const [userData, setUserData] = useState(
    JSON.parse(localStorage.getItem("userData"))
  );
  console.log(userData);
  return (
    <div className="containerHome">
      Home<p>Welcome {userData.firstName}</p>
      <div style={{ marginLeft: 50 }}>
        <button
          onClick={() => {
            setOpenProfile(!openProfile);
          }}
        >
          your profile
        </button>
        <ul className={openProfile ? "listHide" : "list"}>
          <li>
            <h1>{userData.firstName} </h1>
          </li>
          <li>
            <h3>{userData.lastName}</h3>
          </li>
          <li>
            <h4>{userData.email}</h4>
          </li>
          <li>
            <h5>{userData.phoneNumber}</h5>
          </li>
        </ul>
      </div>
      <div style={{ justifyItems: "flex-start" }}>
        <SignOutUser />
      </div>
    </div>
  );
}
