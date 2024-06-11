import { useEffect, useState } from "react";
import styled from "styled-components";
import Chart from "chart.js/auto";

const apikey = import.meta.env.VITE_API_KEY;
const StyledContainer = styled.div`
  box-sizing: border-box;
  border-radius: 16px;
  border: 3px solid #dcded0;
  background: rgba(217, 217, 217, 0);
  display: flex;
  padding: 40px 0;
  flex-direction: column;
  width: 100%;
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
  @media (min-width: 769px) and (max-width: 1024px) {
    height: 145px;
  }

  @media (min-width: 1024px) {
    height: 200px;
  }
`;

export const ActivityGraph = ({ id }) => {
  const [chartData, setChartData] = useState({ x: [], y: [], z: [] });
  const [chartInstance, setChartInstance] = useState(null);

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
        const x = filteredData.map((entry) => entry.distance);
        const y = filteredData.map((entry) => entry.travelPoints);
        const z = filteredData.map((entry) => entry.distance); // retrieve the mood!!!

        setChartData({ x, y, z });
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchData();
  }, [id]);

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
              data: chartData.y,
              borderColor: "#39AA44",
              backgroundColor: "#39AA44",
              stack: "combined",
              type: "line", // Line type for this dataset
              borderWidth: 2,
              fill: {
                target: "origin",
                above: "rgba(217, 217, 217, 0.00)", // Fill color above the line
                below: "rgba(217, 217, 217, 0.00)", // Fill color below the line
              },
              tension: 0.4, // Controls the curvature of the line
            },
            {
              label: "Mood",
              data: chartData.z,
              borderColor: " #CCE0A1",
              backgroundColor: " #CCE0A1",
              stack: "combined",
              type: "bar", // Bar type for this dataset
              borderWidth: 1,
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

  return (
    <StyledContainer>
      <canvas id="myChart"></canvas>
    </StyledContainer>
  );
};
