import React, { useState } from "react";
import "./Login.css";
import Footer from "../components/Footer";
import { Link, useNavigate } from "react-router-dom";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import app from "../firebase";
import GoogleIcon from "../images/googleIcon.jpg";
function Login() {
  const navigate = useNavigate();
  const auth = getAuth(app);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const passwordRegex = /^(?=.*[A-Z]).{6,8}$/;
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const HandleGoogleLogin = () => {
    const provider = new GoogleAuthProvider();

    signInWithPopup(auth, provider)
      .then(async (result) => {
        const user = result.user;
        console.log(user);
        localStorage.setItem("user", JSON.stringify(user));
        navigate("/Home");
      })
      .catch((error) => {
        setErrorMessage(error.message);
        setError(true);
      });
  };

  const HandleLogin = async () => {
    if (emailRegex.test(email)) {
      console.log(email);
      setError(false);
      await signInWithEmailAndPassword(auth, email, password).then(
        (userCredential) => {
          const user = userCredential.user;
          localStorage.setItem("user", JSON.stringify(user));
          console.log(user);
          navigate("/Home");
        }
      );
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
  };
  return (
    <div id="mainContainerLP">
      <p>Login to your account</p>
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
          Login
        </button>

        <a
          style={{ alignSelf: "center", marginTop: 10 }}
          onClick={() => {
            HandleGoogleLogin();
          }}
        >
          <img
            src={GoogleIcon}
            alt="GoogleIcon"
            style={{ width: 30, height: 30 }}
          />
        </a>
        <p style={{ color: "white" }}>
          Don't have a account .
          <Link to="/signUp" style={{ textDecoration: "none", color: "white" }}>
            SignUp?
          </Link>
        </p>
      </div>
      <div style={{ marginTop: 150 }}>
        {" "}
        <Footer></Footer>
      </div>
    </div>
  );
}

export default Login;
