import styled from "styled-components"
import { useParams } from "react-router"
import { BatterySVG } from "../reusables/BatterySVG"
import { useEffect, useState } from "react"
import { Button } from "@mui/material"
const apikey = import.meta.env.VITE_API_KEY

const BatterySliderWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 30px;
  align-items: center;
  justify-content: center;
`
const StyledButton = styled(Button)`
  border-radius: 24px;
  border: 1px solid #687943;
  background: #687943;
  width: 106.213px;
  height: 35.172px;
  flex-shrink: 0;
  color: white;
  color: #fff;
  font-family: "Open Sans Hebrew";
  font-size: 12px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  text-transform: capitalize;
`
export const BatterySlider = () => {
  const [fillPercentage, setFillPercentage] = useState(0) //set initial state from the EnergyLevel in the DB
  const { id } = useParams()
  const API = `${apikey}/user/${id}`
  const token = sessionStorage.getItem("accessToken")

  useEffect(() => {
    const fetchEnergyData = async () => {
      try {
        const res = await fetch(API)
        if (!res.ok) {
          throw new Error("Failed to fetch data")
        }
        const data = await res.json()
        if (data.energyLevel !== undefined && data.energyLevel !== null) {
          setFillPercentage(data.energyLevel)
        }
      } catch (error) {
        console.error("Error fetching energy data:", error)
      }
    }

    fetchEnergyData()
  }, [id])

  const handleDrag = (percentage) => {
    if (percentage >= 0 && percentage <= 100) {
      setFillPercentage(percentage)
    }
  }

  const handleNewEnergy = async () => {
    try {
      const response = await fetch(API, {
        method: "PATCH",
        body: JSON.stringify({ energyLevel: fillPercentage }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      if (!response.ok) {
        throw new Error("Failed to update data")
      }
      const updatedData = await response.json()
      if (
        updatedData.energyLevel !== undefined &&
        updatedData.energyLevel !== null
      ) {
        setFillPercentage(updatedData.energyLevel)
        console.log(updatedData)
      }
    } catch (error) {
      console.error("Error updating energy data:", error)
    }
  }

  return (
    <BatterySliderWrapper>
      <BatterySVG fillPercentage={fillPercentage} onDrag={handleDrag} />
      <StyledButton onClick={handleNewEnergy}>Confirm</StyledButton>
    </BatterySliderWrapper>
  )
}
