import mongoose from "mongoose";
import { calculatePoints } from "../utils/calculatePoints";
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
    default: calculatePoints,
  },
});

export default mongoose.model("Travel", travelSchema);

// added distance and date to the travelSchema as required fields so we can use the data to calculate the carbon footprint/pollution of the travel or points better. or to calculate the total distance traveled by the user.
//date seemed like a good idea to add to the travelSchema so we can use it to calculate the total distance traveled by the user in a specific time period. or just for sorting the travels by date for instance.-> maybe useful for charts???
