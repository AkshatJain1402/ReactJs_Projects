// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAMVu4dh88mjM6fB4oTw6bpvHtlNpZCVsU",
  authDomain: "findbus-83c6e.firebaseapp.com",
  databaseURL: "https://findbus-83c6e-default-rtdb.firebaseio.com",
  projectId: "findbus-83c6e",
  storageBucket: "findbus-83c6e.appspot.com",
  messagingSenderId: "154324220751",
  appId: "1:154324220751:web:7cf4a9b1c191362f1ba33a",
  measurementId: "G-V7VGM9KDHR",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export default app;
