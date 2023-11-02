import React, { useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { FireBase_Initializer } from "./FirebaseConfig";
import { useNavigate } from "react-router-dom";

import { UpDateData, saveData, setData } from "./CRUD_Firebase";
import "./SignUp.css";
const auth = getAuth(FireBase_Initializer);
export default function SignUp({ setuserData }) {
  const navigate = useNavigate();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [userLastName, setUserLastName] = useState("");
  const [userFirstName, setUserFirstName] = useState("");
  const [userNumber, setUserNumber] = useState("");

  const details = {
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    uid: "",
  };
  const CreateUser = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential.user.email + "USer Created Successfully");
        details.firstName = userFirstName;
        details.lastName = userLastName;
        details.phoneNumber = userNumber;
        details.email = email;
        details.uid = userCredential.user.uid;
        setData(details);
        setuserData({
          firstName: userFirstName,
          lastName: userLastName,
          number: userNumber,
          Uid: userCredential.user.uid,
          email: email,
        });

        navigate("/");
      })
      .catch((error) => {
        console.log(error.code);
      });
  };
  return (
    <div className="parentContainer">
      <div
        className="SignUP-container"
        style={{ height: "500px", borderStyle: "solid" }}
      >
        <h2>SignUp</h2>
        <input
          className="SignUpinputField"
          placeholder="Your First Name"
          onChange={(FirstName) => {
            setUserFirstName(FirstName.target.value);
          }}
        />
        <input
          className="SignUpinputField"
          placeholder="Your Last Name"
          onChange={(LastName) => {
            setUserLastName(LastName.target.value);
          }}
        />
        <input
          className="SignUpinputField"
          placeholder="Personal Number"
          onChange={(number) => {
            setUserNumber(number.target.value);
          }}
        />
        <input
          className="SignUpinputField"
          placeholder="Enter your Email"
          value={email}
          onChange={(email) => {
            setEmail(email.target.value);
          }}
        />
        <input
          className="SignUpinputField"
          placeholder="Enter Your Password"
          value={password}
          onChange={(pass) => {
            setPassword(pass.target.value);
          }}
        />
        <button className="button" onClick={CreateUser}>
          SignUp
        </button>
      </div>
    </div>
  );
}
