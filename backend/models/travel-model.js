import mongoose from "mongoose";
import { updatePoints } from "../utils/updatePoints";

const travelSchema = new mongoose.Schema({
  distance: {
    type: Number,
    required: [true, "Distance is required"],
    min: [0, "Distance cannot be negative"],
  },
  mode: {
    type: String,
    enum: ["DRIVE", "BICYCLE", "WALK", "TRANSIT"],
    required: [true, "Way of travel is required"],
  },
  date: {
    type: Date,
    default: () => Date.now(),
  },
  origin: {
    type: String,
    required: [true, "Start location is required"],
  },
  destination: {
    type: String,
    required: [true, "End location is required"],
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "User is required"],
  },
  travelPoints: {
    type: Number,
    required: [true, "Travel points are required"],
  },
});

// Update user's points after saving a travel
travelSchema.post("save", function (doc, next) {
  const userId = doc.user;
  const travelId = doc._id;
  const travelPoints = doc.travelPoints;
  console.log("calculated points by travelschema:", travelPoints);
  console.log("userId by travelschema:", userId);
  console.log("travelId by travelschema:", travelId);

  updatePoints(userId, travelId, travelPoints)
    .then(() => next())
    .catch((err) => next(err));
});

export default mongoose.model("Travel", travelSchema);
