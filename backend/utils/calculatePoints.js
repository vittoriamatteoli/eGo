export function calculatePoints(fillPercentage, distance, mode) {
  console.log("calculatePoints called with", {
    fillPercentage,
    distance,
    mode,
  });

  // lets make sure fillPercentage is a number
  if (typeof fillPercentage !== "number") {
    console.log("fillPercentage is not a number, defaulting to 0");
    fillPercentage = 0;
  }

  try {
    if (fillPercentage === 0) {
      console.log("Fill percentage is zero");
      return 0;
    }
    let points = 0;

    // Calculate points based on energy, distance, and travel mode
    if (mode === "DRIVE") {
      points = (distance / fillPercentage) * 0.2;
    } else if (mode === "TRANSIT") {
      points = (distance / fillPercentage) * 0.5;
    } else if (mode === "BICYCLE") {
      points = (distance / fillPercentage) * 1.5;
    } else if (mode === "WALK") {
      points = (distance / fillPercentage) * 3;
    } else {
      console.log(`unexpected value ${mode}`);
    }
    console.log("calculatePoints returning", points);
    return Math.round(points);
  } catch (error) {
    console.error("Error in calculatePoints:", error);
  }
}
