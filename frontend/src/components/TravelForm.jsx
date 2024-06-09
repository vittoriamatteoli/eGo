import styled from "styled-components";
import { IconButton } from "@mui/material";
import DriveEtaIcon from "@mui/icons-material/DriveEta";
import DirectionsBikeIcon from "@mui/icons-material/DirectionsBike";
import DirectionsWalkIcon from "@mui/icons-material/DirectionsWalk";
// import TwoWheelerIcon from "@mui/icons-material/TwoWheeler";
import DirectionsTransitIcon from "@mui/icons-material/DirectionsTransit";
import Autocomplete from "react-google-autocomplete";
import { useState, useEffect } from "react";
import buttonTree from "../assets/button-effect-tree.svg";

const TravelConfirmContainer = styled.div`
  position: relative;
  display: inline-block;
`;

const StyledButton = styled.button`
  cursor: pointer;
  position: relative;
  z-index: 2;
  border-radius: 30px;
  border: ${({ isClicked }) =>
    isClicked ? "1px solid #C590FB" : "1px solid #687943"};
  background: ${({ isClicked }) => (isClicked ? "#CCE0A1" : "#687943")};
  width: 165px;
  height: 55px;
  flex-shrink: 0;
  color: white;
  color: #fff;
  font-family: "Open Sans Hebrew";
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  text-transform: capitalize;
  transition: background 0.5s ease-in-out;
`;

const SvgIcon = styled.img`
  position: absolute;
  z-index: 1;
  width: 55px;
  height: 55px;
  transition-duration: 0.4s;
  transition-timing-function: ease-in-out;

  transform: ${({ isClicked }) =>
    isClicked ? "translate(-200%, -180%)" : "translate(-200%, 0%)"};

  ${StyledButton}:hover + & {
    transform: ${({ isClicked }) =>
      isClicked ? "translate(-200%, -180%)" : "translate(-200%, -55%)"};
    transition-duration: 0.4s;
    transition-timing-function: ease-in-out;
  }
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

const StyledParagraph = styled.p`
  margin-top: 0px;
  margin-bottom: 40px;
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
  const [isClicked, setIsClicked] = useState(false);
  const [travelPoints, setTravelPoints] = useState(0); //add calculation in frontend? need to fetch energy data. discuss

  const googleTravelModes = [
    { mode: "DRIVE", icon: <DriveEtaIcon /> },
    { mode: "BICYCLE", icon: <DirectionsBikeIcon /> },
    { mode: "WALK", icon: <DirectionsWalkIcon /> },
    { mode: "TRANSIT", icon: <DirectionsTransitIcon /> },
    // { mode: "TWO_WHEELER", icon: <TwoWheelerIcon /> }, note:this mode is in beta in google api
  ];

  const handleConfirm = async () => {
    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 400);

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
      "X-Goog-Api-Key": import.meta.env.VITE_GOOGLE_API_KEY,
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
        apiKey={import.meta.env.VITE_GOOGLE_API_KEY}
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
        apiKey={import.meta.env.VITE_GOOGLE_API_KEY}
        onPlaceSelected={(place) => {
          setDestination(place.formatted_address);
        }}
        options={{
          types: ["geocode", "establishment"],
        }}
      />

      <StyledParagraph>
        You will get <TravelPoints>{travelPoints}</TravelPoints> points for this
        trip
      </StyledParagraph>

      <TravelConfirmContainer className="travel-form-button">
        <StyledButton onClick={handleConfirm} isClicked={isClicked}>
          Confirm
        </StyledButton>
        <SvgIcon src={buttonTree} alt="Button Tree" isClicked={isClicked} />
      </TravelConfirmContainer>
    </>
  );
};
