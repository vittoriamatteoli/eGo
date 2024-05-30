import {useNavigate} from "react-router-dom";
import {useState} from "react";

export const Logout = () => {
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const apikey = import.meta.env.VITE_API_KEY;
  const API = `${apikey}/signout`;

  const handleLogout = async () => {
    try{
      const token = sessionStorage.getItem("accessToken");
      await fetch(API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
    sessionStorage.removeItem("accessToken");
    setMessage("Logout successful");
    navigate("/");
    }catch(error){
      console.error(error);
      setMessage("Failed to logout");
    }
  };
  return (
    <div>
      <button onClick={handleLogout}>Logout</button>
      <p>{message}</p>
    </div>
  );
}