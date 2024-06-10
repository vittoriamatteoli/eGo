import styled from "styled-components";
import Ripple from "./Ripple";

const StyledEgoButton = styled.button`
  position: relative;
  overflow: hidden;
  padding: 10px 20px;
  margin-top: 10px;
  background-color: var(--ego-green);
  color: var(--ego-white);
  border: none;
  border-radius: 24px;
  cursor: pointer;
  font-size: 1.3rem;
  font-weight: 700;
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
  <StyledEgoButton onClick={onClick} className={className} disabled={disabled} >
    {children}
    <Ripple color="#FDFFF1" />
  </StyledEgoButton>
);