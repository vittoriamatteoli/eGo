import { useEffect, useState } from "react";
import styled from "styled-components";

const StyledWrapper = styled.div`
  text-align: right;
  h2 {
    text-align: left;
  }
`;

export const PointsCard = () => {
const [points,setPoints]=useState("")

useEffect(()=>{
  
})


  return (
    <StyledWrapper>
      <h2>Dashboard</h2>
      <a>
        Your Points
        <span>
          <img src="/info.svg" alt="informations-icon" />
        </span>
      </a>
      <hr />
      <h3>points</h3>
    </StyledWrapper>
  );
};
