import React, { useState } from "react";
import { getAuth, signOut, signInWithEmailAndPassword } from "firebase/auth";
import { FireBase_Initializer } from "./FirebaseConfig";
import { Link, useNavigate } from "react-router-dom";
import { getData, setData } from "./CRUD_Firebase";
import { child, get, getDatabase, ref } from "firebase/database";
const auth = getAuth(FireBase_Initializer);
const database = getDatabase(FireBase_Initializer);

export default function SignIn({ setSignInStatus, setUserData }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [pass, setPassword] = useState("");
  const [errors, setErrors] = useState("");

  const SignIn = async (props) => {
    await signInWithEmailAndPassword(auth, email, pass)
      .then((userCredential) => {
        console.log(userCredential.user.uid + "from SIgn In");
        setSignInStatus(true);

        get(child(ref(database), "Data/" + userCredential.user.uid))
          .then((snapshot) => {
            console.log(snapshot.val() + "data");
            localStorage.setItem("userData", JSON.stringify(snapshot.val()));

            navigate("/Home");
          })
          .catch((error) => {
            console.log(error.code);
          });
      })
      .catch((error) => {
        setErrors(error.message);
        console.log(error.code + "catch block");
      });
  };
  return (
    <div>
      LogIn
      <input
        placeholder="email"
        value={email}
        onChange={(email) => {
          setEmail(email.target.value);
        }}
      />
      <input
        placeholder="pass"
        value={pass}
        onChange={(pass) => {
          setPassword(pass.target.value);
        }}
      />
      <button onClick={SignIn}>signin</button>
      {errors ? (
        <div>
          <p>{errors}</p> <Link to="/SignUp">SignUP?</Link>
        </div>
      ) : (
        <p>no error</p>
      )}
    </div>
  );
}
