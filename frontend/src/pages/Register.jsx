import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import styled from "styled-components";
import { EgoButton } from "../reusables/Button"
import Globe from "../assets/Globe.svg";
import logo from "../assets/logo.svg";

const Container = styled.div`
color: var(--ego-dark);
  display: grid;
  grid-template-columns: 1fr;
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
height: 55vh;
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
  grid-column: 1;
  flex: 1;
  padding: 0 20px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: var(--ego-light);
  @media (min-width: 768px) {
    grid-column: 2;
  }
`;

const ImageContainer = styled.div`
  width: 100%;
  text-align: center;
`;

const StyledImage = styled.img`
  z-index: 3;
  height: auto;
  width: 120%;
  position: relative;
  padding: 0px 0px 0px 0px;
  @media (min-width: 768px) {
    grid-column: 1;
    grid-row: 2;
    z-index: 3;
    width: 50vw;
  }
`;

const StyledLogo = styled.img`
visibility: hidden;
max-width: 80px;
height: auto;
padding: 10vh 0px 20px 40px;
z-index:3;
position:absolute;
top:0;
left:0;
margin-top:-40px;
margin-left:-20px;
@media (min-width: 768px) {
  visibility: visible;
 }
`;


const FormContainer = styled.div`
grid-row: 1;
  width: 100%;
  max-width: 80vw;
  margin: 0 auto;
  h2 {
    text-align: center;
  }
  @media (min-width: 768px) {
    grid-row: 2;
    width:400px;
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

align-self: center;

`;

const ErrorMessage = styled.div`
  margin-bottom: 15px;
  padding: 10px;
  color: var(--ego-error);
  border-radius: 7px;
  border: 3px solid var(--ego-error);
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
        <StyledLogo src={logo} alt="logo" />
        <ImageContainer>
          <StyledImage src={Globe} alt="globe" />
        </ImageContainer>
      </LeftColumn>
      <RightColumn>
        <FormContainer>
          <h2>Sign up</h2>
          <form onSubmit={handleRegister}>
            {/* displayed on to of form as in figma design */}
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
              {/* Will create a loading spinner in next step and import from loading.jsx, instead of displaying it in the button */}
              {loading ? "Signing up..." : "Sign up"}
            </EgoButton>
          </form>
        </FormContainer>
        <BottomText>
          <p>
            Already have an account? <Link to="/login"> Log in </Link>
          </p>
        </BottomText>
      </RightColumn>
    </Container>
  );
};
