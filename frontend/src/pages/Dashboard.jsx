import { Sidebar } from "../components/Sidebar";
import { PointsCard } from "../components/PointsCard";
import { ActivityGraph } from "../components/ActivityGraph";
//import { DistanceCard } from "../components/DistanceCard";
import { EnergyCard } from "../components/EnergyCard";
import { TravelCard } from "../components/TravelCard";
import { useParams } from "react-router-dom";
//import { TravelForm } from "../components/TravelForm"
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AdminButton } from "../reusables/AdminButton";
import styled from "styled-components";
import { DashboardProvider } from '../components/DashboardContext';
import jwtDecode from "jwt-decode";
import { MobileHeader } from "../components/MobileHeader";
import { useMediaQuery } from "react-responsive";

const DashboardLayout = styled.div`
  box-sizing: border-box;
  padding: 20px 12px;
  display: grid;
  grid-template-columns: auto auto auto; /* Sidebar and main content */
  width: 100%;

  @media (max-width: 768px) {
    grid-template-columns: 1fr; /* Single column layout on mobile */
  }
`;

export const Dashboard = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

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
  }, []);
  // Media query for mobile devices
  const isMobile = useMediaQuery({ maxWidth: 767 });

  const { id } = useParams();
  return (
    <DashboardLayout>
       <DashboardProvider value={id}>
        <Sidebar id={id} />
        <div>
        {isMobile && <MobileHeader id={id} />}
        <PointsCard id={id} />
        <ActivityGraph id={id} />
        {/* <DistanceCard id={id} /> */}
        <EnergyCard id={id} />
        <TravelCard id={id} />
        <AdminButton isAdmin={isAdmin} />
        </div>
     </DashboardProvider>
    </DashboardLayout >
  );
};
