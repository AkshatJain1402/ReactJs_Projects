import React, { useState } from "react";
import Footer from "../components/Footer";
import { Link, useNavigate } from "react-router-dom";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  signInWithPopup,
} from "firebase/auth";
import app from "../firebase";
import GoogleIcon from "../images/googleIcon.jpg";
function Signup() {
  const navigate = useNavigate();
  const auth = getAuth(app);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const passwordRegex = /^(?=.*[A-Z]).{6,12}$/;
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [signupResponse, setSignupResponse] = useState("");
  const handleGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then(async (result) => {
        const user = result.user;
        console.log(user);
        navigate("/Home");
      })
      .catch((error) => {
        setErrorMessage(error.message);
        setError(true);
      });
  };
  const HandleLogin = () => {
    if (emailRegex.test(email)) {
      console.log(email);
      setError(false);
    } else {
      console.log("Invalid email");
      setError(true);
      setErrorMessage("Invalid email format");
    }
    if (passwordRegex.test(password)) {
      console.log("Valid password");
      setError(false);
    } else {
      console.log("Invalid password");
      setError(true);
      setErrorMessage("Invalid password format");
    }
    if (!error) {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log(user);
          setPassword("");
          setEmail("");
          navigate("/");
          setSignupResponse("Signup successful");
          localStorage.setItem("user", user);
        })
        .catch((error) => {
          setErrorMessage(error.message);
          setError(true);
          setSignupResponse("");
        });
    }
  };
  return (
    <div id="mainContainerLP">
      <p> Welcome </p>
      <div id="loginForm">
        <input
          className="loginCredentials"
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="loginCredentials"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        {error ? <p>{errorMessage}</p> : null}
        <button
          style={{
            width: "50%",
            alignSelf: "center",
            height: "30px",
            marginTop: "10px",
          }}
          onClick={() => {
            HandleLogin();
          }}
        >
          Signup
        </button>
        <a
          style={{ alignSelf: "center", marginTop: 10 }}
          onClick={() => {
            handleGoogle();
          }}
        >
          <img
            src={GoogleIcon}
            alt="GoogleIcon"
            style={{ width: 30, height: 30 }}
          />
        </a>
        <p>{signupResponse}</p>
        <p style={{ color: "white" }}>
          Already have a account .
          <Link to="/Login" style={{ textDecoration: "none", color: "white" }}>
            Login?
          </Link>
        </p>
      </div>
      <div style={{ marginTop: 200 }}>
        {" "}
        <Footer></Footer>
      </div>
    </div>
  );
}

export default Signup;
