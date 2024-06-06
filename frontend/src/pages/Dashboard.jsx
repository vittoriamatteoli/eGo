import { Sidebar } from "../components/Sidebar"
import { PointsCard } from "../components/PointsCard"
import { ActivityGraph } from "../components/ActivityGraph"
import { DistanceCard } from "../components/DistanceCard"
import { EnergyCard } from "../components/EnergyCard"
import { useParams } from "react-router"

export const Dashboard = () => {
  const { id } = useParams();
  return (
    <>
    <h2>DASHBOARD</h2>
      <Sidebar id={id} />
      <PointsCard id={id} />
      <ActivityGraph id={id} />
      <DistanceCard id={id} />
      <EnergyCard id={id} />

    </>
  )
}
