import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signOut,
} from "firebase/auth";
import { app } from "./firebase";
const auth = getAuth(app);

function UserSignUp() {
  const navigate = useNavigate();
  const [userID, setuserID] = useState("");
  const [userPassowrd, setUserPassword] = useState("");
  const [error, setError] = useState(null);

  const signUpUser = async () => {
    try {
      await createUserWithEmailAndPassword(auth, userID, userPassowrd)
        .then(() => {
          navigate("/");
          console.log("signup");
        })
        .catch((error) => {
          setError(error.code);
        });
    } catch (error) {
      console.log("error in the firebase call Function");
    }
  };
  return (
    <div>
      <h1>Sign Uphh</h1>
      <input
        placeholder="Enter EmailID"
        value={userID}
        onChange={(item) => setuserID(item.target.value)}
      />
      <input
        placeholder="Enter Password"
        value={userPassowrd}
        onChange={(item) => setUserPassword(item.target.value)}
      />
      <button onClick={signUpUser}> SignUp</button>
      {error ? (
        <div>
          <p>{error}</p>
          <Link to="/">Sign In?</Link>
        </div>
      ) : null}
    </div>
  );
}

export default UserSignUp;
