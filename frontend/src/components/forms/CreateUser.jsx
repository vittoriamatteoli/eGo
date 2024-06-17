import { useState } from "react";
import styled from "styled-components";
import { EgoButton } from "../../reusables/Button";
const apiKey = import.meta.env.VITE_API_KEY;
const API = apiKey + "/admin";

const FormContainer = styled.div`
background: var(--ego-lgt-green);
border-radius: 25px 0px;
padding: 20px;
height:fit-content;
box-shadow: 0px 0px 3px 0px var(--ego-green);
  width: 100%;
  max-width: 80vw;
  margin: 0 auto;
  h2 {
    text-align: center;
  }
  @media (min-width: 768px) {
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
  box-shadow: inset 2px 3px 5px -5px var(--ego-green);
  padding: 10px 10px 10px 24px;
 color: var(--ego-brown);
  box-sizing: border-box;
  border-radius: 24px;
  border: 1px solid transparent;
  background: var(--ego-light-tint);


  &:focus, &:active {
    background-color: var(--ego-light);
    border: 1px solid var(--ego-light-tint);
  }
`;

const ErrorMessage = styled.div`
  margin: 15px 0;
  padding: 10px;
  color: var(--ego-brown);
  border: 3px solid var(--ego-brown);
`;
const StyledSelect = styled.select`
  display: block;
  background: var(--ego-light-tint);
  background: var( --ego-gradient-trans);
   box-shadow: 2px 3px 5px -5px var(--ego-green);
  color: var(--ego-brown);
  font-size: 1em;
  padding: 0.5em;
    border: 1px solid var(--ego-light-tint);
  border-radius: 25px;

  &:focus,
  &:active {
    background-color: var(--ego-light);
    background: var(--ego-gradient-trans);
    border: 1px solid var(--ego-light-tint);
  }
`;

const StyledLabel = styled.label`
 display: block;
   color: var(--ego-brown);
  font-size: 1em;
  margin: 0.5em;
`;
const StyledH1 = styled.h1`
text-transform: uppercase;
 display: block;
  color: var(--ego-wcag-drk-green);
  font-size: 1em;
  margin: 0.5em;
  font-weight: bold;
`;

export const CreateUser = ({ getUsers }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("user");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const Update = async () => {
    const token = sessionStorage.getItem("accessToken");
    try {
      const response = await fetch(`${API}/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name, email, role, password }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        const errorMessage = errorData.message || errorData.error;
        setMessage(
          errorMessage || "An error occurred while creating the user."
        );
        throw new Error(errorMessage);
      }

      getUsers();
      setMessage("User created successfully");
    } catch (error) {
      // check if it includes the error message from the backend
      if (error.message.includes("User with this email already exists")) {
        setMessage("A user with the same email already exists.");
      } else {
        setMessage(`An unexpected error occurred: ${error.message}`);
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let errors = {};

    if (!name) errors.name = "Name is required.";
    if (!email) errors.email = "Email is required.";
    if (!password) errors.password = "Password is required.";
    if (!role) errors.role = "Role is required.";
    setErrors(errors);

    if (Object.keys(errors).length === 0) {
      // If no errors, celebrate and send fresh user data to the server
      Update();
    }
  };

  return (
    <FormContainer>
      <form onSubmit={handleSubmit}>
        <FormGroup>
          <StyledH1>Create user</StyledH1>

          <StyledLabel>Name</StyledLabel>
          <Input
            type="text"
            name="name"
            onChange={(e) => setName(e.target.value.trim())}
          />
          {errors.name && <ErrorMessage>{errors.name}</ErrorMessage>}
          <StyledLabel>Email</StyledLabel>
          <Input
            type="text"
            name="email"
            onChange={(e) => setEmail(e.target.value.trim())}
          />
          {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
          <StyledLabel>Role</StyledLabel>
          <StyledSelect
            name="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="user" disabled>
              User
            </option>
            <option value="VIP">Editor</option>
            <option value="admin">Admin</option>
          </StyledSelect>
          {errors.role && <ErrorMessage>{errors.role}</ErrorMessage>}
          <StyledLabel>Password</StyledLabel>
          <Input
            type="password"
            name="password"
            onChange={(e) => setPassword(e.target.value.trim())}
          />
          {errors.password && <ErrorMessage>{errors.password}</ErrorMessage>}
        </FormGroup>
        <EgoButton type="submit">Create user</EgoButton>
        {message && <ErrorMessage>{message}</ErrorMessage>}
      </form>
    </FormContainer>
  );
};
