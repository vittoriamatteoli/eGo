import { useState, useEffect } from "react";
import styled from "styled-components";
import { EgoButton } from "../../reusables/Button";

const apiKey = import.meta.env.VITE_API_KEY;
const API = apiKey + "/admin";

const FormContainer = styled.div`
background: var(--ego-lgt-green);
border-radius:  0px 25px;
padding: 20px;
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

  &:focus,
  &:active {
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
  background: var( --ego-gradient-reversed);
   box-shadow: 2px 3px 5px -5px var(--ego-green);
  color: var(--ego-brown);
  font-size: 1em;
  padding: 0.5em;
    border: 1px solid var(--ego-light-tint);
  border-radius: 25px;

  &:focus,
  &:active {
    background-color: var(--ego-light);
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
 display: block;
  text-transform: uppercase;
  color: var(--ego-wcag-drk-green);
  font-size: 1em;
  margin: 0.5em;
  font-weight: bold;
`;

export const UpdateUser = ({ getUsers }) => {
  const [id, setId] = useState("");
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("user");
  const [energyLevel, setEnergyLevel] = useState(0);
  const [points, setPoints] = useState(0);
  const [avatarUrl, setAvatarUrl] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");

  // Store the initial values
  const [initialUserName, setInitialUserName] = useState(name);
  const [initialEmail, setInitialEmail] = useState(email);
  const [initialRole, setInitialRole] = useState(role);
  const [initialPassword, setInitialPassword] = useState(password);
  const [initialEnergyLevel, setInitialEnergyLevel] = useState(0);
  const [initialPoints, setInitialPoints] = useState(0);
  const [initialAvatarUrl, setInitialAvatarUrl] = useState("");

  // Set the initial values when the component mounts
  useEffect(() => {
    setInitialUserName(username);
    setInitialEmail(email);
    setInitialRole(role);
    setInitialPassword(password);
    setInitialEnergyLevel(energyLevel);
    setInitialPoints(points);
    setInitialAvatarUrl(avatarUrl);
  }, []);

  const Update = async () => {
    const token = sessionStorage.getItem("accessToken");
    let userData = {};

    // Check if any field has changed
    if (
      username === initialUserName &&
      email === initialEmail &&
      role === initialRole &&
      password === initialPassword &&
      energyLevel === initialEnergyLevel &&
      points === initialPoints &&
      avatarUrl === initialAvatarUrl
    ) {
      setMessage("No changes made to the form, lets try again.😅");
      return; // Stop execution if no fields have changed
    }
    if (username) userData.name = username;
    if (email) userData.email = email;
    if (role) userData.role = role;
    if (password) userData.password = password;
    if (energyLevel) userData.energyLevel = energyLevel;
    if (points) userData.points = points;
    if (avatarUrl) userData.avatarUrl = avatarUrl;

    try {
      const response = await fetch(`${API}/users/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },

        body: JSON.stringify({ username, email, role, password, energyLevel, points, avatarUrl }),
        //body: JSON.stringify(userData),
      });
      if (response.ok) {
        setMessage("User updated successfully");
        getUsers();
      } else if (!response.ok) {
        setMessage(
          "An error occurred while updating the user." + response.statusText
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let errors = {};
    //check that at least one field in the form is filled in
    if (
      !username &&
      !email &&
      !password &&
      !role &&
      !energyLevel &&
      !points &&
      !avatarUrl
    ) {
      errors.general = "At least one field is required for update.";
      setErrors(errors);
      return;
    }
    if (Object.keys(errors).length === 0) {
      // If no errors, celebrate and send the data to the server
      Update();
    }
  };

  return (
    <FormContainer>
      <form onSubmit={handleSubmit}>
        <FormGroup>
          <StyledH1>Update userinfo</StyledH1>

          <StyledLabel>ID</StyledLabel>
          <Input
            type="text"
            name="id"
            value={id}
            onChange={(e) => setId(e.target.value.trim())}
          />
          <StyledLabel>Name</StyledLabel>
          <Input
            type="text"
            name="username"
            onChange={(e) => setUserName(e.target.value.trim())}
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
            <option value="VIP">VIP</option>
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
        <FormGroup>
          <StyledLabel>Energy Level</StyledLabel>
          <Input
            type="text"
            name="energyLevel"
            onChange={(e) => setEnergyLevel(e.target.value.trim())}
          />
          {errors.energyLevel && (
            <ErrorMessage>{errors.energyLevel}</ErrorMessage>
          )}
        </FormGroup>
        <FormGroup>
          <StyledLabel>Points</StyledLabel>
          <Input
            type="text"
            name="points"
            onChange={(e) => setPoints(e.target.value.trim())}
          />
          {errors.points && <ErrorMessage>{errors.points}</ErrorMessage>}
        </FormGroup>
        <FormGroup>
          <StyledLabel>Avatar Url</StyledLabel>
          <Input
            type="text"
            name="avatarUrl"
            onChange={(e) => setAvatarUrl(e.target.value.trim())}
          />
          {errors.avatarUrl && <ErrorMessage>{errors.avatarUrl}</ErrorMessage>}
        </FormGroup>
        <EgoButton type="submit">Update info</EgoButton>
        {message && <ErrorMessage>{message}</ErrorMessage>}
      </form>
    </FormContainer>
  );
};
