import styled from "styled-components"
import { useParams } from "react-router"
import { useEffect, useState } from "react"
import { BatterySVG } from "../components/BatterySVG";
import { EgoButton } from "../reusables/Button";
const apikey = import.meta.env.VITE_API_KEY;

const UpdateBtn = styled(EgoButton)`
width:300px;
margin: 0 auto;
`

const BatterySliderWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 30px;
  align-items: center;
  justify-content: center;
`

export const BatterySlider = () => {
  const { id } = useParams();
  const API = `${apikey}/user/${id}`;
  //first we get the energy level from the backend
  const [fillPercentage, setFillPercentage] = useState(0)
  const [message, setMessage] = useState("")
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = sessionStorage.getItem("accessToken")
    fetch(API, {
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
        setError('There was a problem with the fetch operation: ' + error.message);
      });
  }, [id])

  const handleDrag = (percentage) => {
    const parsedPercent = parseInt(percentage, 10);
    if (parsedPercent >= 0 && parsedPercent <= 100) {
      setFillPercentage(parsedPercent)
    }
  }

  const handleNewEnergy = async () => {
    const token = sessionStorage.getItem("accessToken")
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


  // then we update energy level with a patch request
  const updateEnergyLevel = (value) => {
    //convert the input value string to number
    const parsedValue = parseInt(value, 10);
    const token = sessionStorage.getItem("accessToken")
    fetch(API, {
      method: "PATCH",
      body: JSON.stringify({ energyLevel: parsedValue }),
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
          setMessage(`Energy level updated with ${value}%`)
        }
      })
      .catch((error) => {
        setError('Error: ' + error.message);
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
        {message && <div>{message}</div>}
        {error && <div>Error: {error}</div>}
        <UpdateBtn onClick={handleNewEnergy}>Update Energylevel</UpdateBtn>
      </BatterySliderWrapper>

    </>
  );
}