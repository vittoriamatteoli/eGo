import Points from "../models/points-model.js";
import User from "../models/user-model.js"; // Import User model

export const updatePoints = async function (userId, travelId, points) {
  const newPoints = new Points({
    points: points,
    user: userId,
    travel: travelId,
    date: Date.now(),
  });

  try {
    await newPoints.save();
    console.log("Points updated successfully");
    console.log(
      `Updating points for user with id ${userId}. Increment by ${points})`
    );
    // Find the user first
    const user = await User.findById(userId);
    if (user) {
      await user.incrementPoints(points);
      console.log("User points updated successfully");
    } else {
      console.log(`User with id ${userId} not found`);
    }
  } catch (error) {
    console.error("Error updating points", error);
  }
};
