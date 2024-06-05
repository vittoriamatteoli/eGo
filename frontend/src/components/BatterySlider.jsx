import styled from "styled-components"
import { useParams } from "react-router"
import { useEffect, useState } from "react"
import { EgoButton } from "../reusables/Button"
import { BatterySVG } from "../components/BatterySVG";
const apikey = import.meta.env.VITE_API_KEY

const BatterySliderWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 30px;
  align-items: center;
  justify-content: center;
`

export const BatterySlider = () => {

  //first we get the energy level from the backend
  const [fillPercentage, setFillPercentage] = useState(0)
  const { id } = useParams();

  useEffect(() => {
    const token = sessionStorage.getItem("accessToken")
    fetch(`${apikey}/user/${id}`, {
      method: "GET",
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
        setFillPercentage(data.energyLevel)
      })
      .catch((error) => {
        console.error('There was a problem with the fetch operation: ', error);
      });
  }, [id])


  const handleDrag = (percentage) => {
    if (percentage >= 0 && percentage <= 100) {
      setFillPercentage(percentage)
    }
  }
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
    <>

      <BatterySliderWrapper id={id}>
        <BatterySVG fillPercentage={fillPercentage} onDrag={handleDrag} />

        <input
          type="range"
          min="0"
          max="100"
          value={fillPercentage}
          onChange={(e) => updateEnergyLevel(e.target.value)}
        />
        <div>Current energy level: {fillPercentage}%</div>
      </BatterySliderWrapper>
      <EgoButton onClick={() => updateEnergyLevel(e.target.value)}>Charge</EgoButton>
    </>
  );
}