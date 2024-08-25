import React, { useContext, useEffect, useState } from "react";

import "./Home.css";
import Layout from "../components/Layout";
import SideNavbar from "../components/SideNavbar";
import Dashboard from "./Dashboard";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Context } from "../Context/Context";
import { getDatabase, ref, onValue } from "firebase/database";
import app from "../firebase";
const db = getDatabase(app);
function Home() {
  const { authLevel, setAuthLevel } = useContext(Context);
  const [user, setUser] = useState("");
  const navigate = useNavigate("/");
  const dbPath = ref(db, `/Users/${String(user["uid"])}/`);
  let blockData = {};
  let BlockName = "";
  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")));
    console.log("home");
  }, []);
  useEffect(() => {
    if (user == null) {
      navigate("/");
    }
    console.log("user data from home page", user["uid"]);

    onValue(
      dbPath,
      (snapshot) => {
        if (snapshot.exists()) {
          console.log(snapshot.val().authorityLevel);
          setAuthLevel(snapshot.val().authorityLevel);
          console.log("after updateing auth level", authLevel);

          // localStorage.setItem("data", JSON.stringify(snapshot.val())); // Logs the data from Firebase RTDB
        } else {
          console.log("No data available");
        }
      },
      (error) => {
        console.error("Error fetching data: ", error); // Handle errors
      }
    );
  }, [user]);
  useEffect(() => {
    if (authLevel == "District") {
      // onValue(
      //   ref(db, `/Districts/${snapshot.val().districtName}/`),
      //   (snapshot) => {
      //     if (snapshot.exists()) {
      //       localStorage.setItem("data", JSON.stringify(snapshot.val())); // Logs the data from Firebase RTDB
      //     } else {
      //       console.log("No data available for district");
      //     }
      //   },
      //   (error) => {
      //     console.error("Error fetching data: ", error); // Handle errors
      //   }
      // );
      console.log("data loading started");
      onValue(dbPath, (snapshot) => {
        if (snapshot.exists()) {
          console.log(snapshot.val().districtName);
          onValue(
            ref(db, `/Districts/${snapshot.val().districtName}/`),
            (snapshot) => {
              if (snapshot.exists()) {
                console.log(snapshot.val());
                localStorage.setItem("data", JSON.stringify(snapshot.val())); // Logs the data from Firebase RTDB
              } else {
                console.log("No block data available");
              }
            },
            (error) => {
              console.error("Error fetching data: ", error); // Handle errors
            }
          );
        } else {
          console.log("No data available");
        }
      });
    }

    if (authLevel == "Block") {
      onValue(dbPath, (snapshot) => {
        if (snapshot.exists()) {
          console.log(snapshot.val().blockName);
          BlockName = snapshot.val().blockName;

          // Reset blockData to ensure no previous data affects the structure
          blockData = {};

          onValue(
            ref(db, `/Districts/${snapshot.val().districtName}/${BlockName}/`),
            (snapshot) => {
              if (snapshot.exists()) {
                // Directly assign the block data to blockData object
                blockData[BlockName] = snapshot.val();

                console.log(JSON.stringify(blockData) + " block data variable");

                // Save the correctly structured data to localStorage
                localStorage.setItem("data", JSON.stringify(blockData));
              } else {
                console.log("No block data available");
              }
            },
            (error) => {
              console.error("Error fetching data: ", error); // Handle errors
            }
          );
        } else {
          console.log("No data available");
        }
      });
    }
  }, [authLevel, dbPath, db]);
  return (
    <div>
      {user ? (
        <Layout>
          {user ? (
            <div id="MainContainerH">
              <SideNavbar></SideNavbar>

              <Dashboard />
            </div>
          ) : null}
        </Layout>
      ) : (
        <div>
          {" "}
          <p>LOgin</p>
        </div>
      )}
    </div>
  );
}

export default Home;
