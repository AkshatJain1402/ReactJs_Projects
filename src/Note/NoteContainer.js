import React from "react";
import Cards from "../Cards";
import "./NoteContainer.css";

export default function NoteContainer(props) {
  return (
    // <div className="Container">
    //   <Cards color="beige" />
    //   <Cards color="blue" />
    //   <Cards color="gray" />
    //   <Cards color="orange" />
    //   <Cards color="yellow" />
    // </div>
    <div className="Content">
      <div className="Container">
        {/* Content that will have a customized scrollbar */}
        {/* <Cards color="beige" />
        <Cards color="blue" />
        <Cards color="gray" />
        <Cards color="orange" />
        <Cards color="yellow" /> */}
        {props.notes.map((item, index) => {
          return (
            <Cards
              keys={index}
              note={item}
              parentNote={props.notes}
              setNote={props.setNotes}
            />
          );
        })}
      </div>
    </div>
  );
}
