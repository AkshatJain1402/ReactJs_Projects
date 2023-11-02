import React, { useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { FireBase_Initializer } from "./FirebaseConfig";
import { useNavigate } from "react-router-dom";

import { UpDateData, saveData, setData } from "./CRUD_Firebase";

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
    <div>
      <div>
        <input
          placeholder="Your First Name"
          onChange={(FirstName) => {
            setUserFirstName(FirstName.target.value);
          }}
        />
        <input
          placeholder="Your Last Name"
          onChange={(LastName) => {
            setUserLastName(LastName.target.value);
          }}
        />
        <input
          placeholder="Personal Number"
          onChange={(number) => {
            setUserNumber(number.target.value);
          }}
        />
        <input
          placeholder="Enter your Email"
          value={email}
          onChange={(email) => {
            setEmail(email.target.value);
          }}
        />
        <input
          placeholder="Enter Your Password"
          value={password}
          onChange={(pass) => {
            setPassword(pass.target.value);
          }}
        />
      </div>
      <button onClick={CreateUser}>SignUp</button>
    </div>
  );
}
