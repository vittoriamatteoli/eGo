import { createContext, useState } from "react";

export const DashboardContext = createContext();
export const DashboardProvider = ({ children }) => {
  const [fillPercentage, setFillPercentage] = useState(0);
  const [travelMode, setTravelMode] = useState([]);
  const [username, setUsername] = useState("");
  const [points, setPoints] = useState(0);
  const [distance, setDistance] = useState(0);
  const [travelPoints, setTravelPoints] = useState(0);
  const [user, setUser] = useState({});
  const [travelDistance, setTravelDistance] = useState(0);

  return (
    <DashboardContext.Provider
      value={{
        fillPercentage,
        setFillPercentage,
        travelMode,
        setTravelMode,
        distance,
        setDistance,
        travelDistance,
        setTravelDistance,
        travelPoints,
        setTravelPoints,
        points,
        setPoints,
        username,
        setUsername,
        user,
        setUser,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};
