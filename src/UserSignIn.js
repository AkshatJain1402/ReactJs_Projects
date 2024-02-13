import React from "react";
import { useState, useEffect } from "react";
import { app } from "./firebase";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Link } from "react-router-dom";

const auth = getAuth(app);

function UserSignIn({ SignInStatus, setSignInStatus }) {
  const [userPassword, setUserPassword] = useState("");
  const [userEmail, setUseremail] = useState("");
  const [signInError, setSignInError] = useState(null);
  const [signInErrorCode, setSignInErrorCode] = useState(null);

  const userSignIn = () => {
    signInWithEmailAndPassword(auth, userEmail, userPassword)
      .then((userCredential) => {
        setSignInStatus(true);
        console.log(signInErrorCode);
        console.log(userCredential.user.email);
      })
      .catch((error) => {
        setSignInError(error.message);
        setSignInErrorCode(error.code);
        console.log(signInErrorCode);
        setSignInStatus(false);
      });
  };
  return (
    <div>
      {!SignInStatus ? (
        <div>
          <div>
            <h1>Login </h1>
          </div>
          <div className="userDetails">
            <input
              value={userEmail}
              placeholder="Enter your email"
              onChange={(item) => setUseremail(item.target.value)}
            />
            <input
              value={userPassword}
              placeholder="Password"
              onChange={(item) => setUserPassword(item.target.value)}
            />
          </div>
          <button onClick={userSignIn}>Sign In</button>

          {SignInStatus ? (
            <p>Success </p>
          ) : (
            <div>
              <p>SignIn Failed {SignInStatus}</p>
              <Link to="/UserSignUp">Sign Up?</Link>
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
}

export default UserSignIn;
