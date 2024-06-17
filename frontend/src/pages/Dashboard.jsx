import { Sidebar } from "../components/Sidebar";
import { PointsCard } from "../components/PointsCard";
import { ActivityGraph } from "../components/ActivityGraph";
import { EnergyCard } from "../components/EnergyCard";
import { TravelCard } from "../components/TravelCard";
import { useParams } from "react-router-dom";
//import { TravelForm } from "../components/TravelForm"
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AdminButton } from "../reusables/AdminButton";
import styled from "styled-components";
import jwtDecode from "jwt-decode";
import { MobileHeader } from "../components/MobileHeader";
import { useMediaQuery } from "react-responsive";
import { DashboardProvider } from "../components/DashboardContext";
import { UserFlowArrow } from "../reusables/UserFlowArrow";

const DashboardLayout = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: auto;
  width: 100vw;
  box-sizing: border-box;
  padding: 0;
  margin: 0;
  justify-items: center;
  margin-bottom: 100px;

  .dashboardContainer {
    position: relative;
    width: 90%;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    gap: 35px;
  }

  @media (min-width: 769px) {
    grid-template-columns: 1fr 5fr; /* Sidebar and main content */
    margin-bottom: 0;
    .cardContainer {
      display: flex;
      gap: 5px;
      /* align-items: center; */
    }
    .cardContainerDash {
      display: grid;
      grid-template-columns: 1fr 1fr;
      align-items: center;
      gap: 86px;
    }
  }
  @media (min-width: 1024px) {
    margin-bottom: 20px;
    grid-template-columns: 1fr 4fr; /* Sidebar and main content */
    .cardContainer {
      display: flex;
      gap: 15px;
    }
    .cardContainerDash {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 100px;
    }
  }
`;

export const Dashboard = () => {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const token = sessionStorage.getItem("accessToken");
    
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        
        
        setIsAdmin(decodedToken.role === "admin");
      } catch (e) {
        console.error("Invalid token", e);
      }
    }
  }, []);
  // Media query for mobile devices
  const isMobile = useMediaQuery({ maxWidth: 767 });

  const { id } = useParams();
  return (
    <DashboardLayout>
       <DashboardProvider value={id}>
        <Sidebar id={id} />
        <div className="dashboardContainer">
          {isMobile && <MobileHeader id={id} />}
          <div className="cardContainerDash">
            <PointsCard id={id} />
            <ActivityGraph id={id} />
          </div>
          <div className="cardContainer">
            <EnergyCard id={id} />
            {!isMobile && <UserFlowArrow />}
            <TravelCard id={id} />
          </div>
          <AdminButton isAdmin={isAdmin} />
        </div>
     </DashboardProvider>
    </DashboardLayout >
  );
};
