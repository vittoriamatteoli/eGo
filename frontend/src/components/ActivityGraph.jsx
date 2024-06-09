import { useEffect, useState } from "react";
import styled from "styled-components";
import Chart from "chart.js/auto";

const apikey = import.meta.env.VITE_API_KEY;
const StyledContainer = styled.div`
  border-radius: 20px;
  background: linear-gradient(180deg, #dcded0 82.22%, #cce0a1 100%);
  /* padding: 40px 0; */
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  justify-content: center;
  gap: 10px;
  canvas {
    width: 100%;
    height: 200px;
    padding: 0;
    margin: 0;
  }
`;

export const ActivityGraph = ({ id }) => {
  const [chartData, setChartData] = useState({ x: [], y: [] });
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

        setChartData({ x, y });
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

    if (chartData.x.length > 0 && chartData.y.length > 0) {
      const ctx = document.getElementById("myChart");
      const newChartInstance = new Chart(ctx, {
        type: "line",
        data: {
          labels: chartData.x,
          datasets: [
            {
              label: "Travel Points",
              data: chartData.y,
              borderColor: "#687943",
              borderWidth: 2,
              fill: {
                target: "origin",
                above: "#68794389", // Fill color above the line
                below: "#687943)", // Fill color below the line
              },
              tension: 0.4, // Controls the curvature of the line
            },
          ],
        },
        options: {
          scales: {
            x: {
              display: false, // Hide x-axis
            },
            y: {
              display: false, // Hide y-axis
            },
            // y: {
            //   display: true,
            //   title: {
            //     display: true,
            //     text: 'Y-axis Label'
            //   }
            // }
          },
          plugins: {
            title: {
              display: true,
              text: "Activity",
              // align: "start",
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
