import styled from "styled-components";
import Ripple from "./Ripple";

const StyledEgoButton = styled.button`
  padding: 10px;
  margin-top: 10px;
  background-color: #687943;
  color: #ffffff;
  border: none;
  border-radius: 24px;
  width: 100%;
  cursor: pointer;
  box-shadow: 1px 1px 3px rgba(104, 121, 67, 0.55);
  &:hover,
  &:focus,
  &:active {
    background-color: #cce0a1;
    box-shadow: 1px 1px 2px rgba(104, 121, 67, 0.55);
    color: #687943;
  }
`;

export const EgoButton = ({ children, onClick, className, disabled }) => (
  <StyledEgoButton onClick={onClick} className={className} disabled={disabled}>
    {children}
    {/* <Ripple color="#FDFFF1" /> */}
  </StyledEgoButton>
);
