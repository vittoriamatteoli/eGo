import { Link } from "react-router-dom";
import styled from "styled-components";
import { EgoButton } from "../reusables/Button";
import { Logo } from "../reusables/Logo";
import Globe from "../assets/Globe.svg";

//styles
const LandingSection = styled.section`
  /* height: 100vh;
  width: 100vw; */
  background: linear-gradient(205deg, #dcded0 14.71%, #cce0a1 87.05%);
  display: flex;
  flex-direction: column;
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
`;

const StyledImage = styled.img`
  z-index: 2;
  width: 60%;
  position: absolute;
  top: 55%;
  left: 55%;
  transform: translate(-50%, -50%);
`;

const StyledTitle = styled.h1`
  color: #bacc92;
  font-family: "Roboto Mono";
  font-size: 240px;
  margin: 0;
  z-index: 1;

  @media (min-width: 768px) {
    font-size: 450px;
  }

  @media (min-width: 1024px) {
    font-size: 700px;
  }
`;

const StyledEllipse = styled.div`
  /* width: 624px; */
  width: 100%;
  height: 624px;
  flex-shrink: 0;
  border-radius: 624px;
  background: #fff;
`;

const StyledAbout = styled.div`
  /* width: 624px; */
  width: 100%;
  height: 624px;
  flex-shrink: 0;
  border-radius: 624px;
  background: #fff;
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

const BottomSection = styled.div``;

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
        <StyledEllipse />
        <h2> Reduce carbon emmission.</h2>
        <StyledAbout />
        <SmallEgoButton>
          <Link to="/about">About us</Link>
        </SmallEgoButton>
      </BottomSection>
    </LandingSection>
  );
};
