import React from "react";
import { useState, useEffect } from "react";
import "./SideBar.css";

function SideBar(props) {
  const [listOpen, setlistOpen] = useState(false);
  var normal = false;
  return (
    <div className="sidebarContainer">
      <button
        onClick={() => {
          normal = !normal;
          setlistOpen(!listOpen);
        }}
      >
        {/* ternary Operator Syntax */}
        {listOpen ? "Close" : "Open"}
      </button>
      {/* SideBarList */}
      <div
        style={
          listOpen
            ? {
                flex: 1,
                display: "flex",
                flexDirection: "column",
                display: "none",

                transition: "ease-in",
              }
            : {
                flex: 1,
                display: "flex",
                flexDirection: "column",
                height: "100%",
              }
        }
      >
        <button
          className="noteColor"
          style={listOpen ? {} : { backgroundColor: "beige" }}
          onClick={() => {
            console.log("hey");

            props.addNotes("beige");
          }}
        ></button>
        <button
          className="noteColor"
          style={{
            backgroundColor: "blue",
          }}
          onClick={() => {
            console.log("hey");

            props.addNotes("blue");
          }}
        ></button>
        <button
          className="noteColor"
          style={{
            backgroundColor: "gray",
          }}
          onClick={() => {
            console.log("hey");

            props.addNotes("gray");
          }}
        ></button>
        <button
          className="noteColor"
          style={{
            backgroundColor: "orange",
          }}
          onClick={() => {
            console.log("hey");

            props.addNotes("orange");
          }}
        ></button>
        <button
          className="noteColor"
          style={{
            backgroundColor: "yellow",
          }}
          onClick={() => {
            console.log("hey");

            props.addNotes("yellow");
          }}
        ></button>
        <button
          className="noteColor"
          style={{
            backgroundColor: "black",
          }}
          onClick={() => {
            console.log("hey");

            props.addNotes("black");
          }}
        >
          {props.SignInStatus}
        </button>
      </div>
    </div>
  );
}

export default SideBar;
