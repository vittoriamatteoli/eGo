import styled from "styled-components";
import { Button, IconButton } from "@mui/material";
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
  const [travelMode, setTravelMode] = useState("WALK");
  const [distance, setDistance] = useState(0);
  const [modeBonus, setModeBonus] = useState(5);
  const [autocompleteKey, setAutocompleteKey] = useState(0);
  const [travelPoints, setTravelPoints] = useState(0); //dummy calculation
  const [isClicked, setIsClicked] = useState(false);
  const apikey = import.meta.env.VITE_API_KEY;
  const API = `${apikey}/travel`;

  const googleTravelModes = [
    { mode: "DRIVE", icon: <DriveEtaIcon /> },
    { mode: "BICYCLE", icon: <DirectionsBikeIcon /> },
    { mode: "WALK", icon: <DirectionsWalkIcon /> },
    { mode: "TRANSIT", icon: <DirectionsTransitIcon /> },
    // { mode: "TWO_WHEELER", icon: <TwoWheelerIcon /> }, note:this mode is in beta in google api
  ];

  useEffect(() => {
    if (origin && destination) {
      getRouteDetails();
      calculationDraft(travelMode);
    }
  }, [origin, destination, travelMode, distance]);

  const handleConfirm = async () => {
    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 400);

    await postTravelData();
    if (origin && destination) {
      setOrigin("");
      setDestination("");
      setDistance(0);
      setTravelPoints(0);
      setTravelMode("WALK");
      setAutocompleteKey((prevKey) => prevKey + 1); // Increment the key to reset the Autocomplete components/text
    } else {
      console.error("Please set both origin and destination.");
    }
    console.log(origin);
    console.log(destination);
    console.log(travelMode);
    console.log(`distance: ${distance}`);
    console.log(`Sample pointes: ${travelPoints}`);
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

      //add more specific error status, check into google api doc
      if (!response) {
        if (response.status === 404) {
          throw new Error("Failed at getting the route!");
        } else {
          throw new Error(`Error! Status: ${response.status}`);
        }
      }

      const data = await response.json();
      const travelDistance = data.routes[0].distanceMeters;

      setDistance(travelDistance);
    } catch (error) {
      console.error("Error fetching route details:", error.message);
    }
  };

  //dummy points calculation
  const calculationDraft = async (travelMode) => {
    switch (travelMode) {
      case "DRIVE":
        setModeBonus(1);
        break;
      case "BICYCLE":
        setModeBonus(4);
        break;
      case "WALK":
        setModeBonus(5);
        break;
      case "TRANSIT":
        setModeBonus(2);
        break;
      default:
        setModeNumber(5);
        break;
    }
    const newTravelPoint = distance * modeBonus;
    setTravelPoints(newTravelPoint);
  };

  const postTravelData = async () => {
    const token = sessionStorage.getItem("accessToken");
    const travelData = {
      distance: distance,
      mode: travelMode,
      origin: origin,
      destination: destination,
    };

    if (!["DRIVE", "BICYCLE", "WALK", "TRANSIT"].includes(travelMode)) {
      console.error("Invalid travel mode:", travelMode);
    }

    try {
      const response = await fetch(API, {
        method: "POST",
        body: JSON.stringify(travelData),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to storing travel data:${response.status}`);
      }

      const data = await response.json();
      console.log("Travel data stored successfully:", data);
    } catch (error) {
      console.error("Failed at storing travel data:");
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

      <p>
        Distance: <TravelPoints>{distance}</TravelPoints> m
      </p>
      <StyledParagraph>
        You will get <TravelPoints>{travelPoints}</TravelPoints> points for this
        trip
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
