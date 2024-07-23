import React, { useState } from "react";
import "./Card.css";
import {
  ref as dbRef,
  get,
  getDatabase,
  onValue,
  set,
} from "firebase/database";
import app from "../firebase";

const db = getDatabase(app);
function Card({ bus }) {
  const reference = dbRef(db, "/Buses");

  const [busData, setBusData] = useState(bus);
  const [isEditable, setIsEditable] = useState(false);

  const handleEditClick = () => {
    setIsEditable(!isEditable);
  };
  const handleEdit = (details) => {
    console.log(details);

    console.log("new details", busData);
    console.log("path", `/Buses/${String(busData["busname"]).toUpperCase()}`);
    // set(reference, details);

    set(dbRef(db, `/Buses/${String(busData["busname"]).toUpperCase()}`), {
      ...busData,
    }).then(() => {
      console.log("Data updated");
    });
  };
  return (
    <div id="busCard">
      <input
        style={{ fontSize: 20, marginLeft: "35%" }}
        className="busDetails"
        disabled={!isEditable}
        name="busname"
        value={busData["busname"]}
        onChange={(e) => {
          setBusData({ ...busData, busname: e.target.value });
        }}
      />

      <span id="busRoutes">
        <p>Bus Route :</p>
        <label style={{ marginTop: "15px" }}>from -</label>
        <input
          aria-label="from"
          style={{ marginTop: "15px" }}
          disabled={!isEditable}
          className="busDetails"
          value={busData["from"]}
          name="from"
          onChange={(e) => {
            setBusData({ ...busData, from: e.target.value });
          }}
        />
        <label style={{ marginTop: "15px" }}>to</label>
        <input
          style={{ marginTop: "15px" }}
          disabled={!isEditable}
          className="busDetails"
          value={busData["to"]}
          name="to"
          onChange={(e) => {
            setBusData({ ...busData, to: e.target.value });
          }}
        />
      </span>
      <div>
        {" "}
        <label>Bus Price:</label>
        <input
          disabled={!isEditable}
          className="busDetails"
          value={busData["busprice"]}
          name="busprice"
          onChange={(e) => {
            setBusData({ ...busData, busprice: e.target.value });
          }}
        />
      </div>

      <div>
        {" "}
        <label>Bus Seats :</label>
        <input
          className="busDetails"
          value={busData["busseat"]}
          disabled={!isEditable}
          name="busseat"
          onChange={(e) => {
            setBusData({ ...busData, busseat: e.target.value });
          }}
        ></input>
      </div>

      <section id="cardBtn">
        <button
          id="editButtonCard"
          onClick={() => {
            handleEditClick();
          }}
        >
          Edit?
        </button>
        <button
          style={{
            display: isEditable ? "block" : "none",

            backgroundColor: "transparent",
          }}
          onClick={() => {
            handleEdit();
          }}
        >
          confirm changes.
        </button>
      </section>
    </div>
  );
}

export default Card;
