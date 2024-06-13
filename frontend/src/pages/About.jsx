import { BackArrow } from "../reusables/BackArrow";
import { Logo } from "../reusables/Logo";
import { BackArrowWithHistory } from "../reusables/BackArrowWithHistory";
import styled from "styled-components";

const StyledImg = styled.img`
  position: fixed;
  bottom: 0;
  right: 0;
  width: 70%;
  height: auto;
  z-index: 0;

  @media (min-width: 768px) {
    max-width: 350px;
  }

  @media (min-width: 1024px) {
    max-width: 450px;
  }
`;

const StyledSection = styled.section`
  background: linear-gradient(205deg, #dcded0 14.71%, #cce0a1 87.05%);
  position: fixed; // Changed from relative
  width: 100vw; // Ensures it covers the full width of the viewport
  height: 100vh; // Ensures it covers the full height of the viewport
  top: 0; // Positions it at the top of the viewport
  left: 0; // Positions it at the left of the viewport
  z-index: -1; // Ensures it stays behind all other content
`;

const ScrollableWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  overflow-y: auto;
`;

const SectionWrapper = styled.div`
  padding: 30px;
  display: flex;
  flex-direction: column;
  @media all and (min-width: 768px) {
    padding: 30px 118px;
  }
`;
const StyledIntro = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  padding-bottom: 30px;
`;

const StyledTop = styled.h1`
  display: flex;
  flex-direction: column;
  padding: 60px 0;
  margin: 0;
`;

const StyledTitle = styled.div`
  font-size: 12px;
  font-weight: 700;
  padding-right: 20px;
  letter-spacing: 0.36px;

  @media (min-width: 768px) {
    font-size: 32px;
  }

  @media (min-width: 1024px) {
    font-size: 40px;
  }
`;

const StyledText = styled.p`
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.3px;
  margin: 0;

  @media (min-width: 768px) {
    font-size: 16px;
  }

  @media (min-width: 1024px) {
    font-size: 20px;
  }
`;

const TeamCard = styled.div`
  display: flex;
  flex-direction: row;
`;

const SingleCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 20px 40px 20px 0;

  @media (min-width: 768px) {
    padding: 30px 70px 30px 0;
  }

  @media (min-width: 1024px) {
    padding: 40px 90px 40px 0;
  }
`;

const StyledName = styled.h2`
  font-size: 10px;
  font-weight: 400;
  letter-spacing: 0.3px;

  @media (min-width: 768px) {
    font-size: 20px;
  }

  @media (min-width: 1024px) {
    font-size: 24px;
  }
`;

const SocialLinks = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
`;

const SocialImg = styled.img`
  width: 13px;
  height: 13px;
  z-index: 2;

  @media all and (min-width: 768px) {
    width: 26px;
    height: 26px;
    padding: 5px;
  }
`;

const CopyrightText = styled.p`
  font-size: 8px;
  font-weight: 400;
  letter-spacing: 0.24px;

  @media (min-width: 768px) {
    font-size: 15px;
  }

  @media (min-width: 1024px) {
    font-size: 20px;
  }
`;

//component
export const About = () => {
  return (
    <StyledSection>
      <ScrollableWrapper>
        <SectionWrapper>
          <BackArrowWithHistory />
          <StyledTop>
            <StyledIntro>
              <StyledTitle>About</StyledTitle>
              <Logo />
            </StyledIntro>
            <StyledText>
              eGo is a user-friendly platform that encourages and incentivizes
              sustainable travel. Whether you walk, cycle, use public
              transportation, or carpool, eGo tracks your eco-friendly journeys
              and rewards you with points. These points can be redeemed for a
              variety of rewards, fostering a community of conscious travelers
              dedicated to preserving our planet.
            </StyledText>
          </StyledTop>
          <StyledTitle>Meet our Team</StyledTitle>
          <TeamCard>
            <SingleCard>
              <img src="/Eliane-tree.svg" alt="tree" />
              <StyledName>Eliane</StyledName>
              <SocialLinks>
                <a href="https://github.com/El1an3">
                  <SocialImg src="/github-icon.svg" alt="github-icon" />
                </a>
                <a href="https://www.linkedin.com/in/eliane-b-weber">
                  <SocialImg src="/linkedin-icon.svg" alt="linkedin-icon" />
                </a>
              </SocialLinks>
            </SingleCard>

            <SingleCard>
              <img src="/Kathinka-tree.svg" alt="tree" />
              <StyledName>Kathinka</StyledName>
              <SocialLinks>
                <a href="https://github.com/kathinka">
                  <SocialImg src="/github-icon.svg" alt="github-icon" />
                </a>
                <a href="https://www.linkedin.com/in/kathinkamartinsen/">
                  <SocialImg src="/linkedin-icon.svg" alt="linkedin-icon" />
                </a>
              </SocialLinks>
            </SingleCard>

            <SingleCard>
              <img src="/Vittoria-tree.svg" alt="tree" />
              <StyledName>Vittoria</StyledName>
              <SocialLinks>
                <a href="https://github.com/vittoriamatteoli">
                  <SocialImg src="/github-icon.svg" alt="github-icon" />
                </a>
                <a href="https://www.linkedin.com/in/vittoria-matteoli/">
                  <SocialImg src="/linkedin-icon.svg" alt="linkedin-icon" />
                </a>
              </SocialLinks>
            </SingleCard>

            <SingleCard>
              <img src="/Yifan-tree.svg" alt="tree" />
              <StyledName>Yifan</StyledName>
              <SocialLinks>
                <a href="https://github.com/Yifan-858">
                  <SocialImg src="/github-icon.svg" alt="github-icon" />
                </a>
                <a href="https://www.linkedin.com/in/yifan-wang-dev/">
                  <SocialImg src="/linkedin-icon.svg" alt="linkedin-icon" />
                </a>
              </SocialLinks>
            </SingleCard>
          </TeamCard>
          <CopyrightText>© 2024 eGo. All rights reserved.</CopyrightText>
        </SectionWrapper>
        <StyledImg className="WorldPic" src="/world.svg" alt="world" />
      </ScrollableWrapper>
    </StyledSection>
  );
};
