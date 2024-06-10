import styled from "styled-components";
import { Button, IconButton } from "@mui/material";
import DriveEtaIcon from "@mui/icons-material/DriveEta";
import DirectionsBikeIcon from "@mui/icons-material/DirectionsBike";
import DirectionsWalkIcon from "@mui/icons-material/DirectionsWalk";
// import TwoWheelerIcon from "@mui/icons-material/TwoWheeler";
import DirectionsTransitIcon from "@mui/icons-material/DirectionsTransit";
import Autocomplete from "react-google-autocomplete";
import { useState, useContext, useEffect } from "react";
import { DashboardContext } from './DashboardContext';
import jwt_decode from "jwt-decode";



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
  const [autocompleteKey, setAutocompleteKey] = useState(0);
  const { travelMode, setTravelMode, distance, setDistance, travelDistance, setTravelDistance, travelPoints, setTravelPoints, fillPercentage } = useContext(DashboardContext);

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

      //add more specific error status, check into google api doc
      if (!response) {
        if (response.status === 404) {
          throw new Error("Failed at getting the route!");
        } else {
          throw new Error(`Error! Status: ${response.status}`);
        }
      }

      const data = await response.json();

      console.log('Route details:', data);

      if (data) {
        console.log('First route in  meters:', data.routes[0].distanceMeters);
        setDistance(data.routes[0].distanceMeters);
        setTravelDistance(data.routes[0].distanceMeters);
        console.log('Travel distance:', travelDistance);

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
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      },
      body: JSON.stringify({
        fillPercentage,
        distance,
        mode: travelMode
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
        const travelPoints = await calculateTravelPoints(fillPercentage, distance, travelMode);
        setTravelPoints(travelPoints);
      };
      calculateAndSetPoints();
    }
  }, [origin, destination, fillPercentage, distance, travelMode]);

  //pass the travel data and points to the travel db, and then add points to both pointsdb and user points
  const handleConfirm = async () => {
    if (origin && destination && travelPoints) {
      await uploadTravel(distance, travelMode, origin, destination, travelPoints, id);
      setOrigin("");
      setDestination("");
      setTravelPoints(0); // Reset the travelPoints state
      setAutocompleteKey((prevKey) => prevKey + 1); // Increment the key to reset the Autocomplete components/text
    } else {
      console.error("Please set both origin and destination.");
    }
  };



  //function for uploading data to the travel db
  const uploadTravel = async (distance, mode, origin, destination, travelPoints, user) => {

    //console.log(`LOGG LOGG: distance: ${distance}, mode: ${mode}, origin: ${origin}, destination: ${destination}, travelPoints: ${travelPoints}, user: ${user}`);
    const API = `${import.meta.env.VITE_API_KEY}/travel`;
    const accessToken = sessionStorage.getItem("accessToken");
    const decodedToken = jwt_decode(accessToken);
    const response = await fetch(API, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
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
    console.log('Response from server travel:', travel);
    return travel;
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
      <p>
        You will get <TravelPoints>{travelPoints}</TravelPoints> points for this
        trip
      </p>
      <StyledButton onClick={handleConfirm}>Confirm</StyledButton>
    </>
  );
};
