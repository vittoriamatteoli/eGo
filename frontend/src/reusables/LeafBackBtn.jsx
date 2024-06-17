import { EgoButton } from './Button';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const LeafBackBtn = styled(EgoButton)`
 padding: 7px 15px;
 border-radius: 24px 0 20px 0;
  font-size: 0.8em;
`;

export const LeafBackButton = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(-1);
  };

  return (
    <div>
       <LeafBackBtn onClick={handleClick}>Back</LeafBackBtn>
    </div>

  );
};