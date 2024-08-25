import React, { useEffect } from "react";
import "./excelSheet.css";
function ExcelSheet({ placeData }) {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let lastmonth = 0;
  let data = [];
  const [month, setMonth] = React.useState("");

  useEffect(() => {
    if (placeData) {
      Object.keys(placeData).forEach((month) => {
        if (months.includes(month)) {
          if (months.indexOf(month) >= lastmonth) {
            lastmonth = months.indexOf(month);
            console.log(lastmonth + "lastmonthww");
          }
        }

        return lastmonth;
      });
      console.log(months[lastmonth] + "lastMonth excel");

      const data1 =
        placeData && months[lastmonth]
          ? placeData[months[lastmonth]].map((item) => {
              return {
                name: item["School Name"],
                nipun: item["Nipun's"],
                upcomingNipun: item["Upcomming Nipun's"],
              };
            })
          : [];
      console.log(data1);
    }
  }, [placeData]);
  useEffect(() => {
    console.log(months[lastmonth] + "lastMonth excel");
    setMonth(months[lastmonth]);
  }, [lastmonth]);
  return (
    <div id="mainContainerExc">
      <section id="schoolList">
        <h1>Schools</h1>
        <ul>
          {placeData && month ? (
            placeData[month].map((item) => (
              <li key={item["School Name"]}>{item["School Name"]}</li>
            ))
          ) : (
            <li>no data</li>
          )}
        </ul>
      </section>
      <section id="Nipun">
        <h1>Nipun</h1>
        <ul>
          {placeData && month ? (
            placeData[month].map((item) => (
              <li key={item["School Name"]}>{item["Nipun's"]}</li>
            ))
          ) : (
            <li>no data for nipun is available</li>
          )}
        </ul>
      </section>
      <section>
        <h1>Upcomming Nipun</h1>
        <ul>
          {placeData && month ? (
            placeData[month].map((item) => (
              <li key={item["School Name"]}>{item["Upcomming Nipun's"]}</li>
            ))
          ) : (
            <li>no data for nipun is available</li>
          )}
        </ul>
      </section>

      <section>
        <h1>Ranking</h1>
        <ul>
          {placeData && month ? (
            placeData[month].map((item) => (
              <li key={item["School Name"]}>{item["School Ranking"]}</li>
            ))
          ) : (
            <li>no data for nipun is available</li>
          )}
        </ul>
      </section>
    </div>
  );
}

export default ExcelSheet;
