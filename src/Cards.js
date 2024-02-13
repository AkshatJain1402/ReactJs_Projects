import React from "react";
import { useState, useEffect } from "react";
import { json } from "react-router-dom";
export default function Cards({ setNote, parentNote, keys, note }) {
  useEffect(() => {}, [parentNote]);
  const [fetchData, setFetchData] = useState(
    JSON.parse(localStorage.getItem("dum"))
  );
  const [data, setdata] = useState("");
  function saveData() {
    const obj = {
      task: data,
      color: note?.color,
      time: 2,
      keys: keys,
    };
    const tempnotes = [...parentNote];
    tempnotes[keys] = obj;
    setNote(tempnotes);
    localStorage.setItem("dum", JSON.stringify(parentNote));
  }
  return (
    <div style={{ marginLeft: 70 }}>
      <div
        style={{
          backgroundColor: note?.color,
          borderRadius: 25,
          borderWidth: 2,
          padding: 50,
          marginTop: 30,
          width: 210,
          height: 200,
        }}
      >
        <input onChange={(item) => setdata(item.target.value)}></input>
        <p>task</p>
        <p>{note?.time}</p>
        <button onClick={saveData}>press me to sAVE data </button>
        <p>{fetchData[keys]?.task} ye rha data</p>
      </div>
    </div>
  );
}
