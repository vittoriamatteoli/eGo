import styled from "styled-components";
import { Button, IconButton } from "@mui/material";
import DriveEtaIcon from "@mui/icons-material/DriveEta";
import DirectionsBikeIcon from "@mui/icons-material/DirectionsBike";
import DirectionsWalkIcon from "@mui/icons-material/DirectionsWalk";
// import TwoWheelerIcon from "@mui/icons-material/TwoWheeler";
import DirectionsTransitIcon from "@mui/icons-material/DirectionsTransit";
import Autocomplete from "react-google-autocomplete";
import { useState, useContext, useEffect } from "react";
import { DashboardContext } from "./DashboardContext";
import jwt_decode from "jwt-decode";
import buttonTree from "../assets/button-effect-tree.svg";

const TravelConfirmContainer = styled.div`
  position: relative;
  display: inline-block;
`;

const StyledTravelButton = styled(Button)`
  cursor: pointer;
  outline: none;
  text-transform: none;
  position: relative;
  z-index: 2;
  border-radius: 30px;
  border: 2px solid #687943;
  filter: drop-shadow(0px 4px 6px #00000040);
  background: ${({ isClicked }) => (isClicked ? "#2D3915" : "#687943")};
  width: 165px;
  height: 55px;
  color: #fff;
  font-family: "Open Sans", sans-serif;
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  transition: all 0.5s ease-in-out;

  &:hover {
    filter: drop-shadow(0px 4px 6px #00000080);
    background: #cce0a1;
    color: #2d3915;
  }
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

  ${StyledTravelButton}:hover + & {
    transform: ${({ isClicked }) =>
      isClicked ? "translate(-200%, -180%)" : "translate(-200%, -55%)"};
    transition-duration: 0.4s;
    transition-timing-function: ease-in-out;
  }

  ${StyledTravelButton}:active + & {
    transform: ${({ isClicked }) =>
      isClicked ? "translate(-200%, -200%)" : "translate(-200%, -55%)"};
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
  padding: 15px 10px 15px 20px;
  border: 2px solid #dcded0;
  border-radius: 15px;
  margin-bottom: 10px;
  font-size: 15px;

  @media (min-width: 768px) {
    font-size: 18px;
  }

  @media (min-width: 1024px) {
    font-size: 22px;
  }
`;

const StyledParagraph = styled.p`
  margin-top: 0px;
  margin-bottom: 15%;
`;

const TravelPoints = styled.span`
  font-weight: bold;
  color: #39aa44;
`;

export const TravelForm = ({ id }) => {
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [autocompleteKey, setAutocompleteKey] = useState(0);
  const [isClicked, setIsClicked] = useState(false);
  const {
    travelMode,
    setTravelMode,
    distance,
    setDistance,
    travelDistance,
    setTravelDistance,
    travelPoints,
    setTravelPoints,
    fillPercentage,
    points,
    setPoints,
  } = useContext(DashboardContext);

  const googleTravelModes = [
    { mode: "DRIVE", icon: <DriveEtaIcon /> },
    { mode: "BICYCLE", icon: <DirectionsBikeIcon /> },
    { mode: "WALK", icon: <DirectionsWalkIcon /> },
    { mode: "TRANSIT", icon: <DirectionsTransitIcon /> },
    // { mode: "TWO_WHEELER", icon: <TwoWheelerIcon /> }, note:this mode is in beta in google api
  ];

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

      console.log("Route details:", data);

      if (data) {
        console.log("First route in  meters:", data.routes[0].distanceMeters);
        setDistance(data.routes[0].distanceMeters);
        setTravelDistance(data.routes[0].distanceMeters);
        console.log("Travel distance:", travelDistance);
      }
    } catch (error) {
      console.error("Error fetching route details:", error.message);
    }
  };

  //function to calculate the points for the travel
  const calculateTravelPoints = async (fillPercentage, distance, mode) => {
    const CalculateAPI = `${import.meta.env.VITE_API_KEY}/calculate`;
    const accessToken = sessionStorage.getItem("accessToken");
    const response = await fetch(CalculateAPI, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        fillPercentage,
        distance,
        mode: travelMode,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const { points } = await response.json();
    return points;
  };

  useEffect(() => {
    if (origin && destination) {
      const calculateAndSetPoints = async () => {
        await getRouteDetails();
        const travelPoints = await calculateTravelPoints(
          fillPercentage,
          distance,
          travelMode
        );
        setTravelPoints(travelPoints);
      };
      calculateAndSetPoints();
    }
  }, [origin, destination, fillPercentage, distance, travelMode]);

  //pass the travel data and points to the travel db, and then add points to both pointsdb and user points
  const handleConfirm = async () => {
    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 400);

    if (origin && destination && travelPoints) {
      await uploadTravel(
        distance,
        travelMode,
        origin,
        destination,
        travelPoints,
        id
      );
      setOrigin("");
      setDestination("");
      setTravelPoints(0); // Reset the travelPoints state
      setDistance(0); // Reset the distance state
      setAutocompleteKey((prevKey) => prevKey + 1); // Increment the key to reset the Autocomplete components/text
    } else {
      console.error("Please set both origin and destination.");
    }
  };

  //function for uploading data to the travel db
  const uploadTravel = async (
    distance,
    mode,
    origin,
    destination,
    travelPoints,
    user
  ) => {
    //console.log(`LOGG LOGG: distance: ${distance}, mode: ${mode}, origin: ${origin}, destination: ${destination}, travelPoints: ${travelPoints}, user: ${user}`);
    const API = `${import.meta.env.VITE_API_KEY}/travel`;
    const accessToken = sessionStorage.getItem("accessToken");
    const decodedToken = jwt_decode(accessToken);
    const response = await fetch(API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        distance,
        mode,
        origin,
        destination,
        travelPoints,
        user,
      }),
    });
    const { travel } = await response.json();
    console.log("Response from server travel:", travel);
    return travel;
  };

  return (
    <>
      <TravelModesContainer>
        {googleTravelModes.map((mode) => (
          <TravelModeButton
            aria-label={mode.mode}
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
        <p>
          Distance: <TravelPoints>{distance}</TravelPoints> m
        </p>
        <p>
          You will get <TravelPoints>{travelPoints}</TravelPoints> points for
          this trip
        </p>
      </StyledParagraph>

      <TravelConfirmContainer className="travel-form-button">
        <StyledTravelButton onClick={handleConfirm} isClicked={isClicked}>
          Confirm
        </StyledTravelButton>
        <SvgIcon src={buttonTree} alt="Button Tree" isClicked={isClicked} />
      </TravelConfirmContainer>
    </>
  );
};
