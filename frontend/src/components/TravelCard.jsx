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
  gap: 10px;
`;

const StyledHeading = styled.h2`
  color: #000;
  font-family: "Open Sans", sans-serif;
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  padding: 10px;
  text-align: center;

  @media (min-width: 768px) {
    font-size: 18px; /* Use a larger font size for larger screens */
  }

  @media (min-width: 1024px) {
    font-size: 22px; /* Use an even larger font size for extra large screens */
  }
`;

export const TravelCard = ({ id }) => {
  return (
    <StyledTravelCard>
      <StyledHeading>Where do you want to go?</StyledHeading>
      <TravelForm id={id} />
    </StyledTravelCard>
  );
};
