import styled from "styled-components";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Loading } from "../reusables/Loading";

const Container = styled.div`
  display: flex;
  width: 100vw;
  background-color: #fff;
`;

const LeftColumn = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  box-sizing: border-box;
  background-color: #d9d9d9;
  border-radius: 20px;
`;

const RightColumn = styled.div`
  flex: 1;
  padding: 20px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: #ffffff;
`;

const ImageContainer = styled.div`
  width: 80%;
  text-align: center;
`;

const StyledImage = styled.img`
  max-width: 100%;
  height: auto;
`;

const FormContainer = styled.div`
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
  h2 {
    text-align: center;
  }
`;

const FormGroup = styled.div`
  margin-bottom: 15px;
`;

const Input = styled.input`
  outline: none;
  border: none;
  width: 100%;
  padding: 10px;
  color: black;
  box-sizing: border-box;
  background-color: #d9d9d9;
  border-radius: 10px; //adjust once design is done

  &:focus {
    background-color: #fff;
    border: 1px solid black;
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #88a183;
  border: none;
  border-radius: 20px; //adjust once design is done
  color: black; //  white or black?
  cursor: pointer;
  &:hover {
    background-color: #88a183b7;
  }
`;

const ErrorMessage = styled.div`
  margin-bottom: 15px;
  padding: 10px;
  color: black;
  border-radius: 7px;
  border: 3px solid #c590fb;
`;

const BottomText = styled.div`
  margin-top: 20px;
  font-size: 0.6em;
  color: black;
  p {
    text-align: center;
    margin: 5px 0;
  }
  a {
    font-weight: bold;
    color: black;
    text-decoration: none;

    &:hover {
      //some effects
    }
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
      const id = data.id;
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
        <ImageContainer>
          <StyledImage src="world.png" alt="World" />
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
            {/* Conditionally render loading spinner or login button */}
            {loading ? <Loading /> : <Button type="submit">Log in</Button>}
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
