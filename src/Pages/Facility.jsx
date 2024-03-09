import React, { useEffect, useState, useRef } from "react";
import data from "../broker.json";
import styled from "styled-components";
import Chart from "chart.js/auto";

export const Facility = () => {
  const [open, setopen] = useState([]);
  const [Broker, setBroker] = useState(data["Broker stats"]);
  const [year, setyear] = useState("2021");

  const handleopen = () => {
    let broker = Broker.filter((item) => {
      return item["Market Type"] == "Facilities" && item["Year"] == year;
    });

    broker.sort((a, b) => b["GWP"] - a["GWP"]);
    broker = broker.slice(0, 10);
    setopen(broker);
  };

  const [chart, setChart] = useState(null);

  useEffect(() => {
    if (open.length > 0) {
      const labels = open.map((item) => item["Broker Name"]);
      const gwps = open.map((item) => item["GWP"]);

      const ctx = document.getElementById("broker-chart");

      if (!chart) {
        const newChart = new Chart(ctx, {
          type: "bar",
          data: {
            labels: labels,
            datasets: [
              {
                label: "GWP",
                data: gwps,
                backgroundColor: "rgba(46, 223, 117, 0.6)", // Adjust color as needed
                borderWidth: 0.5,
                barThickness: 30, // Adjust the bar width as needed
              },
            ],
          },
          options: {
            scales: {
              y: {
                beginAtZero: true,
              },
            },
          },
        });
        setChart(newChart);
      } else {
        chart.data.labels = labels;
        chart.data.datasets[0].data = gwps;
        chart.update();
      }
    }
  }, [open]);
  useEffect(() => {
    handleopen();
  }, [year]);

  return (
    <Main>
      <div
        style={{
          height: "100vh",
          width: "40vw",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "20vw",
            width: "35vw",
          }}
        >
          <div className="broker" style={{ fontWeight: "bold", width: "20vw" }}>
            Facilities
          </div>
          <div
            className="broker"
            style={{
              display: "flex",
              fontFamily: "Poppins",
              gap: "2vw",
              alignItems: "center",
              cursor: "pointer",
            }}
          >
            <div
              style={{
                color: year == "2021" ? "blue" : "black",
                fontWeight: "bold  ",
              }}
              onClick={() => setyear("2021")}
            >
              2021
            </div>
            <div
              style={{
                color: year == "2022" ? "blue" : "black",
                fontWeight: "bold  ",
              }}
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
              <th>Broker Name</th>
              <th>GWP</th>
              <th>Planned GWP</th>
              <th>Differnce</th>
            </tr>
          </thead>
          <tbody>
            {open.map((item, index) => {
              return (
                <tr key={index}>
                  <td>{item.Year}</td>
                  <td>{item["Broker Name"]}</td>
                  <td>{item["GWP"]}</td>
                  <td>{item["Planned GWP"]}</td>
                  <td>
                    {`${(
                      ((item["Planned GWP"] - item["GWP"]) / item["GWP"]) *
                      100
                    ).toFixed(2)} %`}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <canvas
        id="broker-chart"
        style={{
          height: "70vh",
          width: "40vw",
        }}
      ></canvas>
    </Main>
  );
};

const Main = styled.div`
  height: 85vh;
  width: 96vw;
  /* overflow: scroll; */
  padding: 0 2vw;
  display: flex;
  justify-content: space-around;

  .broker {
    height: 6vh;
    width: 10vw;
    display: flex;
    margin-bottom: 3vh;
    border-radius: 1rem;
    justify-content: center;
    align-items: center;
    font-family: "Poppins";
  }
  table {
    border-collapse: collapse;
    font-family: "Poppins";
    font-size: small;
    height: 60vh;
    width: 35vw;
  }
  td,
  th {
    border: 1px solid #dddddd;
    padding: 8px;
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
    padding: 8px;
  }
  thead {
    display: table-header-group;
  }
`;
