import styled from "styled-components";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { EgoButton } from "../reusables/Button"
import Globe from "../assets/Globe-ego.svg";
import logo from "../assets/globe-logo.svg";
import { Loading } from "../reusables/Loading";

const Container = styled.div`
  overflow:hidden;
  color: var(--ego-dark);
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto auto;
  width: 100vw;
  height: 100vh;
  background-color: var(--ego-white);
  background: var(--ego-gradient-cutoff-mob);
  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr 1fr;
    background: var(--ego-gradient-cutoff-dt);
  }
`;

const LeftColumn = styled.div`
  height: 50vh;
  grid-column: 1;
  flex: 1;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: top;
  align-items: center;
  box-sizing: border-box;
  @media (min-width: 376px) {
    height: 10vh;
    padding: 0vh 0px 0px 0px;
  }
  @media (min-width: 768px) {
    height: 100vh;
    padding: 10vh 0px 0px 40px;
  }
`;

const RightColumn = styled.div`
  height: 50vh;
  grid-column: 1;
  flex: 1;
  padding: 0px 20px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 1vh;
  background-color: var(--ego-light);
  @media (min-width: 768px) {
    grid-column: 2;
      height: 100vh;
        margin-top: 0vh;
  }
`;

const ImageContainer = styled.div`
  width: 100%;
  text-align: center;

`;

const StyledLogo = styled.img`
  max-width: 50px;
  height: auto;
  padding: 10vh 0px 20px 40px;
  z-index: 3;
  position: absolute;
  top: 0;
  right: 0;
  margin-top: -40px;
  margin-right: 20px;
  @media (min-width: 768px) {
  max-width: 80px;
 top: 0;
  left: 0;
  margin-top: -40px;
  margin-left: -20px;
  }

`;

const StyledImage = styled.img`
  z-index: 3;
  height: auto;
  width: 120%;
  position: relative;
  padding: 0px 0px 0px 0px;
  margin-top: 2vh;
  margin-left: -60px;
  @media (min-width: 768px) {
    grid-column: 1;
    grid-row: 2;
    z-index: 2;
    width: 50vw;
  }
`;


const FormContainer = styled.div`
  grid-row: 1;
  width: 100%;
  max-width: 80vw;
  margin: 0 auto;
  padding-top: 3vh;
  h2 {
    text-align: center;
  }
  @media (min-width: 768px) {
    grid-row: 2;
    width: 400px;
  }
`;

const FormGroup = styled.div`
  margin-bottom: 15px;
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
  &:focus, &:active {
    background-color: var(--ego-lgt-green);
    border: 1px solid var(--ego-green);
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
  margin-top: 30px;
  font-size: 0.6em;

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
  @media (min-width: 768px) {
    grid-row: 3;
    position: absolute;
    bottom: 30px;
    text-align: center;
    right: 0;
    left: 50%;
    align-self: center;
  }
`;

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const apikey = import.meta.env.VITE_API_KEY;
  const API = `${apikey}/sessions`;
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setMessage("Please fill in all fields");
      return;
    }
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch(API, {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error("Invalid email or password.");
        } else if (response.status === 400) {
          throw new Error("Bad request. Please check your input.");
        } else {
          throw new Error("Something went wrong. Please try again.");
        }
      }

      const data = await response.json();
      console.log(data);
      const id = data.id; // get the user id from the response data
      setMessage("Login successful");
      sessionStorage.setItem("accessToken", data.accessToken);
      setEmail("");
      setPassword("");
      navigate(`/dashboard/${id}`);
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
        <StyledLogo src={logo} alt="logo" />
        <ImageContainer>
          <StyledImage src={Globe} alt="globe" />
        </ImageContainer>
      </LeftColumn>
      <RightColumn>
        <FormContainer>
          <h2>Login</h2>
          <form onSubmit={handleLogin}>
            {message && <ErrorMessage>{message}</ErrorMessage>}
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
              />
            </FormGroup>

            <EgoButton type="submit" disabled={loading}>
              {loading ? <Loading /> : "Log in"}
            </EgoButton>
          </form>
          <BottomText>
            <p>
              Don't have an account yet? <Link to="/register">Sign up</Link>
            </p>
          </BottomText>
        </FormContainer>
      </RightColumn>
    </Container>
  );
};