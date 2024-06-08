import Back from '../assets/back-arrow.svg';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const StyledImage = styled.img`
  width: 30px;
  cursor: pointer;
  margin: 10px 0;
`;

export const BackArrowWithHistory = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(-1);
  };

  return (
    <StyledImage src={Back} alt="back-arrow" onClick={handleClick} />
  );
};