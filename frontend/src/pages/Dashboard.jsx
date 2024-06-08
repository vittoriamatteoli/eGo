import { Sidebar } from "../components/Sidebar";
import { PointsCard } from "../components/PointsCard";
import { ActivityGraph } from "../components/ActivityGraph";
import { EnergyCard } from "../components/EnergyCard";
import { TravelCard } from "../components/TravelCard";

import { useParams } from "react-router-dom";
import styled from "styled-components";

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
  const { id } = useParams();

  return (
    <DashboardLayout>
      <Sidebar id={id} />

      <div>
        <PointsCard id={id} />
        <ActivityGraph id={id} />
        <EnergyCard id={id} />
        <TravelCard id={id} />
      </div>
    </DashboardLayout>
  );
};
