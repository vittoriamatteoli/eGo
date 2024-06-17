import { useState, useEffect, useCallback } from 'react';
import { UpdateUser } from '../components/forms/UpdateUser';
import { DeleteUser } from '../components/forms/DeleteUser';
import { CreateUser } from '../components/forms/CreateUser';
import { UpdateUserRole } from '../components/forms/UpdateUserRole';
import styled from 'styled-components';
import { BackArrowWithHistory } from '../reusables/BackArrowWithHistory';
import AdminStyle from "../AdminStyles";
import { LeafOut } from '../reusables/LeafOutBtn';
import { LeafBackButton } from '../reusables/LeafBackBtn';


const AdminWrap = styled.div`
  display: flex;
  flex-direction: column;
 background: var(--ego-gradient-trans);
`;

const StyledDiv = styled.div`
background: var(--ego-light-tint);
border-radius: 25px;
padding: 20px;
margin: 10px 20px;
  width: fit-content;
  max-width: 80vw;

  h3 {
    text-align: left;
    margin-bottom: 0px;
    color: var(--ego-green);
    font-size: 1.1em;
  }
  p {
  margin-bottom:5px;
  color:var(--ego-brown)}

  span{
  display: flex;
  alignItems: center;
  justify-content: space-between;
  border-bottom: 1px dotted var(--ego-brown);
  }
  }
  @media (min-width: 768px) {
    width: 100%;
  }
`;

const AdminContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;



  h2 {
    text-align: center;
  }

  @media (min-width: 768px) {
    width: 100%;
  }
`;

const Message = styled.div`
  padding: 15px;
  background: var(--ego-lgt-green);
  color: var(--ego-green);
  border-radius: 24px 0px 24px 0px;
  border-left: 2px solid var(--ego-green);
  border-right: 2px solid var(--ego-green);
  margin:0 20px 10px 20px;
`;

const StyledH1 = styled.h1`
 display: block;
   color:var(--ego-brown);
  font-size: 1.5em;
  margin: 0.5em;
  font-weight: bold;
  text-transform: uppercase;
  @media (min-width: 768px) {
    font-size: 2.5em;
}
`;

const StyledH2 = styled.h2`
  display: block;
  color: var(--ego-green);
  font-size: 1.5em;
  margin: 0.5em;
  font-weight: bold;
  text-align: center;
  text-transform: uppercase;
  background: var(--ego-lgt-green);
  Width:100wv;
  padding:30px;
  margin: 20px;
  border-radius:  0 25px 0 25px;
`;


const Header = styled.header`
  display: flex;
  justify-content: space-between;
    align-items: center;
  padding: 0 20px;
  padding: 10px 15px;
  background: var(--ego-lgt-green);
  border-radius: 0 0 25px 25px;
  margin-bottom: 20px;
  text-align: center;

`;

const MiniContainer = styled.div`
   margin: 20px 15px;
  display: flex;
  flex-direction: column;
  @media (min-width: 768px) {
  margin-top: 0px;
}
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
      setMessage('All users fetched successfully');
    } catch (error) {
      setMessage("An unexpected error occurred.");
    }
  }, [API, token, setUsers]);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  return (
    <AdminWrap>
      <AdminStyle />
      <Header>
        <LeafBackButton />
        <StyledH1>Admin page</StyledH1>
        <LeafOut />
      </Header>

      <AdminContainer>
        <UpdateUser getUsers={getUsers} />
        <MiniContainer>
          <UpdateUserRole getUsers={getUsers} />
          <DeleteUser getUsers={getUsers} />
        </MiniContainer>

        <CreateUser getUsers={getUsers} />
      </AdminContainer>

      <StyledH2>Current users </StyledH2>
      <div> {message && <Message>{message}</Message>}</div>
      <AdminContainer>
        {users.map(({ _id, username, email, role, points, energyLevel, avatarUrl }) => (
          <StyledDiv key={_id}>

            <span><h3>ID</h3> <p>{_id}</p></span>
            <span><h3>Name </h3> <p>{username}</p></span>
            <span><h3>Email</h3> <p>{email}</p></span>
            <span><h3>Role </h3> <p>{role}</p></span>
            <span><h3>Points </h3> <p>{points}</p></span>
            <span><h3>Energylevel</h3> <p> {energyLevel}</p></span>
            <h3>Avatar URL</h3> <p style={{ wordWrap: 'break-word', whiteSpace: 'normal', maxWidth: '280px' }}>{avatarUrl}</p>

          </StyledDiv>

        ))}
      </AdminContainer>
      {message && <Message>{message}</Message>}

    </AdminWrap>

  );
};
