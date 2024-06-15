import { useEffect, useState } from "react";
import styled from "styled-components";
import Chart from "chart.js/auto";
import { useMediaQuery } from "react-responsive";

const apikey = import.meta.env.VITE_API_KEY;

const StyledWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
const StyledEllipseGraph = styled.img`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  color: white;
  text-decoration: none;
`;
const StyledPopup = styled.div`
  box-sizing: border-box;
  border-radius: 16px;
  border: 3px solid #dcded0;
  align-items: center;
  justify-content: center;
  margin: 30px 20px;
`;
const StyledPopupWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  box-sizing: border-box;
  border-radius: 16px;
  border: 3px solid #dcded0;
  background: white;
  height: 340px;
  transition: transform 0.5s cubic-bezier(0.22, 1, 0.36, 1); /* animation */
  transform: ${({ showPopUp }) =>
    showPopUp ? "translateY(-300px)" : "translateY(0)"};
  z-index: 4;
`;

const StyledBottom = styled.div`
  position: absolute;
  bottom: ${({ showPopUp }) => (showPopUp ? "300px" : "-290px")};
  width: 100%;
  height: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  z-index: 2; /* Ensure it's below StyledEllipseGraph */
  transition: bottom 0.5s cubic-bezier(0.22, 1, 0.36, 1); /* animation */
`;
const StyledContainer = styled.div`
  box-sizing: border-box;
  border-radius: 16px;
  border: 3px solid #dcded0;
  background: rgba(217, 217, 217, 0);
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  align-items: center;
  justify-content: center;
  gap: 10px;
  height: 340px;
  canvas {
    width: 100%;
    height: 340px;
    padding: 0;
    margin: 0;
    cursor: pointer;
  }

  @media all and (min-width: 768px) {
    height: 250px;
  }
`;

export const ActivityGraph = ({ id }) => {
  const [chartData, setChartData] = useState({ x: [], y: [], z: [] });
  const [chartInstance, setChartInstance] = useState(null);
  const [showPopUp, setShowPopUp] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = sessionStorage.getItem("accessToken");
        const response = await fetch(`${apikey}/user/${id}/travels`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();
        console.log(data, "data");

        // Filter data for the last week
        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

        const filteredData = data.filter(
          (entry) => new Date(entry.date) >= oneWeekAgo
        );

        // Process data
        const x = filteredData.map((entry) => `${entry.distance} km`);
        const y = filteredData.map((entry) => {
          switch (entry.mode) {
            case "WALK":
              return 10000;
            case "BICYCLE":
              return 8000;
            case "TRANSIT":
              return 7000;
            case "DRIVE":
              return 5000;
            default:
              return 0;
          }
        });
        const z = filteredData.map((entry) => entry.travelPoints);

        setChartData({ x, y, z });
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchData();
  }, [id, showPopUp]);

  useEffect(() => {
    if (chartInstance) {
      // Destroy the existing chart instance
      chartInstance.destroy();
    }

    if (
      chartData.x.length > 0 &&
      (chartData.y.length > 0 || chartData.z.length > 0)
    ) {
      const ctx = document.getElementById("myChart");
      const newChartInstance = new Chart(ctx, {
        type: "bar", // Set the base type to bar
        data: {
          labels: chartData.x,
          datasets: [
            {
              label: "Travel Points",
              data: chartData.z,
              borderColor: "#39AA44",
              backgroundColor: "#39AA44",
              stack: "combined",
              type: "line", // Line type for this dataset
              borderWidth: 2,
              tension: 0.4, // Controls the curvature of the line
              order: 1,
            },
            {
              label: "Mood",
              data: chartData.y,
              borderColor: "#CCE0A1",
              backgroundColor: "#CCE0A1",
              stack: "combined",
              type: "bar", // Bar type for this dataset
              borderWidth: 1,
              order: 0, // Ensure bars are drawn over line
            },
          ],
        },
        options: {
          scales: {
            x: {
              display: false,
            },
            y: {
              display: false,
            },
          },
          plugins: {
            title: {
              display: true,
              text: "Activity",
            },
          },
        },
      });

      setChartInstance(newChartInstance);
    }
  }, [chartData]);
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const togglePopUp = () => {
    setShowPopUp(!showPopUp); // Toggle popup state
  };

  return (
    <StyledWrapper>
      {!isMobile ? (
        <StyledContainer>
          <canvas id="myChart"></canvas>
        </StyledContainer>
      ) : (
        <StyledBottom>
          <StyledEllipseGraph
            src="/Activity-button.png"
            alt="activity-button"
            onClick={togglePopUp}
          ></StyledEllipseGraph>
          {showPopUp && (
            <StyledPopupWrapper>
              <StyledPopup>
                <canvas id="myChart"></canvas>
              </StyledPopup>
            </StyledPopupWrapper>
          )}
        </StyledBottom>
      )}
    </StyledWrapper>
  );
};
