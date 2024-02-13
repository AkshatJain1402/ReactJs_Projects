import React from "react";
import { useState, useEffect } from "react";
import SideBar from "./SideBar";
import NoteContainer from "./Note/NoteContainer";
import {
  child,
  get,
  getDatabase,
  ref,
  remove,
  set,
  update,
} from "firebase/database";
import { app } from "./firebase";

import { signOut, getAuth, onAuthStateChanged } from "firebase/auth";
import UserSignIn from "./UserSignIn";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  BrowserRouter,
} from "react-router-dom";
import UserSignUp from "./UserSignUp";

const db = getDatabase(app);
const auth = getAuth(app);
function App() {
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const uid = user.uid;
        console.log(uid, user);
        // ...
      } else {
        // User is signed out
        console.log("state changes User signed out");
        // ...
      }
    });
  }, []);
  const logout = () => {
    auth.signOut().then(() => {
      console.log("successfully Signed Out");
      setSignInStatus(false);
    });
  };
  const putData = () => {
    set(ref(db, "Notes/Note"), {
      id: 1,
      name: "akshat",
      note: "note",
    });
  };
  const getData = () => {
    get(child(ref(db), "Notes/Note2")).then((snapshot) => {
      console.log(snapshot.val());
    });
  };
  const UpDateData = () => {
    update(ref(db, "Notes/Note2"), { id: 3, name: "jain", note: "notes" });
  };
  const DeleteData = () => {
    remove(ref(db, "Notes/Note")).then(() => {
      console.log("successfully deleted");
    });
  };
  const [task, setTask] = useState("");
  const [SignInStatus, setSignInStatus] = useState(false);
  const [data, setData] = useState(localStorage.getItem("dummy"));
  const [notes, setNotes] = useState(
    localStorage.getItem("dum") ? JSON.parse(localStorage.getItem("dum")) : []
  );
  const addingDataToLocalStorage = () => {
    localStorage.setItem("dummy", task);
    setData(localStorage.getItem("dummy"));
    console.log(notes);
  };
  const addNotes = (color) => {
    const tempnotes = [...notes];
    tempnotes.push({
      color: color ? color : "red",
    });

    setNotes(tempnotes);
  };
  useEffect(() => {
    localStorage.setItem("dum", JSON.stringify(notes));
  }, [notes]);
  return (
    <div style={{ backgroundColor: "white", height: "100%", width: "100%" }}>
      <div>
        <h2 className="text-center">Today's Task</h2>
        <input
          placeholder="enter some data"
          onChange={(item) => setTask(item.target.value)}
        ></input>
        <button onClick={addingDataToLocalStorage}>SAVE data</button>
        <button onClick={putData}>firebase</button>
        {data ? <p>{data}</p> : <p>nothing found</p>}
      </div>

      <div>
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                <UserSignIn
                  SignInStatus={SignInStatus}
                  setSignInStatus={setSignInStatus}
                />
              }
            ></Route>

            <Route path="/UserSignUp" Component={UserSignUp} />
          </Routes>
        </BrowserRouter>
      </div>
      <button onClick={logout}>logout</button>
      <button onClick={getData}> Get Data</button>
      <button onClick={UpDateData}>UpDateData</button>

      {SignInStatus ? (
        <div
          style={{
            flex: 1,
            flexDirection: "column",
            flexWrap: "wrap",
            display: "flex",
            width: "100%",
            height: 800,
          }}
        >
          <SideBar addNotes={addNotes} SignInStatus={SignInStatus} />
          <NoteContainer notes={notes} setNotes={setNotes} />
        </div>
      ) : null}
    </div>
  );
}

export default App;
