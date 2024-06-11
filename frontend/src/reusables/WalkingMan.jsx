import styled, { keyframes } from "styled-components";

//animation
const bob = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-4px);
  }
`;

const legWalk = keyframes`
  0%, 100% {
    transform: rotate(0deg);
  }
  25% {
    transform: rotate(-3deg);
  }
  50% {
    transform: rotate(0deg);
  }
  75% {
    transform: rotate(3deg);
  }
`;

const bodyBob = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-2px);
  }
`;

//styled
const SpinnerContainer = styled.div`
  display: inline-block;
  animation: ${bob} 1s infinite ease-in-out;
`;

const Svg = styled.svg`
  width: 40px;
  height: 40px;
`;

const Leg = styled.path`
  transform-origin: top center;
  animation: ${legWalk} 1s infinite ease-in-out;

  &.left-leg {
    animation-delay: 0s;
  }

  &.right-leg {
    animation-delay: 0.5s;
  }
`;

const Body = styled.path`
  animation: ${bodyBob} 1s infinite ease-in-out;
`;

//component
export const WalkingMan = () => {
  return (
    <SpinnerContainer>
      <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80" fill="none">
        <path
          d="M0 40C0 17.9086 17.9086 0 40 0C62.0914 0 80 17.9086 80 40C80 62.0914 62.0914 80 40 80C17.9086 80 0 62.0914 0 40Z"
          fill="#BFE470"
        />
        <Leg
          className="left-leg"
          d="M27.5288 60.2445L37.0699 46.1282L40.5548 48.7533L27.7323 67.2258L22.9848 63.3764C22.9848 63.3764 15.8551 57.4966 17.4156 55.9039C19.0154 54.271 23.1726 56.9631 23.1726 56.9631L27.5288 60.2445Z"
          fill="url(#paint0_linear_1_635)"
        />
        <Leg
          className="right-leg"
          d="M54.3403 58.4816L41.4174 47.509L44.408 44.4851L61.2811 59.1683L56.9363 63.2532C56.9363 63.2532 50.3134 69.3754 48.9094 67.6713C47.47 65.9243 50.602 62.2615 50.602 62.2615L54.3403 58.4816Z"
          fill="url(#paint1_linear_1_635)"
        />
        <Body
          d="M25.7689 30.0497C16.3714 26.7233 31.3076 9.56986 41.2737 9.75763C51.1002 9.94278 65.4214 26.6956 56.1822 30.0497C52.8983 31.2419 47.2371 30.0497 47.2371 30.0497C47.2371 30.0497 63.5438 40.298 58.5676 46.164C54.6487 50.7836 42.2231 50.2439 42.2231 50.2439H38.0487C38.0487 50.2439 27.3024 50.7836 23.3835 46.164C18.4073 40.298 34.714 30.0497 34.714 30.0497C34.714 30.0497 29.0622 31.2154 25.7689 30.0497Z"
          fill="url(#paint2_linear_1_635)"
        />
        <circle cx="35.1219" cy="18.5365" r="1.95122" fill="#BFE470" />
        <circle cx="42.9268" cy="18.5365" r="1.95122" fill="#BFE470" />
        <defs>
          <linearGradient
            id="paint0_linear_1_635"
            x1="30.289"
            y1="44.8806"
            x2="26.2287"
            y2="66.9492"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="#C590FB" />
            <stop offset="1" stop-color="#2D3915" />
          </linearGradient>
          <linearGradient
            id="paint1_linear_1_635"
            x1="39.4238"
            y1="53.8809"
            x2="60.8391"
            y2="60.5812"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="#C590FB" />
            <stop offset="1" stop-color="#2D3915" />
          </linearGradient>
          <linearGradient
            id="paint2_linear_1_635"
            x1="40.9755"
            y1="9.7561"
            x2="40.9755"
            y2="60.4878"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="#2D3915" />
            <stop offset="1" stop-color="#C590FB" />
          </linearGradient>
        </defs>
      </Svg>
    </SpinnerContainer>
  );
};
