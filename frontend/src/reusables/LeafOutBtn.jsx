import { useNavigate } from "react-router-dom"
import { useState } from "react"
import { EgoButton } from "../reusables/Button"
import styled from "styled-components"

const LeafOutBtn = styled(EgoButton)`
 padding: 7px 15px;
 border-radius: 24px 0 20px 0;
  font-size: 0.8em;
`;


export const LeafOut = () => {
  const [message, setMessage] = useState("")
  const navigate = useNavigate()
  const apikey = import.meta.env.VITE_API_KEY
  const API = `${apikey}/signout`

  const handleLogout = async () => {
    try {
      const token = sessionStorage.getItem("accessToken")
      await fetch(API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      sessionStorage.removeItem("accessToken")
      setMessage("Logout successful")
      navigate("/")
    } catch (error) {
      console.error(error)
      setMessage("Failed to logout")
    }
  }
  return (
    <div>
      <LeafOutBtn onClick={handleLogout}>Logout</LeafOutBtn>
    </div>
  )
}
