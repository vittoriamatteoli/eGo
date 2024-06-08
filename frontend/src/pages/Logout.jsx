import { useNavigate } from "react-router-dom"
import { useState } from "react"
import { EgoButton } from "../reusables/Button"
import styled from "styled-components"

const LogoutBtn = styled(EgoButton)`
width:100px;
margin: 0 auto;
`;

export const Logout = () => {
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
      <LogoutBtn onClick={handleLogout}>Logout</LogoutBtn>
      <p>{message}</p>
    </div>
  )
}
