import styled from "styled-components";

const StyledEgoButton = styled.button`
  padding: 10px;
  margin-top: 10px;
  background-color: #687943;
  color: #FFFFFF;
  border: none;
  border-radius: 24px;
  width: 100%;
  cursor: pointer;
  box-shadow:1px 1px 3px rgba(104, 121, 67, 0.55);
  &:hover, &:focus, &:active {
    background-color: #CCE0A1;
    box-shadow:1px 1px 2px rgba(104, 121, 67, 0.55);
    color: #687943;
  }
`;

export const EgoButton = ({ className, children, onClick, ...props }) => (
  <StyledEgoButton className={className} onClick={onClick} {...props}>
    {children}
  </StyledEgoButton>
);