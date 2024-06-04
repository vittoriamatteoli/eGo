import { BackArrow } from "../reusables/BackArrow"
import { Logo } from "../reusables/Logo"
import styled from "styled-components"

const StyledSection = styled.section`
  height: 100vh;
  background: linear-gradient(205deg, #dcded0 14.71%, #cce0a1 87.05%);
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  p {
    color: #000;
    font-family: "Open Sans Hebrew";
    font-size: 10px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    letter-spacing: 0.3px;
    max-width: 200px;
    text-align: center;
  }
  .teamCard {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 30px;
  }
  .singleCard {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    h5 {
      padding: 0;
      margin: 0;
    }
    img {
      margin-bottom: 15px;
    }
  }
  .socialLinks {
    display: flex;
    align-items: center;
    justify-content: center;
    a {
      padding: 2px;
      text-align: center;
    }
  }
`

export const About = () => {
  return (
    <StyledSection>
      <BackArrow /> {/* need to align the arrow on top-left corner */}
      <h2>
        About <Logo />
      </h2>
      <p>
        eGo is a user-friendly platform that encourages and incentivizes
        sustainable travel. Whether you walk, cycle, use public transportation,
        or carpool, eGo tracks your eco-friendly journeys and rewards you with
        points. These points can be redeemed for a variety of rewards, fostering
        a community of conscious travelers dedicated to preserving our planet.
      </p>
      <h3>Meet our Team</h3>
      <section className="teamCard">
        <div className="singleCard">
          <img src="/Eliane-tree.svg" alt="tree" />
          <h5>Eliane</h5>
          <div className="socialLinks">
            <a href="https://github.com/El1an3">
              <img src="/github-icon.svg" alt="github-icon" />
            </a>
            <a href="https://www.linkedin.com/in/eliane-b-weber">
              <img src="/linkedin-icon.svg" alt="linkedin-icon" />
            </a>
          </div>
        </div>

        <div className="singleCard">
          <img src="/Kathinka-tree.svg" alt="tree" />
          <h5>Kathinka</h5>
          <div className="socialLinks">
            <a href="https://github.com/kathinka">
              <img src="/github-icon.svg" alt="github-icon" />
            </a>
            <a href="https://www.linkedin.com/in/kathinkamartinsen/">
              <img src="/linkedin-icon.svg" alt="linkedin-icon" />
            </a>
          </div>
        </div>

        <div className="singleCard">
          <img src="/Vittoria-tree.svg" alt="tree" />
          <h5>Vittoria</h5>
          <div className="socialLinks">
            <a href="https://github.com/vittoriamatteoli">
              <img src="/github-icon.svg" alt="github-icon" />
            </a>
            <a href="https://www.linkedin.com/in/vittoria-matteoli/">
              <img src="/linkedin-icon.svg" alt="linkedin-icon" />
            </a>
          </div>
        </div>

        <div className="singleCard">
          <img src="/Yifan-tree.svg" alt="tree" />
          <h5>Yifan</h5>
          <div className="socialLinks">
            <a href="https://github.com/Yifan-858">
              <img src="/github-icon.svg" alt="github-icon" />
            </a>
            <a href="https://www.linkedin.com/in/yifan-wang-dev/">
              <img src="/linkedin-icon.svg" alt="linkedin-icon" />
            </a>
          </div>
        </div>
      </section>
    </StyledSection>
  )
}
