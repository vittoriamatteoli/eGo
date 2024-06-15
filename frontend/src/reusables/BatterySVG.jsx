import styled from "styled-components";
import { useState, useEffect, useCallback } from "react";

const BatteryWrapper = styled.div`
  position: relative;

  svg {
    cursor: pointer;
  }
`;

export const BatterySVG = ({
  fillPercentage = 0,
  onDrag,
  width = "195px",
  height = "89px",
  ariaLabel = "Battery Slider",
}) => {
  const [dragging, setDragging] = useState(false);
  const handleDragByArrowKey = useCallback(
    (increment) => {
      const step = 5; // Adjust the step size as needed
      let newPercentage = fillPercentage + increment * step;
      newPercentage = Math.max(0, Math.min(100, newPercentage)); // Clamp within 0-100 range
      onDrag(newPercentage);
      setDragging(true);
    },
    [fillPercentage, onDrag]
  );
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (!dragging) {
        switch (event.key) {
          case "ArrowLeft":
            event.preventDefault();
            handleDragByArrowKey(-1);
            break;
          case "ArrowRight":
            event.preventDefault();
            handleDragByArrowKey(1);
            break;
          default:
            break;
        }
      }
    };

    const handleKeyUp = () => {
      setDragging(false);
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, [dragging, handleDragByArrowKey]);

  const handleMouseDown = (event) => {
    event.preventDefault();
    setDragging(true);
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("touchmove", handleTouchMove);
    document.addEventListener("touchend", handleTouchEnd);
  };

  const handleMouseMove = (event) => {
    if (dragging) {
      handleDrag(event.clientX, event.target);
    }
  };

  const handleMouseUp = () => {
    setDragging(false);
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
    document.removeEventListener("touchmove", handleTouchMove);
    document.removeEventListener("touchend", handleTouchEnd);
  };

  const handleTouchStart = (event) => {
    event.preventDefault();
    setDragging(true);
    document.addEventListener("touchmove", handleTouchMove);
    document.addEventListener("touchend", handleTouchEnd);
  };

  const handleTouchMove = (event) => {
    if (dragging) {
      const touch = event.touches[0];
      handleDrag(touch.clientX, event.target);
    }
  };

  const handleTouchEnd = () => {
    setDragging(false);
    document.removeEventListener("touchmove", handleTouchMove);
    document.removeEventListener("touchend", handleTouchEnd);
  };

  const handleDrag = (clientX, target) => {
    const rect = target.getBoundingClientRect();
    const offsetX = clientX - rect.left;
    let percentage = (offsetX / rect.width) * 100;
    if (percentage < 0) percentage = 0;
    if (percentage > 100) percentage = 100;
    onDrag(percentage);
  };

  return (
    <BatteryWrapper>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={width}
        height={height}
        viewBox="0 0 195 89"
        fill="none"
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        onMouseMove={handleMouseMove}
        onTouchMove={handleTouchMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchEnd={handleTouchEnd}
        aria-label={ariaLabel}
        tabIndex="0" // Make SVG focusable
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
            {/* Gradient stops for battery fill */}
            <stop offset="0%" stopColor="#7B4AAC" />
            <stop offset={`${fillPercentage}%`} stopColor="#39AA44" />
            <stop
              offset={`${fillPercentage + 1}%`}
              stopColor="#39AA44"
              stopOpacity="0"
            />
            <stop offset="100%" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
    </BatteryWrapper>
  );
};
