import styled from "styled-components";
//styles
const ArrowWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const StyledSvg = styled.svg`
  width: 76px;
  height: 76px;
  flex-shrink: 0;
`;

//component
export const UserFlowArrow = () => {
  return (
    <ArrowWrapper aria-label="Flow Arrow">
      <StyledSvg
        xmlns="http://www.w3.org/2000/svg"
        width="76"
        height="76"
        viewBox="0 0 76 76"
        fill="none"
      >
        <path
          d="M46.5673 16.1146C45.2149 16.6865 44.3332 18.0336 44.3332 19.5278L44.3332 28.5L9.49984 28.5C7.75089 28.5 6.33318 29.9178 6.33317 31.6666L6.33317 44.3333C6.33317 46.0823 7.75089 47.5 9.49984 47.5L44.3332 47.5L44.3332 56.4721C44.3332 57.9665 45.2149 59.3136 46.5673 59.8855C47.9196 60.457 49.4762 60.141 50.5113 59.0846L68.6065 40.6125C70.0198 39.1694 70.0198 36.8305 68.6065 35.3875L50.5113 16.9155C49.4762 15.8589 47.9196 15.5428 46.5673 16.1146Z"
          fill="#687943"
        />
      </StyledSvg>
    </ArrowWrapper>
  );
};
