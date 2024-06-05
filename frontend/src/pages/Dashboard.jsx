import { Sidebar } from "../components/Sidebar";
import { PointsCard } from "../components/PointsCard";
import { ActivityGraph } from "../components/ActivityGraph";
import { DistanceCard } from "../components/DistanceCard";
import { EnergyCard } from "../components/EnergyCard";
import { useParams } from "react-router-dom";


export const Dashboard = () => {
  const { id } = useParams();
  return (
    <>
      <Sidebar id={id} />

      <PointsCard />
      <ActivityGraph />
      <DistanceCard />
      <EnergyCard />
    </>
  );
};
