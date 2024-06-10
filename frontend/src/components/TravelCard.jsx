import styled from "styled-components";
import { TravelForm } from "./TravelForm";

const StyledTravelCard = styled.div`
  border-radius: 20px;
  background: linear-gradient(180deg, #dcded0 82.22%, #cce0a1 100%);
  padding: 40px 0;
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  justify-content: center;
  height: 340px;
  gap: 10px;
  h2 {
    color: #000;
    font-family: "Open Sans Hebrew";
    font-size: 12px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    padding: 10px;
    text-align: center;
  }
`;

export const TravelCard = ({ id }) => {
  return (
    <StyledTravelCard>
      <h2>Where do you want to go?</h2>
      <TravelForm id={id} />
    </StyledTravelCard>
  );
};
