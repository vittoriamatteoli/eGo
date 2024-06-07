import { useState } from "react";
import styled from 'styled-components';
import { EgoButton } from '../../reusables/Button';


const FormContainer = styled.div`
background: var(--ego-gradient-trans);
border-radius: 25px;
padding: 20px;
box-shadow: 0px 0px 3px 0px var(--ego-green);
  width: 100%;
  max-width: 80vw;
  margin: 0 auto;
  h2 {
    text-align: center;
  }
  @media (min-width: 768px) {
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
  box-shadow: inset 2px 3px 5px -5px var(--ego-green);
  padding: 10px 10px 10px 24px;
  color: var(--ego-dark);
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
  margin-bottom: 15px;
  padding: 10px;
  color: var(--ego-error);
  border-radius: 7px;
  border: 3px solid var(--ego-error);
`;


const StyledLabel = styled.label`
 display: block;
  color: var(--ego-dark);
  font-size: 1em;
  margin: 0.5em;
`;
const StyledH1 = styled.h1`
 display: block;
  color: var(--ego-dark);
  font-size: 1em;
  margin: 0.5em;
  font-weight: bold;
`;


export const DeleteUser = ({ getUsers }) => {
  const apiKey = import.meta.env.VITE_API_KEY;
  const API = apiKey + "/admin";
  const token = sessionStorage.getItem('accessToken');
  const [message, setMessage] = useState(""); // Move this line inside the DeleteUser component

  const Delete = async (e) => {
    e.preventDefault();
    const id = e.target.id.value;
    try {
      await fetch(`${API}/users/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      });

      setMessage('User deleted successfully');
      getUsers();
    }
    catch (error) {
      console.error(error);
      setMessage('An unexpected error occurred.');
    }
  }
  return (
    <FormContainer>
      <FormGroup>
    <form onSubmit={Delete}>
      <StyledH1>Delete user</StyledH1>
      <StyledLabel>ID</StyledLabel>
      <Input type="text" name="id" />
      <EgoButton type="submit">Delete user</EgoButton>
      {message && <ErrorMessage>{message}</ErrorMessage>}
    </form>
    </FormGroup>
      </FormContainer>
  );
};
