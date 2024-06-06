import styled from "styled-components";
import { Button } from "@mui/material";

const StyledButton = styled(Button)`
  border-radius: 24px;
  border: 1px solid #687943;
  background: #687943;
  width: 106.213px;
  height: 35.172px;
  flex-shrink: 0;
  color: white;
  color: #fff;
  font-family: "Open Sans Hebrew";
  font-size: 12px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  text-transform: capitalize;
`;

export const TravelForm = ({ id }) => {
  console.log(id);

  return (
    <>
      <p>icons</p>
      <p>search boxes</p>
      <p>You will get 0 points for this trip</p>
      <StyledButton>Confirm</StyledButton>
    </>
  );
};
