import { useState } from 'react';
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
const StyledSelect = styled.select`
 display: block;
  background: var(--ego-light-tint);
   box-shadow: 2px 3px 5px -5px var(--ego-green);
  color: var(--ego-dark);
  font-size: 1em;
  padding: 0.5em;
    border: 1px solid var(--ego-lgt-green);
  border-radius: 25px;

    &:focus, &:active {
    background-color: var(--ego-light);
    border: 1px solid var(--ego-light-tint);
  }
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



export const UpdateUserRole = ({ getUsers }) => {
  const [id, setId] = useState('');
  const [role, setRole] = useState('user');
  const [message, setMessage] = useState('');
  const apiKey = import.meta.env.VITE_API_KEY;
  const API = apiKey + "/admin";



  const updateRole = async (e) => {
    const token = sessionStorage.getItem('accessToken');
    e.preventDefault();
    const id = e.target.id.value;
    const role = e.target.role.value;

    if (!id || !role) {
      setMessage('Please fill in all fields');
      return;
    }

    try {
      const response = await fetch(`${API}/users/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ role }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      setMessage('User role updated successfully');
      getUsers();

    } catch (error) {
      setMessage('An error occurred while updating the user role');
    }
  };
  return (
     <FormContainer>
      <form onSubmit={updateRole}>
        <StyledH1>Update user role</StyledH1>
        <FormGroup>
        <StyledLabel>ID</StyledLabel>
        <Input type="text" name="id" value={id} onChange={(e) => setId(e.target.value.trim())} />
        </FormGroup>
        <FormGroup>
        <StyledLabel>Role</StyledLabel>
        <StyledSelect name="role" value={role} onChange={e => setRole(e.target.value)}>
          <option value="user" disabled>User</option>
          <option value="user">User</option>
          <option value="writer">VIP</option>
          <option value="admin">Admin</option>
        </StyledSelect>
        </FormGroup>
        <FormGroup>
        <EgoButton type="submit">Update role</EgoButton>
        {message && <ErrorMessage>{message}</ErrorMessage>}
        </FormGroup>
      </form>
      </FormContainer>
    );
  };