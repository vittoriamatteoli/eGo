import { BatterySlider } from "./BatterySlider";

export const EnergyCard = ({id}) => {
  return (
    <div>
      EnergyCard
      <BatterySlider userId={id} />
    </div>
  )
}