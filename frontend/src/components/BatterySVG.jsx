import styled from "styled-components";
import { useState } from "react";

const BatteryWrapper = styled.div`
  position: relative;
  width: 195px;
  height: 89px;
`;

export const BatterySVG = ({ fillPercentage = 14, onDrag }) => {
  const [dragging, setDragging] = useState(false);

  const handleMouseDown = (event) => {
    event.preventDefault();
    setDragging(true);
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = (event) => {
    if (dragging) {
      const rect = event.target.getBoundingClientRect();
      const offsetX = event.clientX - rect.left;
      let percentage = (offsetX / rect.width) * 100;
      percentage = Math.min(Math.max(0, percentage), 100);
      onDrag(percentage);
    }
  };

  const handleMouseUp = () => {
    setDragging(false);
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  return (
    <BatteryWrapper>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="195"
        height="89"
        viewBox="0 0 195 89"
        fill="none"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {/* Outer rectangle for battery outline */}
        <rect
          x="2.6543"
          y="2.64893"
          width="176.495"
          height="83.9504"
          rx="17"
          stroke="#687943"
          strokeWidth="4"
        />
        {/* Inner rectangle for battery fill */}
        <rect
          x="10.4141"
          y="11.1281"
          width="160.221"
          height="66.3682"
          rx="9"
          fill="url(#paint0_linear)"
        />
        {/* Rectangular handle at the end of the battery */}
        <rect
          x="179.279"
          y="28.0891"
          width="12.9417"
          height="35.2506"
          rx="4"
          stroke="#687943"
          strokeWidth="4"
        />
        {/* Linear gradient definition */}
        <defs>
          <linearGradient
            id="paint0_linear"
            x1="10.4141"
            y1="44.3122"
            x2="170.635"
            y2="44.3122"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor={fillPercentage === 100 ? "#FDFFF1" : "#CCE0A1"} /> {/* Lilac color at 0% or green if fillPercentage is 100 */}
            <stop offset={`${fillPercentage === 100 ? 100 : Math.max(0, fillPercentage - 5)}%`} stopColor={fillPercentage === 100 ? "#FDFFF1" : "#CCE0A1"} /> {/* Lilac color up to (fillPercentage - 10)% or green if fillPercentage is 100 */}
            <stop offset={`${fillPercentage}%`} stopColor="#FDFFF1" /> {/* Transition to green at fillPercentage */}
            <stop offset="100%" stopColor="#FDFFF1" /> {/* Green color at 100% */}
          </linearGradient>
        </defs>
      </svg>
    </BatteryWrapper>
  );
};