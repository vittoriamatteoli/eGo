import styled from "styled-components";
import { Button, IconButton } from "@mui/material";
import DriveEtaIcon from "@mui/icons-material/DriveEta";
import DirectionsBikeIcon from "@mui/icons-material/DirectionsBike";
import DirectionsWalkIcon from "@mui/icons-material/DirectionsWalk";
// import TwoWheelerIcon from "@mui/icons-material/TwoWheeler";
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
  const [distance, setDistance] = useState(0);
  const [modeBonus, setModeBonus] = useState(5);
  const [autocompleteKey, setAutocompleteKey] = useState(0);
  const [travelPoints, setTravelPoints] = useState(0); //add calculation in frontend? need to fetch energy data. discuss

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

      //add more specific error status (can be a new task)
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

  //calculation sample just for trying out
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
        You will get <TravelPoints>{travelPoints}</TravelPoints> points for this
        trip
      </p>
      <StyledButton onClick={handleConfirm}>Confirm</StyledButton>
    </>
  );
};
