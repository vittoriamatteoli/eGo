import { useNavigate } from "react-router-dom"
import { useState } from "react"
import { EgoButton } from "../components/Button"
import { Button } from "@mui/material"
import styled from "styled-components"


/*const StyledButton = styled(Button)`
  color: #687943;
  font-family: "Open Sans Hebrew";
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  letter-spacing: -0.16px;
  text-transform: capitalize;
  &:hover {
    background-color: none;
    outline: none;
    border-radius: 20px;
  }
`*/


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
      <EgoButton onClick={handleLogout}>Logout</EgoButton>

   /* <>
      <StyledButton onClick={handleLogout}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="19"
          height="19"
          viewBox="0 0 19 19"
          fill="none"
        >
          <path
            d="M0 9.5C0 4.25329 4.25329 0 9.5 0C14.7467 0 19 4.25329 19 9.5C19 14.7467 14.7467 19 9.5 19C4.25329 19 0 14.7467 0 9.5Z"
            fill="#687943"
          />
        </svg>
        Logout
      </StyledButton>
    */

      <p>{message}</p>
    </>
  )
}
