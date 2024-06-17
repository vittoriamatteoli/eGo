import { Link } from "react-router-dom";
import styled from "styled-components";
import { EgoButton } from "../reusables/Button";
import { Logo } from "../reusables/Logo";
import Globe from "../assets/Globe-ego.svg";
import { NoSelect } from "../reusables/NoSelect";

//styles
const LandingSection = styled.section`
  overflow: hidden;
  height: 100vh;
  background: linear-gradient(205deg, #dcded0 14.71%, #cce0a1 87.05%);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const TopSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 40px;
  z-index: 3;
`;

const MiddleSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  width: 100%;
  height: 300px;
  z-index: 1;

  @media all and (min-width: 1024px) {
    justify-content: space-around;
  }
`;

const StyledImage = styled.img`
  z-index: 2;
  height: 90%;
  position: absolute;
  top: 55%;
  left: 50%;
  transform: translate(-50%, -50%);

  @media (min-width: 768px) {
    height: 140%;
    top: 65%;
  }

  @media (min-width: 1024px) {
    height: 195%;
    top: 65%;
  }
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

const SmallEgoButton = styled(EgoButton)`
 // width: 76px;
  //height: 30px;
  border-radius: 36px;
  a {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    color: inherit;
    text-decoration: none;
   // font-size: 12px;
    z-index: 3;

    @media (min-width: 768px) {
      //font-size: 20px;
    }

    @media (min-width: 1024px) {
      //font-size: 24px;
    }
  }

  @media (min-width: 768px) {
   // width: 126px;
    //height: 50px;
  }

  @media (min-width: 1024px) {
    //width: 160px;
    //height: 65px;
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
  z-index: 4;
`;
const StyledEllipse = styled.div`
  display: flex;
  justify-content: center;
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
  display: flex;
  @media (min-width: 768px) {
    margin-top: 40px;
    font-size: 28px;
  }

  @media (min-width: 1024px) {
    margin-top: 50px;
  }
`;

const SignUpButton = styled(SmallEgoButton)`
  //position: absolute;
  top: -30px;

  @media (min-width: 768px) {
    top: -30px;
  }

  @media (min-width: 1024px) {
    top: -32px;
    left:7vw;
  }
`;

const Center = styled.div`
position: relative;

z-index:3;
padding: 0vh 30vw 10vh 30vw;

@media (min-width:344px){
padding: 27vh 30vw 0vh 30vw;
}

@media (min-width:360px){
padding: 5vh 30vw 0vh 30vw;
}
@media (min-width:360px) and (min-height:740px){
padding:15vh 30vw 0vh 30vw;
}
@media (min-width:375px){
padding: 5vh 30vw 0vh 30vw;
}
@media (min-width:375px) and (min-height:812px){
padding: 22vh 30vw 0vh 30vw;
}
@media (min-width:390px){
padding: 25vh 30vw 0vh 30vw;
}
@media (min-width:412px){
padding: 30vh 30vw 0vh 30vw;
}

@media (min-width: 414px) and (min-height:736px){
padding: 15vh 30vw 0vh 30vw;
  }
@media (min-width: 414px) and (min-height:896px){
padding: 30vh 30vw 0vh 30vw;
  }

@media (min-width:540px){
padding: 12vh 30vw 0vh 30vw;
}

@media (min-width:712px){
padding: 25vh 30vw 0vh 30vw;
}
@media (min-width:820px){
padding: 20vh 30vw 0vh 30vw;
}
@media (min-width:1024px){
padding: 15vh 44vw 0vh 30vw;
}
 @media (min-width: 1024px) and (min-height:600px) {
   padding: 0vh 42vw 15vh 29vw;
  }
    @media (min-width: 1080px) and (min-height:800px) {
   padding: 15vh 42vw 0vh 29vw;
  }
  @media (min-width: 1024px) and (min-height:1366px) {
   padding: 15vh 42vw 0vh 29vw;
  }

  @media (min-width: 1025px) {

  padding: 20vh 42vw 0vh 29vw;
  }
`;





//component
export const Landing = () => {
  return (
    <LandingSection>
      <TopSection>
        <Logo />
        <SmallEgoButton>
          <Link to="/login">Log in</Link>
        </SmallEgoButton>
      </TopSection>

      <MiddleSection>
        <NoSelect>
          <StyledTitle>e</StyledTitle>{" "}
        </NoSelect>
        <NoSelect>
          <StyledImage src={Globe} alt="globe" />
        </NoSelect>
        <NoSelect>
          <StyledTitle>o</StyledTitle>{" "}
        </NoSelect>
      </MiddleSection>

      <BottomSection>
        <StyledEllipse>
          <SignUpButton>
            <Link to="/register">Sign up!</Link>
          </SignUpButton>
          <StyledParagraph> Reduce carbon emission.</StyledParagraph>
        </StyledEllipse>
        <StyledAbout to="/about">
          <p>About us</p>
        </StyledAbout>
      </BottomSection>
    </LandingSection>
  );
};
