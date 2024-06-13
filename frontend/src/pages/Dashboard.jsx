import { Sidebar } from "../components/Sidebar";
import { PointsCard } from "../components/PointsCard";
import { ActivityGraph } from "../components/ActivityGraph";
import { EnergyCard } from "../components/EnergyCard";
import { TravelCard } from "../components/TravelCard";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AdminButton } from "../reusables/AdminButton";
import { Walkthrough } from "../reusables/Walkthrough";
import styled from "styled-components";
import jwtDecode from "jwt-decode";
import { MobileHeader } from "../components/MobileHeader";
import { useMediaQuery } from "react-responsive";
import { DashboardProvider } from "../components/DashboardContext";

const DashboardLayout = styled.div`
  display: grid;
  grid-template-columns: auto;
  width: 100vw;
  box-sizing: border-box;
  padding: 0;
  margin: 0;

  justify-items: center;
  .dashboardContainer {
    width: 80%;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    gap: 35px;
  }

  @media (min-width: 769px) and (max-width: 1024px) {
    grid-template-columns: 1fr 5fr; /* Sidebar and main content */
    .cardContainer {
      display: flex;
      gap: 20px;
    }
    .cardContainerDash {
      display: grid;
      grid-template-columns: 1fr 1fr;
    }
  }
  @media (min-width: 1024px) {
    grid-template-columns: 1fr 4fr; /* Sidebar and main content */
    .cardContainer {
      display: flex;
      gap: 30px;
    }
    .cardContainerDash {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 20px;
    }
  }
`;

export const Dashboard = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [runWalkthrough, setRunWalkthrough] = useState(true);

  useEffect(() => {
    const token = sessionStorage.getItem("accessToken");
    console.log("Stored token:", token);
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        console.log("Decoded token:", decodedToken);
        console.log("Role:", decodedToken.role);
        setIsAdmin(decodedToken.role === "admin");
      } catch (e) {
        console.error("Invalid token", e);
      }
    }

    // const isFirstVisit = localStorage.getItem("firstVisit") !== "false";
    // if (isFirstVisit) {
    //   setRunWalkthrough(true);
    //   localStorage.setItem("firstVisit", "false");
    // } else {
    //   setRunWalkthrough(false);
    // }
  }, []);
  // Media query for mobile devices
  const isMobile = useMediaQuery({ maxWidth: 767 });

  const { id } = useParams();
  return (
    <DashboardLayout>
      <DashboardProvider value={id}>
        <Sidebar id={id} />

        <div
          className="dashboardContainer step1"
          style={{
            position: "relative",
          }}
        >
          {/* {runWalkthrough && <Walkthrough />} */}
          <Walkthrough runWalkthrough={runWalkthrough} />
          {isMobile && <MobileHeader id={id} />}
          <div className="cardContainerDash">
            <PointsCard id={id} />
            <ActivityGraph id={id} />
          </div>
          <div className="cardContainer">
            <EnergyCard id={id} />
            <TravelCard id={id} />
          </div>
          <AdminButton isAdmin={isAdmin} />
        </div>
      </DashboardProvider>
    </DashboardLayout>
  );
};
