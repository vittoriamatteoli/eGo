import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Loading } from "../reusables/Loading";
import styled from "styled-components";
import { EgoButton } from "../reusables/Button";
import Globe from "../assets/Globe-ego.svg";
import { Logo } from "../reusables/Logo";

const Container = styled.div`
  /* overflow: hidden; */
  color: var(--ego-dark);
  display: grid;
  grid-template-columns: 1vw 98vw 1vw;
  grid-template-rows: 50vh 50vh;
  background-color: var(--ego-white);
  grid-template-areas:
    "leftColumn leftColumn leftColumn"
    "rightColumn rightColumn rightColumn";

  @media all and (min-width: 768px) {
    grid-template-columns: 50vw 50vw;
    grid-template-rows: 10vh 80vh 10vh;
    grid-template-areas:
      "leftColumn rightColumn"
      "leftColumn rightColumn"
      "leftColumn rightColumn";
  }
`;

const LeftColumn = styled.div`
  background: var(--ego-gradient-cutoff-mob);
  grid-area: leftColumn;
  display: grid;
  grid-template-columns: 1fr 10fr 1fr;
  grid-template-rows: auto auto auto;
  grid-template-areas:
    ". . logo"
    "img img img"
    "img img img";

  @media all and (min-width: 768px) {
    background: var(--ego-gradient-cutoff-dt);
    grid-template-areas:
      "logo "
      "img"
      ". ";
    grid-column: 1;
    grid-row: 1 / span 4;
  }
`;

const RightColumn = styled.div`
  grid-area: rightColumn;
  display: grid;
  grid-template-columns: 1fr 10fr 1fr;
  grid-template-rows: 1fr 2fr 1fr;
  grid-template-areas:
    "title title title"
    "form form form"
    "link link link";
  align-self: center;
  @media all and (min-width: 768px) {
    grid-column: 2;
    grid-row: 2;
    grid-template-areas:
      ". title . "
      ". form . "
      ". link . ";
  }
`;

const StyledLogoLink = styled(Link)`
  grid-area: logo;
  grid-column: 3;
  padding: 10px;
  height: auto;
  margin: 2vh 0 0 -15vw;
  z-index: 3;
  @media all and (min-width: 768px) {
    grid-column: 1;
    margin: 2vh -10vw 0 2vh;
  }
`;

const StyledImage = styled.img`
  grid-area: image;
  grid-column: 1 / span 3;
  grid-row: 2 / span 2;
  z-index: 2;
  width: 100%;
  margin: 0 0 0 0vw;
  align-self: center;
  max-height: 350px;
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;

  @media all and (min-width: 768px) {
    width: 50vw;
    margin: 5vh 0 0 -2vw;
    grid-row: 1 / span 2;
    max-height: 50vw;
  }
`;

const FormContainer = styled.div`
  grid-area: form;
  align-self: center;
  justify-self: center;
  width: 60vw;
  @media all and (min-width: 768px) {
    width: 30vw;
  }
`;

const StyledH1 = styled.h1`
  grid-area: title;
  grid-column: 2;
  grid-row: 1;
  text-align: center;
  justify-self: center;
  align-self: center;
  font-size: 2em;
  color: var(--ego-dark);
  @media all and (min-width: 768px) {
    grid-column: 2;
    grid-row: 1;
    font-size: 40px;
  }
  @media (min-width: 1024px) {
    grid-column: 2;
    grid-row: 1;
    font-size: 48px;
  }
`;

const FormGroup = styled.div`
  margin-top: 10px;
`;

const Input = styled.input`
  outline: none;
  border: none;
  width: 100%;
  padding: 10px 10px 10px 24px;
  color: var(--ego-dark);
  box-sizing: border-box;
  border-radius: 24px;
  border: 1px solid transparent;
  background: var(--ego-gradient-reversed);
  &:focus,
  &:active {
    background-color: var(--ego-lgt-green);
    border: 1px solid var(--ego-green);
  }
  @media (min-width: 768px) {
    font-size: 20px;
  }
  @media (min-width: 1024px) {
    font-size: 24px;
  }
`;

const ErrorMessage = styled.div`
  margin-bottom: 15px;
  padding: 10px;
  color: var(--ego-dark);
  border-radius: 7px;
  border: 3px solid var(--ego-error);
`;

const BottomText = styled.div`
  grid-area: link;
  grid-row: 3;
  grid-column: 2;
  font-size: 0.6em;
  align-self: center;
  color: var(--ego-dark);
  p {
    text-align: center;
    margin: 5px 0;
  }
  a {
    color: var(--ego-dark);
    text-decoration: none;
    font-weight: bold;
    &:hover {
      color: var(--ego-purple);
    }
  }
  @media all and (min-width: 768px) {
    grid-row: 4;
    position: fixed;
    bottom: 5vh;
    align-self: end;
    justify-self: center;
  }
`;

const ButtonAndSpinnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledEgoButton = styled(EgoButton)`
  @media (min-width: 768px) {
    font-size: 20px;
  }
  @media (min-width: 1024px) {
    font-size: 24px;
  }
`;

const StyledParagraph = styled.p`
  @media (min-width: 768px) {
    font-size: 16px;
  }
  @media (min-width: 1024px) {
    font-size: 20px;
  }
`;

export const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const apikey = import.meta.env.VITE_API_KEY;
  const API = `${apikey}/user`;

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!username || !email || !password) {
      setMessage("Please fill in all fields");
      return;
    }
    if (password.length < 8) {
      setMessage("Password must be at least 8 characters long");
      return;
    } else if (password.length > 30) {
      setMessage("Password must be at most 30 characters long");
      return;
    }
    if (username.length < 3) {
      setMessage("Username must be at least 3 characters long");
      return;
    }
    if (username.length > 30) {
      setMessage("Username must be at most 30 characters long");
      return;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setMessage("Email is invalid");
      return;
    } else if (email.length > 30) {
      setMessage("Email must be at most 30 characters long");
      return;
    }
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch(API, {
        method: "POST",
        body: JSON.stringify({ username, email, password }),
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
      if (!response.ok) {
        setMessage(data.message);
        setLoading(false);
        return;
      }

      console.log(data);
      setMessage("Registration successful");
      setUsername("");
      setEmail("");
      setPassword("");
      navigate("/login");
    } catch (error) {
      console.error(error);
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <LeftColumn>
        <StyledLogoLink to="/" aria-label="Home">
          <Logo alt="logo" />
        </StyledLogoLink>
        <StyledImage src={Globe} alt="globe" aria-label="Globe" />
      </LeftColumn>
      <RightColumn>
        <StyledH1>Sign up</StyledH1>
        <FormContainer>
          <form onSubmit={handleRegister}>
            {message && <ErrorMessage>{message}</ErrorMessage>}
            <FormGroup>
              <Input
                type="text"
                id="username"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Name"
                required
                disabled={loading}
                aria-label="Username"
              />
            </FormGroup>
            <FormGroup>
              <Input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
                disabled={loading}
                aria-label="Email"
              />
            </FormGroup>
            <FormGroup>
              <Input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
                disabled={loading}
                aria-label="Password"
              />
            </FormGroup>
            <ButtonAndSpinnerContainer>
              <StyledEgoButton
                type="submit"
                disabled={loading}
                aria-label="Sign up button"
              >
                {loading ? "Loading..." : "Sign up"}
              </StyledEgoButton>
              {loading && <Loading />}
            </ButtonAndSpinnerContainer>
          </form>
        </FormContainer>
        <BottomText>
          <StyledParagraph>
            Already have an account?{" "}
            <Link to="/login" aria-label="Login link">
              {" "}
              Log in{" "}
            </Link>
          </StyledParagraph>
        </BottomText>
      </RightColumn>
    </Container>
  );
};
