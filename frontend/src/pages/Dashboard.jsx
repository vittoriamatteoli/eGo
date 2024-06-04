import { Sidebar } from "../components/Sidebar"
import { PointsCard } from "../components/PointsCard"
import { ActivityGraph } from "../components/ActivityGraph"
import { DistanceCard } from "../components/DistanceCard"
import { EnergyCard } from "../components/EnergyCard"

export const Dashboard = ({ id }) => {
  return (
    <>
      <Sidebar userId={id} />
      <PointsCard />
      <ActivityGraph />
      <DistanceCard />
      <EnergyCard />
    </>
  )
}
