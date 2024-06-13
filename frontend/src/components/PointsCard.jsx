import { useEffect, useState } from "react";
import styled from "styled-components";
import { BatterySlider } from "../reusables/BatterySlider";
import { useMediaQuery } from "react-responsive";
import { useContext } from "react";
import { DashboardContext } from "./DashboardContext";

const apikey = import.meta.env.VITE_API_KEY;

const StyledWrapper = styled.div`
  text-align: right;
  h2 {
    text-align: left;
  }
  h3 {
    color: var(--ego-green);
  }
`;

const StyledSection = styled.section`
  display: flex;
  justify-content: space-between;
  @media (min-width: 768px) {
    justify-content: flex-end;
  }

  svg {
    width: 50px;
    height: 50px;
  }
`;

const PopUpOverlay = styled.div`
  z-index: 20;
  box-sizing: border-box;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const PopUpContent = styled.div`
  z-index: 20;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 80%;
  height: 250px;
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  background: linear-gradient(180deg, #dcded0 82.22%, #cce0a1 100%);
  h2 {
    font-size: 15px;
  }
  svg {
    width: 100px;
    height: 100px;
  }
`;

const StyledHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  overflow: visible;
  visibility: visible;
`;

export const PointsCard = ({ id }) => {
  const { points, setPoints } = useContext(DashboardContext);
  const [showPopUp, setShowPopUp] = useState(false);

  const API = `${apikey}/user/${id}`;

  // Fetch points
  useEffect(() => {
    const handlePoints = async () => {
      try {
        const res = await fetch(API);
        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await res.json();
        if (data.points !== undefined && data.points !== null) {
          setPoints(data.points);
        }
      } catch (error) {
        console.error("Error fetching energy data:", error);
      }
    };

    // Call handlePoints immediately and then every 5 seconds
    handlePoints();
    const intervalId = setInterval(handlePoints, 5000);
    // Clean up the interval on unmount
    return () => clearInterval(intervalId);
  }, [API]);

  const togglePopUp = () => {
    setShowPopUp(!showPopUp);
  };

  // Media query for mobile devices
  const isMobile = useMediaQuery({ maxWidth: 767 });

  return (
    <StyledWrapper>
      <StyledHeader>
        <h2>Dashboard</h2>
      </StyledHeader>
      <StyledSection>
        {isMobile && <p>Your Energy Level</p>}
        <a>
          Your Points
          <span className="info-tag">
            <img src="/info.svg" alt="information-icon" />
          </span>
        </a>
      </StyledSection>
      <hr />
      <StyledSection>
        {isMobile && (
          <a onClick={togglePopUp}>
            <BatterySlider id={id} />
          </a>
        )}
        <h3 className="total-points">{points}</h3>
      </StyledSection>
      {showPopUp && (
        <PopUpOverlay onClick={togglePopUp}>
          <PopUpContent>
            <BatterySlider id={id} showPopUp={showPopUp} />
          </PopUpContent>
        </PopUpOverlay>
      )}
    </StyledWrapper>
  );
};
