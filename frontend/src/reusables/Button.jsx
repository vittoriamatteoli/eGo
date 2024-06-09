import styled from "styled-components";

const StyledEgoButton = styled.button`
  font-family: "Open Sans", sans-serif;
  font-weight: 600;
  padding: 10px;
  margin-top: 10px;
  background-color: #687943;
  color: #ffffff;
  border: none;
  border-radius: 24px;
  width: 100%;
  cursor: pointer;
  filter: drop-shadow(0px 4px 6px #00000040);
  border: 2px solid #687943;
  transition: all 0.3s ease-in-out;
  &:hover,
  &:focus,
  &:active {
    filter: drop-shadow(0px 4px 6px #00000080);
    background: #cce0a1;
    color: #2d3915;
  }
`;

export const EgoButton = ({ children, onClick, className, disabled }) => (
  <StyledEgoButton onClick={onClick} className={className} disabled={disabled}>
    {children}
  </StyledEgoButton>
);
