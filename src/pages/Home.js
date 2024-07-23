import React, { useEffect, useRef, useState } from "react";
import Layout from "../components/Layout";

import "./Home.css";
import Card from "../components/Card";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getDatabase } from "firebase/database";

import { ref as dbRef, get, onValue, set } from "firebase/database";
import app from "../firebase";

const db = getDatabase(app);

function Home() {
  const reference = dbRef(db, "/Buses");
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [buses, setBuses] = useState([]);

  useEffect(() => {
    const a = JSON.parse(localStorage.getItem("user"));
    console.log("user values", a);
    setUser(a);
  }, []);
  useEffect(() => {
    if (localStorage.getItem("user") == null) {
      navigate("/");
      console.log("User not logged in");
    }

    console.log("user in second useEffect", user);
    try {
      onValue(reference, (snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();

          const a = Object.values(data);

          const busesData = [];
          a.forEach((bus) => {
            if (user && String(user.uid) == bus.owner) {
              console.log("Bus belongs to user");
              if (!busesData.includes(bus)) {
                busesData.push(bus);
                setBuses(busesData);
              }
            } else {
              console.log("Bus does not belong to user");
            }
          });
        } else {
          console.log("No data available");
        }
      });
    } catch (e) {
      console.log(e);
    }
    console.log(buses);
  }, [user]);

  return (
    <Layout user={user}>
      <div id="mainContainerHome">
        <div id="cardContainer">
          {buses.map((bus) => {
            return <Card key={bus["busname"]} bus={bus}></Card>;
          })}
        </div>
      </div>
    </Layout>
  );
}

export default Home;
