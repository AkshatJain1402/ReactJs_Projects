import React from "react";
import firebase from "firebase/app";
import { app } from "./firebase";
import { collection, getFirestore, query } from "firebase/firestore";
import { get } from "firebase/database";

const db = getFirestore(app);
const data = query(collection(db, "DummyData"));
function Apptest() {
  console.log("hh", data);
  return <div>Apptest</div>;
}

export default Apptest;
