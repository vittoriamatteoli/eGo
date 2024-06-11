import { useState, useEffect, useCallback } from "react";
import { Logout } from "./Logout";
import { UpdateUser } from "../components/forms/UpdateUser";
import { DeleteUser } from "../components/forms/DeleteUser";
import { CreateUser } from "../components/forms/CreateUser";
import { UpdateUserRole } from "../components/forms/UpdateUserRole";
import { BackArrowWithHistory } from "../reusables/BackArrowWithHistory";
import styled from "styled-components";

const StyledDiv = styled.div`
  background: var(--ego-light);
  border-radius: 25px;
  padding: 20px;
  margin-top: 20px;
  box-shadow: 0px 1px 5px 0px var(--ego-green);
  width: 100%;
  max-width: 80vw;

  h2 {
    text-align: center;
  }
  @media (min-width: 768px) {
    width: 100%;
  }
`;

const AdminContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;

  h2 {
    text-align: center;
  }

  @media (min-width: 768px) {
    width: 100%;
  }
`;

const Message = styled.div`
  margin-bottom: 15px;
  padding: 10px;
  color: var(--ego-error);
  border-radius: 7px;
  border: 3px solid var(--ego-error);
`;

const StyledH1 = styled.h1`
  display: block;
  color: var(--ego-dark);
  font-size: 1em;
  margin: 0.5em;
  font-weight: bold;
`;

export const Admin = () => {
  const apiKey = import.meta.env.VITE_API_KEY;
  const API = apiKey + "/admin";
  const [users, setUsers] = useState([]);
  const token = sessionStorage.getItem("accessToken");
  const [message, setMessage] = useState("");

  const getUsers = useCallback(async () => {
    try {
      const response = await fetch(`${API}/users`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setUsers(data);
      setMessage("User fetched successfully");
    } catch (error) {
      setMessage("An unexpected error occurred.");
    }
  }, [API, token, setUsers]);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  return (
    <div>
      <StyledH1>Admin page</StyledH1>

      <BackArrowWithHistory />
      <UpdateUser getUsers={getUsers} />
      <UpdateUserRole getUsers={getUsers} />
      <DeleteUser getUsers={getUsers} />
      <CreateUser getUsers={getUsers} />
      <Logout />

      {users.map(
        ({ _id, name, email, role, points, energyLevel, avatarUrl }) => (
          <StyledDiv key={_id}>
            <ul>
              <li>ID: {_id}</li>
              <li>NAME: {name}</li>
              <li>EMAIL:{email}</li>
              <li>ROLE: {role}</li>
              <li>POINTS: {points}</li>
              <li>ENERGYLEVEL: {energyLevel}</li>
              <li>AVATARURL:{avatarUrl}</li>
            </ul>
          </StyledDiv>
        )
      )}
      {message && <Message>{message}</Message>}
    </div>
  );
};
