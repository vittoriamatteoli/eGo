import Joyride, { STATUS } from "react-joyride";
import styled, { createGlobalStyle, keyframes } from "styled-components";
import beaconImg from "../assets/walkthrough-icon.svg";
import { useState } from "react";

const GlobalStyle = createGlobalStyle`
  .joyride-overlay {
    background-color: rgba(0, 0, 0, 0.7);
  }
`;

const HighlightContainer = styled.div`
  position: relative;
  z-index: 1000;
`;

const pulse = keyframes`
0% {
  transform:  translate(-100%, -360%);
  opacity: 1;
}

55% {
  transform: translate(-100%, -370%);
  opacity: 0.8;
}

100% {
  opacity: 1;
}
`;

const Beacon = styled.span`
  position: absolute;
  transform: translate(-100%, -360%);
  animation: ${pulse} 1s ease-in-out infinite;

  background-image: url(${beaconImg});
  background-size: cover;
  display: inline-block;
  height: 15rem;
  width: 13rem;
  cursor: pointer;
`;

const BeaconComponent = ({ onClick, onMouseEnter, ref }) => (
  <Beacon
    aria-label="Application Walkthrough"
    title="Let me show you around!"
    onClick={onClick}
    onMouseEnter={onMouseEnter}
    ref={ref}
  />
);

const steps = [
  {
    target: ".step1",
    content:
      "Welcome to eGo! Discover our carbon footprint tracker app. Earn points, and reduce carbon emission!",
  },
  {
    target: ".EnergyCard__StyledBatteryCard-sc-lxw3ss-0",
    content:
      "Here you can tell us your energy level by drag the battery fluid. You will get different bonus depends on your energy level.",
  },
  {
    target: ".TravelCard__StyledTravelCard-sc-yv5liy-0",
    content:
      "Here you can tell us your travel by choosing your way of travel, your start place and your destination.",
  },
  {
    target: ".ActivityGraph__StyledContainer-sc-kbio2y-0",
    content: "You can see a chart of daily activity here.",
  },
  {
    target: ".total-points",
    content:
      "Your total points will be displayed here. Wait for more feature from us and use your points for exclusive rewards and eco-friendly discounts!",
  },
  {
    target: ".info-tag",
    content:
      "You can go through the tour again by clicking this information icon here. See you next time!",
  },
];

export const Walkthrough = ({ runWalkthrough }) => {
  const [run, setRun] = useState(runWalkthrough);

  return (
    <>
      <GlobalStyle />
      <Joyride
        beaconComponent={BeaconComponent}
        steps={steps}
        continuous={true}
        scrollToFirstStep={true}
        showProgress={true}
        showSkipButton={true}
        run={run}
        styles={{
          options: {
            arrowColor: "#fff",
            backgroundColor: "#fff",
            overlayColor: "rgba(0, 0, 0, 0.7)",
            primaryColor: "#000",
            textColor: "#000",
            width: 300,
            zIndex: 1000,
          },
          spotlight: {
            borderRadius: "10px",
            backgroundColor: "rgba(255, 255, 255, 0.8)",
          },
        }}
        callback={(data) => {
          const { status } = data;
          if ([STATUS.FINISHED, STATUS.SKIPPED].includes(status)) {
            setRun(false);
          }
        }}
      />
    </>
  );
};
