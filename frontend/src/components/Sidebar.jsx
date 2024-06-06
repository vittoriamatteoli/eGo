import { useEffect, useState } from "react";
import styled from "styled-components";
import { Drawer, List, ListItem, Typography } from "@mui/material";
import { Logo } from "../reusables/Logo";
import { Avatar } from "../reusables/Avatar";
import { Logout } from "../pages/Logout";
const apikey = import.meta.env.VITE_API_KEY;

const StyledDrawer = styled(Drawer)`
  width: 260px;
  flex-shrink: 0;
`;

const SidebarContent = styled.div`
  width: 300px;
  padding: 20px;
  background: linear-gradient(180deg, #dcded0 71.72%, #cce0a1 100%);
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;

  Button {
    position: absolute;
    bottom: 0;
  }
`;
const StyledList = styled(List)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
  justify-content: center;
  position: relative;
`;

export const Sidebar = ({ id }) => {
  const [username, setUsername] = useState("");

  const API = `${apikey}/user/${id}`;

  //fetch username
  useEffect(() => {
    const handleUsername = async () => {
      try {
        const res = await fetch(API);
        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await res.json();
        if (data.username !== undefined && data.username !== null) {
          setUsername(data.username);
        }
      } catch (error) {
        console.error("Error fetching energy data:", error);
      }
    };

    handleUsername();
  }, [id]);

  return (
    <>
      <StyledDrawer variant="persistent" anchor="left" open={open}>
        <SidebarContent>
          <StyledList>
            <ListItem>
              <Logo />
            </ListItem>
            <ListItem>
              <Avatar id={id} />
            </ListItem>
            <ListItem>
              <Typography variant="body1">{username}</Typography>
            </ListItem>
          </StyledList>
          <Logout className="logout" />
        </SidebarContent>
      </StyledDrawer>
    </>
  );
};
