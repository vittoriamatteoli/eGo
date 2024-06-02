import styled from "styled-components"
import { BatterySVG } from "../reusables/BatterySVG"
import { useState } from "react"

const BatterySliderWrapper = styled.div`
  width: 195px;
`

export const BatterySlider = () => {
  const [fillPercentage, setFillPercentage] = useState(10) //set initial state from the EnergyLevel in the DB

  const handleDrag = (percentage) => {
    setFillPercentage(percentage)
  }

  return (
    <BatterySliderWrapper>
      <BatterySVG fillPercentage={fillPercentage} onDrag={handleDrag} />
    </BatterySliderWrapper>
  )
}
