import { useEffect } from "react";
import styled from "styled-components";
import { Drawer, List, ListItem, Typography } from "@mui/material";
import { Logo } from "../reusables/Logo";
import { Avatar } from "../reusables/Avatar";
import { Logout } from "../pages/Logout";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { DashboardContext } from "./DashboardContext";
const apikey = import.meta.env.VITE_API_KEY;

const StyledDrawer = styled(Drawer)`
  width: 260px;
  flex-shrink: 0;

  @media (max-width: 768px) {
    display: none; // Hide on mobile devices
  }
  @media (min-width: 769px) and (max-width: 1024px) {
    width: 100px;
  }
  @media (min-width: 1024px) and (max-width: 1250px) {
    width: 200px;
  }
`;

const SidebarContent = styled.div`
  position: relative;
  width: 250px;
  padding: 20px;
  background: linear-gradient(180deg, #dcded0 71.72%, #cce0a1 100%);
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
  @media (max-width: 768px) {
    display: none; // Hide on mobile devices
  }
  @media (min-width: 769px) and (max-width: 1024px) {
    width: 100px;
  }
  @media (min-width: 1024px) and (max-width: 1250px) {
    width: 200px;
  }
`;

const StyledList = styled(List)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
  @media (min-width: 1024px) {
    gap: 50px;
  }
`;

const StyledListItem = styled(ListItem)`
  display: flex;
  flex-direction: column;
  gap: 3px;
  justify-content: center;
  .username {
    font-family: "Open Sans";
    font-size: 20px;
    font-weight: 700;

    @media (min-width: 1024px) {
      font-size: 24px;
    }
  }
`;

const CenteredLogoutButton = styled.div`
  position: absolute;
  bottom: 20px;
  display: flex;
  justify-content: center;
  width: 100%;
`;

export const Sidebar = ({ id }) => {
 const { username, setUsername} = useContext(DashboardContext);
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
    <StyledDrawer
      variant="persistent"
      anchor="left"
      open={true}
      role="navigation"
    >
      <SidebarContent>
        <StyledList>
          <Link to="/" aria-label="Home">
            <Logo />
          </Link>
          <StyledListItem>
            <Avatar id={id} />
            <Typography
              style={{ textTransform: "capitalize" }}
              className="username"
              variant="body1"
            >
              {username}
            </Typography>
          </StyledListItem>
        </StyledList>
        <CenteredLogoutButton>
          <Logout className="logout" />
        </CenteredLogoutButton>
      </SidebarContent>
    </StyledDrawer>
  );
};
