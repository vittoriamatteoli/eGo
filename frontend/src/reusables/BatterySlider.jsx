import styled from "styled-components";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { BatterySVG } from "../reusables/BatterySVG";
import { Button } from "@mui/material";
import { useMediaQuery } from "react-responsive";

const apikey = import.meta.env.VITE_API_KEY;

const BatterySliderWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 30px;
  align-items: center;
  justify-content: center;
  @media (max-width: 767px) {
    height: 50px;
    div {
      width: 100px;
      height: 100px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
`;

const StyledButton = styled(Button)`
  border-radius: 24px;
  border: 1px solid #687943;
  background: #687943;
  width: 106.213px;
  height: 35.172px;
  flex-shrink: 0;
  color: white;
  font-family: "Open Sans Hebrew";
  font-size: 12px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  text-transform: capitalize;
`;

export const BatterySlider = ({ showPopUp }) => {
  const { id } = useParams();
  const API = `${apikey}/user/${id}`;
  const [fillPercentage, setFillPercentage] = useState(0);
  const [message, setMessage] = useState("");
  const [error, setError] = useState(null);
  const isMobile = useMediaQuery({ maxWidth: 767 });

  useEffect(() => {
    const token = sessionStorage.getItem("accessToken");
    const fetchEnergyData = async () => {
      try {
        const res = await fetch(API, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await res.json();
        if (data.energyLevel !== undefined && data.energyLevel !== null) {
          setFillPercentage(data.energyLevel);
        }
      } catch (error) {
        setError(
          "There was a problem with the fetch operation: " + error.message
        );
      }
    };
    fetchEnergyData();
  }, [id, API]);

  const handleDrag = (percentage) => {
    if (percentage >= 0 && percentage <= 100) {
      setFillPercentage(percentage);
    }
  };

  const handleNewEnergy = async () => {
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
        setMessage(`Energy level updated with ${fillPercentage}%`);
      }
    } catch (error) {
      console.error("Error updating energy data:", error);
      setError("Error: " + error.message);
    }
  };

  return (
    <BatterySliderWrapper>
      {showPopUp && <h2>How's your energy level right now?</h2>}
      {<BatterySVG fillPercentage={fillPercentage} onDrag={handleDrag} />}
      {message && <div>{message}</div>}
      {error && <div>Error: {error}</div>}
      {showPopUp && (
        <StyledButton onClick={handleNewEnergy}>Confirm</StyledButton>
      )}
      {!isMobile && (
        <StyledButton onClick={handleNewEnergy}>Confirm</StyledButton>
      )}
    </BatterySliderWrapper>
  );
};
