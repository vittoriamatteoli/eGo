import styled from "styled-components"
import { useParams } from "react-router"
import { BatterySVG } from "../reusables/BatterySVG"
import { useEffect, useState } from "react"
import { Button } from "@mui/material"
const apikey = import.meta.env.VITE_API_KEY

const BatterySliderWrapper = styled.div`
  width: 195px;
`

export const BatterySlider = () => {
  const [fillPercentage, setFillPercentage] = useState(0) //set initial state from the EnergyLevel in the DB
  const { id } = useParams()
  const API = `${apikey}/user/${id}`
  const API_ENERGY = `${apikey}/energy`
  const token = sessionStorage.getItem("accessToken")

  useEffect(() => {
    const fetchEnergyData = async () => {
      try {
        const res = await fetch(API)
        if (!res.ok) {
          throw new Error("Failed to fetch data")
        }
        const data = await res.json()
        setFillPercentage(data.energyLevel)
      } catch (error) {
        console.error("Error fetching energy data:", error)
      }
    }
    fetchEnergyData()// this work fine 
  }, [API, id])

  const handleDrag = (percentage) => {
    setFillPercentage(percentage)
  }

  const handleNewEnergy = async () => {
    try {
      console.log(token)
      const response = await fetch(API_ENERGY, {
        method: "PATCH",
        body: JSON.stringify({ energyLevel: fillPercentage }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,// this doesn't
        },
      })
      if (!response.ok) {
        throw new Error("Failed to update data")
      }
      const updatedData = await response.json()
      setFillPercentage(updatedData.energyLevel)
    } catch (error) {
      console.error("Error updating energy data:", error)
    }
  }

  return (
    <BatterySliderWrapper>
      <BatterySVG fillPercentage={fillPercentage} onDrag={handleDrag} />
      <Button onClick={handleNewEnergy}>Confirm</Button>
    </BatterySliderWrapper>
  )
}
