import React, { useEffect, useState, useRef } from "react";
import data from "../Class.json";
import styled from "styled-components";
import Chart from "chart.js/auto";

export const Financial = () => {
  const [open, setopen] = useState([]);
  const [Broker, setBroker] = useState(data["Class stats"]);
  const [Class, setclass] = useState("Crime");
  const [year, setyear] = useState("2021");

  const handleopen = () => {
    let broker = Broker.filter((item) => {
      return (
        item["Class of Business"] == "Financial Institution" &&
        item["ClassType"] == Class &&
        item["Year"] == year
      );
    });
    setopen(broker);
  };

  useEffect(() => {
    handleopen();
  }, [Class, year]);

  return (
    <Main>
      <div
        style={{
          height: "100vh",
          width: "90vw",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div className="type" style={{ alignSelf: "start" }}>
          Financial Institution
        </div>
        <div
          style={{
            display: "flex",
            gap: "1vw",
            fontWeight: "bold",
            cursor: "pointer",
            width: "90vw",
            alignSelf: "flex-start",
          }}
        >
          <div
            className="broker"
            onClick={() => setclass("Crime")}
            style={{
              color: Class == "Crime" ? "lightblue" : "black",
            }}
          >
            Crime
          </div>
          <div
            className="broker"
            onClick={() => setclass("FIPI")}
            style={{
              color: Class == "FIPI" ? "lightblue" : "black",
            }}
          >
            FIPI
          </div>
          <div
            className="broker"
            onClick={() => setclass("D&O")}
            style={{
              color: Class == "D&O" ? "lightblue" : "black",
            }}
          >
            D&O
          </div>
          <div
            style={{
              display: "flex",
              gap: "3vw",
              fontFamily: "Poppins",
              alignItems: "center",
              justifySelf: "flex-end",
              width: "80vw",
              justifyContent: "flex-end",
            }}
          >
            <div
              style={{ color: year == "2021" ? "lightblue" : "black" }}
              onClick={() => setyear("2021")}
            >
              2021
            </div>
            <div
              style={{ color: year == "2022" ? "lightblue" : "black" }}
              onClick={() => setyear("2022")}
            >
              2022
            </div>
          </div>
        </div>

        <table>
          <thead>
            <tr>
              <th>Year</th>
              <th>Class of Business</th>
              <th>Class Type</th>
              <th>Business Plan</th>
              <th>Earned Premium</th>
              <th>GWP</th>
            </tr>
          </thead>
          <tbody>
            {open.map((item, index) => {
              return (
                <tr key={index}>
                  <td>{item.Year}</td>
                  <td>{item["Class of Business"]}</td>
                  <td>{item["ClassType"]}</td>
                  <td>{item["Business Plan"]}</td>
                  <td>{item["Earned Premium"]}</td>
                  <td>{item["GWP "]}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Main>
  );
};

const Main = styled.div`
  height: 85vh;
  width: 96vw;
  padding: 0 2vw;
  display: flex;
  justify-content: space-around;

  .type {
    font-family: "Poppins";
    font-weight: bold;
    font-size: large;
    text-decoration: underline;
  }

  .broker {
    height: 6vh;
    width: 10vw;
    display: flex;
    /* margin-bottom: 3vh; */
    border-radius: 1rem;
    align-items: center;
    font-family: "Poppins";
  }
  table {
    border-collapse: collapse;
    font-family: "Poppins";
    font-size: small;
    height: 60vh;
    width: 90vw;

    @media screen and (max-width: 650px) {
      font-size: 8px;
      width: 10vw;
    }
  }
  td,
  th {
    border: 1px solid #dddddd;
  }
  tr:nth-child(even) {
    background-color: #f2f2f2;
  }
  tr:hover {
    background-color: #dddddd;
  }
  th {
    background-color: #4caf50;
    color: white;
  }
  td,
  th {
    text-align: left;
    padding: 3px;
  }
  thead {
    display: table-header-group;
  }
`;
