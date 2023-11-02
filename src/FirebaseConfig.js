import React from "react";
import { initializeApp } from "firebase/app";
const firebaseConfig = {
  apiKey: "AIzaSyCfeYy0r8hTTJkFzyKoorqd4DZC-PTycxM",
  authDomain: "gitprojects-79cb8.firebaseapp.com",
  projectId: "gitprojects-79cb8",
  storageBucket: "gitprojects-79cb8.appspot.com",
  messagingSenderId: "495893183600",
  appId: "1:495893183600:web:e7a153224ebedc231088b5",
  measurementId: "G-GFDQX5NRS7",
  databaseURL: "https://gitprojects-79cb8-default-rtdb.firebaseio.com/",
};
function FirebaseConfig() {
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  return <div>FirebaseConfig</div>;
}
export const FireBase_Initializer = initializeApp(firebaseConfig);
