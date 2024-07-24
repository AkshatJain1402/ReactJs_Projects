import React from "react";
import "./Home.css";
import aktuLogo from "./aktuLogo.png";
import sem1 from "./sem1Result.png";
import sem1Results from "./result1.png";
import sem2 from "./sem2Results.png";
import sem2Results from "./sem2.png";
import sem3 from "./sem3Result.png";
import sem3Results from "./sem3.png";
import sem4 from "./sem4Results.png";
import sem4Results from "./sem4.png";
import mooc from "./mooc.png";
import studentInfo from "./studentInfo.png";
function Home() {
  const [isVisible1, setIsVisible1] = React.useState(false);
  const [isVisible2, setIsVisible2] = React.useState(false);
  const [isVisible3, setIsVisible3] = React.useState(false);
  const [isVisible4, setIsVisible4] = React.useState(false);
  return (
    <div className="mainContainer">
      <img src={aktuLogo} height={200} width={"100%"} alt="aktu logo"></img>
      <img src={studentInfo} height={350} width={"100%"} alt="aktu logo"></img>
      <div>
        <a
          onClick={() => {
            setIsVisible1(!isVisible1);
          }}
        >
          <img
            src={sem1}
            height={80}
            width={"99.6%"}
            style={{ marginLeft: 5 }}
            alt="sem1"
          ></img>
        </a>
        <img
          src={sem1Results}
          height={330}
          width={"100%"}
          alt="sem1"
          style={{ display: isVisible1 ? "block" : "none" }}
        ></img>
      </div>

      <a
        onClick={() => {
          setIsVisible2(!isVisible2);
        }}
      >
        <img
          src={sem2}
          height={80}
          width={"99.6%"}
          style={{ marginLeft: 5 }}
          alt="sem2"
        ></img>
      </a>
      <img
        src={sem2Results}
        height={330}
        width={"100%"}
        alt="sem1"
        style={{ display: isVisible2 ? "block" : "none" }}
      ></img>
      <a
        onClick={() => {
          setIsVisible3(!isVisible3);
        }}
      >
        <img src={sem3} height={75} width={"100.4%"} alt="sem2"></img>
      </a>
      <img
        src={sem3Results}
        height={330}
        width={"100%"}
        alt="sem1"
        style={{ display: isVisible3 ? "block" : "none" }}
      ></img>

      <a
        onClick={() => {
          setIsVisible4(!isVisible4);
        }}
      >
        <img
          src={sem4}
          height={80}
          width={"99.6%"}
          style={{ marginLeft: 5 }}
          alt="sem2"
        ></img>
      </a>
      <img
        src={sem4Results}
        height={350}
        width={"100%"}
        alt="sem1"
        style={{ display: isVisible4 ? "block" : "none" }}
      ></img>

      <img src={mooc} height={300} width={"100%"}></img>
    </div>
  );
}

export default Home;
