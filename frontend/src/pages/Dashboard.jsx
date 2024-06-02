import { Sidebar } from "../components/Sidebar"
import { PointsCard } from "../components/PointsCard"
import { ActivityGraph } from "../components/ActivityGraph"
import { DistanceCard } from "../components/DistanceCard"
import { EnergyCard } from "../components/EnergyCard"

export const Dashboard = () => {
  return (
    <>
      <h2>DASHBOARD</h2>
      <Sidebar />
      <PointsCard />
      <ActivityGraph />
      <DistanceCard />
      <EnergyCard />
    </>
  )
}
