import { Link } from "react-router-dom";
import styled from "styled-components";
import { EgoButton } from "../reusables/Button";
import { Logo } from "../reusables/Logo";
import Globe from "../assets/Globe.svg";

//styles
const LandingSection = styled.section`
  height: 100vh;
  /* width: 100vw; */
  background: linear-gradient(205deg, #dcded0 14.71%, #cce0a1 87.05%);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const TopSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 40px;
`;

const MiddleSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  width: 100%;
  height: 300px;
  /* overflow: hidden; */

  @media all and (min-width: 768px) {
    justify-content: space-around;
  }
`;

const StyledImage = styled.img`
  z-index: 2;
  width: 65%;
  max-width: 500px;
  position: absolute;
  top: 55%;
  left: 55%;
  transform: translate(-50%, -50%);

  @media (min-width: 768px) {
    /* max-width: 450px; */
    top: 65%;
  }

  @media (min-width: 1024px) {
    max-width: 750px;
    top: 65%;
  }
`;

const StyledTitle = styled.h1`
  color: #bacc92;
  font-family: "Roboto Mono";
  font-size: 240px;
  margin: 0;
  padding: 20px;
  z-index: 1;

  @media (min-width: 768px) {
    font-size: 450px;
  }

  @media (min-width: 1024px) {
    font-size: 700px;
  }
`;

const SmallEgoButton = styled(EgoButton)`
  width: 76px;
  height: 30px;
  border-radius: 36px;
  a {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    color: inherit;
    text-decoration: none;
    font-size: 12px;
    z-index: 3;
    @media (min-width: 768px) {
      font-size: 20px;
    }
    @media (min-width: 1024px) {
      font-size: 24px;
    }
  }
  @media (min-width: 768px) {
    width: 126px;
    height: 50px;
  }
  @media (min-width: 1024px) {
    width: 160px;
    height: 65px;
  }
`;

const BottomSection = styled.div`
  position: relative;
  width: 100%;
  height: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  z-index: 3;
`;
const StyledEllipse = styled.div`
  display: flex;
  justify-content: center;
  /* width: 100%;
  height: 100%; */
  width: 354px;
  height: 354px;
  border-radius: 50%;
  background: #fff;
  position: absolute;
  bottom: -210px;

  @media (min-width: 768px) {
    width: 557px;
    height: 557px;
    bottom: -400px;
  }
  @media (min-width: 1024px) {
    width: 624px;
    height: 624px;
    bottom: -450px;
  }
`;

const StyledAbout = styled(Link)`
  width: 170px;
  height: 170px;
  background: linear-gradient(
    60deg,
    #c590fb 7.61%,
    #9d97c7 57.63%,
    #39aa44 92.39%
  );
  border-radius: 50%;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  color: white;
  text-decoration: none;
  position: absolute;
  bottom: -120px;
`;

const StyledParagraph = styled.p`
  margin-top: 35px;
  text-align: center;
  font-size: 20px;
  width: 200px;
`;

//component
export const Landing = () => {
  return (
    <LandingSection>
      <TopSection>
        <Link to="/about">
          <Logo />
        </Link>
        <SmallEgoButton>
          <Link to="/login">Log in</Link>
        </SmallEgoButton>
      </TopSection>

      <MiddleSection>
        <StyledTitle>e</StyledTitle>
        <StyledImage src={Globe} alt="globe" />
        <StyledTitle>o</StyledTitle>
      </MiddleSection>

      <BottomSection>
        <SmallEgoButton>
          <Link to="/register">Sign up!</Link>
        </SmallEgoButton>
        <StyledEllipse>
          <StyledParagraph> Reduce carbon emmission.</StyledParagraph>
        </StyledEllipse>

        <StyledAbout to="/about">About us</StyledAbout>
      </BottomSection>
    </LandingSection>
  );
};
