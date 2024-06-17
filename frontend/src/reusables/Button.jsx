import styled from "styled-components";
import Ripple from "./Ripple";

const StyledEgoButton = styled.button`
  font-family: "Open Sans", sans-serif;
  font-weight: 600;
  padding: 10px;
  margin-top: 10px;
  background-color: var(--ego-green);
  color: var(--ego-white);
  border: 1px solid var(--ego-green);
  border-radius: 24px;
  width: 100%;
  cursor: pointer;
  filter: drop-shadow(0px 4px 6px #00000040);
  border: 2px solid #687943;
  transition: all 0.3s ease-in-out;
  &:hover,
  &:focus,
  &:active {
    background-color: #cce0a1;
    box-shadow: 1px 1px 2px rgba(104, 121, 67, 0.55);
    color: var(--ego-dark);


  }
`;

export const EgoButton = ({ children, onClick, className, disabled }) => (
  <StyledEgoButton
    onClick={onClick}
    className={className}
    disabled={disabled}
    aria-label={children}
  >
    {children}
    {/* <Ripple color="#FDFFF1" /> */}
  </StyledEgoButton>
);
