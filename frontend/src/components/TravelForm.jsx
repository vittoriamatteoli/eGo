import { EgoButton } from "../reusables/Button";
import DriveEtaIcon from "@mui/icons-material/DriveEta";
import DirectionsBikeIcon from "@mui/icons-material/DirectionsBike";
import DirectionsWalkIcon from "@mui/icons-material/DirectionsWalk";
// import TwoWheelerIcon from "@mui/icons-material/TwoWheeler";
import DirectionsTransitIcon from "@mui/icons-material/DirectionsTransit";
import Autocomplete from "react-google-autocomplete";
import { useState } from "react";
import styled from "styled-components";
const GoogleKey = import.meta.env.VITE_GOOGLE_API_KEY;



const TravelBtn = styled(EgoButton)`
width:100px;
margin: 0 auto;
`;

const TravelModesContainer = styled.div`
  width: 50%;
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

const StyledAutocomplete = styled(Autocomplete)`
  width: 50%;
  height: 1.5rem;
  padding: 10px;
  border: 2px solid #dcded0;
  border-radius: 15px;
  margin-bottom: 10px;
`;

const TravelPoints = styled.span`
  font-weight: bold;
  color: #39aa44;
`;

export const TravelForm = ({ id }) => {
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [travelMode, setTravelMode] = useState("WALK");
  const [distance, setDistance] = useState("");
  const [autocompleteKey, setAutocompleteKey] = useState(0);
  const [travelPoints, setTravelPoints] = useState(0); //add calculation in frontend? need to fetch energy data. discuss

  const googleTravelModes = [
    { mode: "DRIVE", icon: <DriveEtaIcon /> },
    { mode: "BICYCLE", icon: <DirectionsBikeIcon /> },
    { mode: "WALK", icon: <DirectionsWalkIcon /> },
    { mode: "TRANSIT", icon: <DirectionsTransitIcon /> },
    // { mode: "TWO_WHEELER", icon: <TwoWheelerIcon /> }, note:this mode is in beta in google api
  ];

  const handleConfirm = async () => {
    if (origin && destination) {
      await getRouteDetails();
      setOrigin("");
      setDestination("");
      setAutocompleteKey((prevKey) => prevKey + 1); // Increment the key to reset the Autocomplete components/text
    } else {
      console.error("Please set both origin and destination.");
    }
    console.log(origin);
    console.log(destination);
    console.log(travelMode);
  };

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
      "X-Goog-Api-Key": GoogleKey,
      "X-Goog-FieldMask": "routes.duration,routes.distanceMeters",
    };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(bodyData),
      });

      //add more specific error status (can be a new task)
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

  console.log(distance);
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

      <StyledAutocomplete
        key={`start-autocomplete-${autocompleteKey}`}
        className="start-google-search-box"
        placeholder="Start"
        apiKey={GoogleKey}
        onPlaceSelected={(place) => {
          setOrigin(place.formatted_address);
        }}
        options={{
          types: ["geocode", "establishment"],
        }}
      />

      <StyledAutocomplete
        key={`destination-autocomplete-${autocompleteKey}`}
        className="destination-google-search-box"
        placeholder="Destination"
        apiKey={GoogleKey}
        onPlaceSelected={(place) => {
          setDestination(place.formatted_address);
        }}
        options={{
          types: ["geocode", "establishment"],
        }}
      />

      <p>
        You will get <TravelPoints>{travelPoints}</TravelPoints> points for this
        trip
      </p>

      <TravelBtn onClick={handleConfirm}>Confirm</TravelBtn>

    </>
  );
};