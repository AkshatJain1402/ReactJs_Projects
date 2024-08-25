import React, { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import app from "../firebase";
import { getDatabase, set } from "firebase/database";
import BarChartBlockPage from "../components/BarChartBlockPage";
import ExcelSheet from "../components/excelSheet";
import "./BlockPage.css";
import bijnorLogo from "../images/bijnoreImage.png";
import SideNavbar from "../components/SideNavbar";

const db = getDatabase(app);

function BlockPage({ pData }) {
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
  const [barChartData, setBarChartData] = useState([]);
  const [piechartData, setPiechartData] = useState([]);
  const [schoolData, setSchoolData] = useState([]);
  const [BlockData, setBlockData] = useState([]);
  const { placeName } = useParams();
  const location = useLocation();
  const placeData = location.state?.placeData;
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  let lastmonth = 0;
  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")));

    console.log(pData + "from same page component style");
    if (placeData) {
      const data = Object.values(placeData);

      Object.keys(placeData).forEach((month) => {
        if (months.includes(month)) {
          if (months.indexOf(month) >= lastmonth) {
            lastmonth = months.indexOf(month);
            //console.log(lastmonth + "lastmonthww");
          }
        }

        return lastmonth;
      });
      console.log(months[lastmonth] + "lastMonth in useeffect");

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
      setBarChartData(data1);

      setBlockData(data);
    }
  }, [placeData]);
  useEffect(() => {
    console.log("use", JSON.parse(localStorage.getItem("user")));
    if (JSON.parse(localStorage.getItem("user")) == null) {
      navigate("/");
      console.log("user data not foun");
    }
  }, [user]);
  useEffect(() => {
    if (BlockData.length > 0) {
      const firstBlockData = BlockData[0];
      setSchoolData(firstBlockData ? firstBlockData : []);
    }
  }, [BlockData]);

  useEffect(() => {
    if (schoolData.length > 0) {
      const data = schoolData.map((item) => ({
        name: item["School Name"],
        value: item["Nipun's"],
      }));
      setPiechartData(data);
    }
  }, [schoolData]);

  if (!placeData) {
    return <p>No data found for {placeName}</p>;
  }

  return (
    <Layout>
      <div id="mainContainerSN">
        <SideNavbar></SideNavbar>
        <div style={{ marginTop: 80 }}>
          <div id="childContainer1SN">
            {barChartData ? (
              <div>
                <BarChartBlockPage data={barChartData} />{" "}
              </div>
            ) : null}
            <img
              src={bijnorLogo}
              alt="Bijnor Logo"
              style={{
                width: 300,
                height: 250,
                borderRadius: "100%",
                marginLeft: 250,
              }}
            />
          </div>
          <div className="Childcontainer2 SN">
            <ExcelSheet placeData={placeData} month={lastmonth}></ExcelSheet>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default BlockPage;
