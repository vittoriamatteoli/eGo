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
  box-sizing: border-box;
  border-radius: 16px;
  border: 3px solid #dcded0;
  background: white;
  height: 340px;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  width: 90vw;
`;

const StyledBottomWrapper = styled.div`
  position: fixed;
  bottom: 30px;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  z-index: 4;
  transition: transform 0.5s cubic-bezier(0.22, 1, 0.36, 1);
  transform: ${({ showPopUp }) =>
    showPopUp ? "translateY(0)" : "translateY(100%)"};
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
       

        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

        const filteredData = data.filter(
          (entry) => new Date(entry.date) >= oneWeekAgo
        );

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
      chartInstance.destroy();
    }

    if (
      chartData.x.length > 0 &&
      (chartData.y.length > 0 || chartData.z.length > 0)
    ) {
      const ctx = document.getElementById("myChart");
      const newChartInstance = new Chart(ctx, {
        type: "bar",
        data: {
          labels: chartData.x,
          datasets: [
            {
              label: "Travel Points",
              data: chartData.z,
              borderColor: "#39AA44",
              backgroundColor: "#39AA44",
              stack: "combined",
              type: "line",
              borderWidth: 2,
              tension: 0.4,
              order: 1,
            },
            {
              label: "Mood",
              data: chartData.y,
              borderColor: "#CCE0A1",
              backgroundColor: "#CCE0A1",
              stack: "combined",
              type: "bar",
              borderWidth: 1,
              order: 0,
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
    setShowPopUp(!showPopUp);
  };

  return (
    <StyledWrapper>
      {!isMobile ? (
        <StyledContainer aria-label="Activity Chart">
          <canvas id="myChart" aria-label="Activity Chart"></canvas>
        </StyledContainer>
      ) : (
        <StyledBottomWrapper showPopUp={showPopUp}>
          <StyledEllipseGraph
            src="../icons/activity-button.svg"
            alt="activity-button"
            onClick={togglePopUp}
            role="button"
            aria-expanded={showPopUp}
            aria-controls="popup-chart"
          />
          <StyledPopupWrapper>
            <StyledPopup>
              <canvas id="myChart" aria-label="Activity Chart"></canvas>
            </StyledPopup>
          </StyledPopupWrapper>
        </StyledBottomWrapper>
      )}
    </StyledWrapper>
  );
};
