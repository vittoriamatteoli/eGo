import styled from "styled-components";

export const Loading = styled.div`
  border: 4px solid rgba(204, 224, 161, 0.4);
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border-left-color: #cce0a1;
  animation: spin 1s ease infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
