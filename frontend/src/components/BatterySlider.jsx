import styled from "styled-components"
import { useParams } from "react-router"
import { useEffect, useState } from "react"
const apikey = import.meta.env.VITE_API_KEY

const BatterySliderWrapper = styled.div`
  width: 195px;
`

export const BatterySlider = () => {

  //first we get the energy level from the backend
  const [fillPercentage, setFillPercentage] = useState(0)
  const { id } = useParams()

  useEffect(() => {
    const token = sessionStorage.getItem("accessToken")
    fetch(`${apikey}/users/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        return res.json();
      })
      .then((data) => {
        console.log(data)
        setFillPercentage(data.energyLevel)
      })
  }, [id])

  // then we update energy level with a patch request
  const updateEnergyLevel = (value) => {
    const token = sessionStorage.getItem("accessToken")
    fetch(`${apikey}/user/${id}`, {
      method: "PATCH",
      body: JSON.stringify({ energyLevel: value }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        return res.json();
      })
      .then((data) => {
        //checking what we get back from the backend
        console.log(data)
        // updating the state with the new value
        if (data.success) {
          setFillPercentage(value)
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  return (
    <BatterySliderWrapper>
      <input
        type="range"
        min="0"
        max="100"
        value={fillPercentage}
        onChange={(e) => updateEnergyLevel(e.target.value)}
      />
      <div>Current energy level: {fillPercentage}%</div>
    </BatterySliderWrapper>
  );
}