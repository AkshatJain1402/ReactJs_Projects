import React, { useEffect, useState } from "react";
import { FireBase_Initializer } from "./FirebaseConfig";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { onAuthStateChanged, getAuth } from "firebase/auth";
import SignIn from "./SignIn";

import SignUp from "./SignUp";
import Home from "./Home";

import { getDatabase } from "firebase/database";
const db = getDatabase(FireBase_Initializer);
const auth = getAuth(FireBase_Initializer);

export default function App() {
  const [userData, setuserData] = useState({
    firstName: JSON.parse(localStorage.getItem("userData"))
      ? JSON.parse(localStorage.getItem("userData")).firstName
      : "",
    lastName: JSON.parse(localStorage.getItem("userData"))
      ? JSON.parse(localStorage.getItem("userData")).lastName
      : "",
    number: JSON.parse(localStorage.getItem("userData"))
      ? JSON.parse(localStorage.getItem("userData")).number
      : "",
    Uid: JSON.parse(localStorage.getItem("userData"))
      ? JSON.parse(localStorage.getItem("userData")).Uid
      : "",
  });

  const [SignInStatus, setSignInStatus] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("User is signed in");
        console.log(user.uid);
      } else {
        console.log("No user");
      }
    });
  }, [userData]);
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <SignIn
                setSignInStatus={setSignInStatus}
                setUserData={setuserData}
              />
            }
          />
          <Route
            path="/SignUp"
            element={<SignUp setuserData={setuserData} userData={userData} />}
          />
          <Route path="/Home" element={<Home userData={userData} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
