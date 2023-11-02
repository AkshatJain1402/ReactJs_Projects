import React, { useState } from "react";
import { getAuth, signOut, signInWithEmailAndPassword } from "firebase/auth";
import { FireBase_Initializer } from "./FirebaseConfig";
import { useNavigate } from "react-router-dom";

const auth = getAuth(FireBase_Initializer);

export default function SignOutUser() {
  const navigate = useNavigate();
  const logOut = () => {
    auth.signOut().then(() => {
      navigate("/");
      localStorage.removeItem("userData");
    });
  };
  return (
    <div>
      <button onClick={logOut}>SignOut</button>
    </div>
  );
}
