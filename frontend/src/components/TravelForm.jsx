import styled from "styled-components";
import { Button, IconButton } from "@mui/material";
import DriveEtaIcon from "@mui/icons-material/DriveEta";
import DirectionsBikeIcon from "@mui/icons-material/DirectionsBike";
import DirectionsWalkIcon from "@mui/icons-material/DirectionsWalk";
import TwoWheelerIcon from "@mui/icons-material/TwoWheeler";
import DirectionsTransitIcon from "@mui/icons-material/DirectionsTransit";
import Autocomplete from "react-google-autocomplete";
import { useState, useEffect } from "react";

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
`;

const TravelModesContainer = styled.div`
  display: flex;
  justify-content: space-around;
  margin-bottom: 10px;
`;

const TravelModeButton = styled(IconButton)`
  color: #000;
  background-color: ${({ selected }) => (selected ? "#39AA44" : "transparent")};
  &:hover {
    background-color: var(--ego-lgt-green);
  }
`;

export const TravelForm = ({ id }) => {
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [travelMode, setTravelMode] = useState("WALK");
  const [distance, setDistance] = useState("");

  useEffect(() => {
    if (origin && destination) {
      getRouteDetails();
    }
  }, [origin, destination]);

  const googleTravelModes = [
    { mode: "DRIVE", icon: <DriveEtaIcon /> },
    { mode: "BICYCLE", icon: <DirectionsBikeIcon /> },
    { mode: "WALK", icon: <DirectionsWalkIcon /> },
    { mode: "TRANSIT", icon: <DirectionsTransitIcon /> },
    { mode: "TWO_WHEELER", icon: <TwoWheelerIcon /> },
  ];
  console.log(origin);
  console.log(destination);
  console.log(distance);
  console.log(travelMode);

  const getRouteDetails = async () => {
    const url = "https://routes.googleapis.com/directions/v2:computeRoutes";

    const bodyData = {
      origin: {
        address: origin,
      },
      destination: {
        address: destination,
      },
      travelMode: travelMode,
    };

    const headers = {
      "Content-Type": "application/json",
      "X-Goog-Api-Key": import.meta.env.VITE_GOOGLE_API_KEY,
      "X-Goog-FieldMask": "routes.duration,routes.distanceMeters",
    };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(bodyData),
      });

      //add more specific error status later
      if (!response) {
        if (response.status === 404) {
          throw new Error("Failed at getting the route!");
        } else {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
      }

      const data = await response.json();
      const travelDistance = data.routes[0].distanceMeters;

      setDistance(travelDistance);
    } catch (error) {
      console.error("Error fetching route details:", error.message);
    }
  };

  return (
    <>
      <TravelModesContainer>
        {googleTravelModes.map((mode) => (
          <TravelModeButton
            key={mode.mode}
            selected={travelMode === mode.mode}
            onClick={() => setTravelMode(mode.mode)}
          >
            {mode.icon}
          </TravelModeButton>
        ))}
      </TravelModesContainer>

      <Autocomplete
        className="start-google-search-box"
        placeholder="Start"
        apiKey={import.meta.env.VITE_GOOGLE_API_KEY}
        style={{
          width: "50%",
          padding: "10px",
          border: "2px solid #ccc",
          borderRadius: "4px",
          marginBottom: "10px",
        }}
        onPlaceSelected={(place) => {
          setOrigin(place.formatted_address);
          console.log(origin);
        }}
        options={{
          types: ["geocode", "establishment"],
        }}
      />

      <Autocomplete
        className="destination-google-search-box"
        placeholder="Destination"
        apiKey={import.meta.env.VITE_GOOGLE_API_KEY}
        style={{
          width: "50%",
          padding: "10px",
          border: "2px solid #ccc",
          borderRadius: "4px",
          marginBottom: "10px",
        }}
        onPlaceSelected={(place) => {
          setDestination(place.formatted_address);
          console.log(destination);
        }}
        options={{
          types: ["geocode", "establishment"],
        }}
      />

      <p>You will get 0 points for this trip</p>
      <StyledButton>Confirm</StyledButton>
    </>
  );
};
