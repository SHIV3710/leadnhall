import React, { useState } from "react";
import styled from "styled-components";
import { Brokers } from "./Pages/Brokers";
import { Facility } from "./Pages/Facility";
import { Combined } from "./Pages/Combined";
import { Financial } from "./Pages/Financial";
import { Commercial } from "./Pages/Commercial";

const App = () => {
  const [option, setoption] = useState("Broker Stats");
  const [show, setshow] = useState(false);
  return (
    <Main>
      <Filter>
        <img
          src="https://img1.wsimg.com/isteam/ip/623c2985-82f9-414d-bddb-24c7c624a0ee/blob.png/:/rs=w:984,h:738"
          alt=""
        />
        <div className="dashboard" onClick={() => setshow(!show)}>
          {option}
        </div>
        {show ? (
          <>
            <div className="option">
              <div
                onClick={(e) => {
                  setoption(
                    option == "Broker Stats" ? "Class Stats" : "Broker Stats"
                  );
                  setshow(!show);
                }}
              >
                {option == "Broker Stats" ? "Class Stats" : "Broker Stats"}
              </div>
            </div>
          </>
        ) : (
          <></>
        )}
      </Filter>
      <Graph>
        {option === "Broker Stats" ? (
          <>
            <Brokers />
            <Facility />
            <Combined />
          </>
        ) : (
          <>
            <Financial />
            {/* <Commercial /> */}
          </>
        )}
      </Graph>
      <df-messenger
        chat-title="LEADBOT"
        agent-id="0b2912b8-29be-4d49-a555-0475653dd6a2"
        language-code="en"
      ></df-messenger>
    </Main>
  );
};

export default App;

const Main = styled.div`
  height: 100vh;
  width: 100vw;
  position: relative;
`;

const Filter = styled.div`
  height: 12vh;
  width: 96vw;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2vw;
  img {
    height: 12 vh;
    width: 10vw;
  }

  .dashboard {
    font-family: "Poppins";
    height: 5vh;
    width: 10vw;
    border-radius: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    border: 2px solid black;
    background-color: lightblue;
  }

  .option {
    font-family: "Poppins";
    position: absolute;
    display: flex;
    flex-direction: column;
    gap: 2vh;
    top: 10%;
    left: 87.8%;
    div {
      font-family: "Poppins";
      height: 5vh;
      width: 10vw;
      border-radius: 1rem;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 2px solid black;
    }
  }
`;
const Graph = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10vh;
`;
