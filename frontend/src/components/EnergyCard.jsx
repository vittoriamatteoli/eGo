import { BatterySlider } from "../reusables/BatterySlider";
import styled from "styled-components";
import { useMediaQuery } from "react-responsive";

const StyledBatteryCard = styled.div`
  border-radius: 20px;
  background: linear-gradient(180deg, #dcded0 82.22%, #cce0a1 100%);
  padding: 40px 0;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 340px;
  align-items: center;
  justify-content: center;
  gap: 30px;

  h2 {
    color: #000;
    font-family: "Open Sans Hebrew";
    font-size: 12px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    /* padding: 10px; */
    text-align: center;
  }
`;

export const EnergyCard = ({ id }) => {
  const isMobile = useMediaQuery({ maxWidth: 767 });

  return (
    !isMobile && (
      <StyledBatteryCard>
        <h2>How's your energy level right now?</h2>
        <BatterySlider id={id} />
      </StyledBatteryCard>
    )
  );
};
