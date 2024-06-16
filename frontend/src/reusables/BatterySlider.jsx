import styled, { keyframes } from "styled-components";
import { useParams } from "react-router";
import { useEffect, useState, useContext } from "react";
import { BatterySVG } from "../reusables/BatterySVG";
import { Button } from "@mui/material";
import { useMediaQuery } from "react-responsive";
import { DashboardContext } from "../components/DashboardContext";
import batteryUpdate from "../assets/battery-update.svg";
const apikey = import.meta.env.VITE_API_KEY;

const BatterySliderWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 30px;
  align-items: center;
  justify-content: space-between;
`;

const rotateOnce = keyframes`
  from {
    transform: translate(-5%, -80%) rotate(360deg);
  }
  to {
    transform:translate(-5%, -80%) rotate(0deg);
  }
`;

const BatteryUpdateIcon = styled.img.withConfig({
  shouldForwardProp: (prop) => prop !== "isClicked",
})`
  position: absolute;
  pointer-events: none;
  z-index: 1;

  width: 55px;
  height: 55px;
  transition: opacity 0.4s ease-in-out, transform 0.4s ease-in-out;

  transform: translate(-5%, -80%) rotate(360deg);
  opacity: ${({ isClicked }) => (isClicked ? "1" : "0")};
  animation: ${({ isClicked }) => (isClicked ? rotateOnce : "none")} 0.8s
    ease-in-out forwards;
`;

const StyledButton = styled(Button)`
  cursor: pointer;
  outline: none;
  text-transform: none;
  position: relative;
  z-index: 2;
  border-radius: 30px;
  border: 2px solid #687943;
  filter: drop-shadow(0px 4px 6px #00000040);
  background: ${({ isClicked }) => (isClicked ? "#2D3915" : "#687943")};
  width: 165px;
  height: 55px;
  color: #fff;
  font-family: "Open Sans", sans-serif;
  font-size: 18px;
  font-weight: 700;
  line-height: normal;
  text-transform: capitalize;
`;

export const BatterySlider = ({ showPopUp }) => {
  const { fillPercentage, setFillPercentage } = useContext(DashboardContext);
  const { id } = useParams();
  const API = `${apikey}/user/${id}`;
  const [message, setMessage] = useState("");
  const [error, setError] = useState(null);
  const [isClicked, setIsClicked] = useState(false);
  const isMobile = useMediaQuery({ maxWidth: 767 });

  useEffect(() => {
    const fetchEnergyData = async () => {
      try {
        const res = await fetch(API);
        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await res.json();
        if (data.energyLevel !== undefined && data.energyLevel !== null) {
          setFillPercentage(data.energyLevel);
        }
      } catch (error) {
        console.error("Error fetching energy data:", error);
      }
    };

    fetchEnergyData();
  }, [id]);

  const handleDrag = (percentage) => {
    if (percentage >= 0 && percentage <= 100) {
      setFillPercentage(percentage);
    }
  };

  const handleNewEnergy = async () => {
    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 400);

    const token = sessionStorage.getItem("accessToken");
    try {
      const response = await fetch(API, {
        method: "PATCH",
        body: JSON.stringify({ energyLevel: fillPercentage }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to update data");
      }
      const updatedData = await response.json();
      if (
        updatedData.energyLevel !== undefined &&
        updatedData.energyLevel !== null
      ) {
        setFillPercentage(updatedData.energyLevel);
        
      }
    } catch (error) {
      console.error("Error updating energy data:", error);
    }
  };

  return (
    <BatterySliderWrapper>
      {showPopUp && (
        <h2 aria-label="Energy Level Question">
          How's your energy level right now?
        </h2>
      )}
      <BatteryUpdateIcon
        src={batteryUpdate}
        alt="Battery update icon"
        isClicked={isClicked}
        draggable="false"
        aria-label="Battery Update Icon"
      />
      {
        <BatterySVG
          fillPercentage={fillPercentage}
          onDrag={handleDrag}
          aria-label="Battery Slider"
        />
      }
      {message && (
        <div aria-live="polite" aria-label="Message">
          {message}
        </div>
      )}
      {error && (
        <div aria-live="assertive" aria-label="Error Message">
          Error: {error}
        </div>
      )}
      {showPopUp && (
        <StyledButton onClick={handleNewEnergy} aria-label="Confirm Button">
          Confirm
        </StyledButton>
      )}
      {!isMobile && (
        <StyledButton onClick={handleNewEnergy} aria-label="Confirm Button">
          Confirm
        </StyledButton>
      )}
    </BatterySliderWrapper>
  );
};
