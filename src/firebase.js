import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyB6C6hABz0z7m_Axm71CG9OvQdSzpBX69o",
  authDomain: "notemakingapp-56cd7.firebaseapp.com",
  projectId: "notemakingapp-56cd7",
  storageBucket: "notemakingapp-56cd7.appspot.com",
  messagingSenderId: "1082951368456",
  appId: "1:1082951368456:web:d55deeb2ecd5688808f6bd",
  measurementId: "G-JTZTED348S",
  databaseURL: "https://notemakingapp-56cd7-default-rtdb.firebaseio.com/",
};

export const app = initializeApp(firebaseConfig);
