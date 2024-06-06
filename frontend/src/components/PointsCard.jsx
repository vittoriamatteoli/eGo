import { useEffect, useState } from "react";
import styled from "styled-components";
import { BatterySlider } from "../reusables/BatterySlider";
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
`;
export const PointsCard = ({ id }) => {
  const [points, setPoints] = useState("");

  const API = `${apikey}/user/${id}`;

  //fetch points
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

    handlePoints();
  }, [id]);

  return (
    <StyledWrapper>
      <h2>Dashboard</h2>
      <StyledSection>
        <p>Your Energy Level</p>
        <a>
          Your Points
          <span>
            <img src="/info.svg" alt="informations-icon" />
          </span>
        </a>
      </StyledSection>
      <hr />
      <StyledSection>
        <BatterySlider />
        <h3>{points}</h3>
      </StyledSection>
    </StyledWrapper>
  );
};
