import mongoose from 'mongoose';

const travelSchema = new mongoose.Schema({
  distance: {
    type: Number,
    required: [true, "Distance is required"],
    min: [0, "Distance cannot be negative"],
  },
  wayOfTravel: {
    type: String,
    enum: ["driving", "walking", "bicycling", "transit"],
    required: [true, "Way of travel is required"],
  },
  date: {
    type: Date,
    required: [true, "Date is required"],
  },
  startLocation: {
    type: String,
    required: [true, "Start location is required"],
  },
  endLocation: {
    type: String,
    required: [true, "End location is required"],
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, "User is required"],
  },
});

export default mongoose.model('Travel', travelSchema);


// added distance and date to the travelSchema as required fields so we can use the data to calculate the carbon footprint/pollution of the travel or points better. or to calculate the total distance traveled by the user.
//date seemed like a good idea to add to the travelSchema so we can use it to calculate the total distance traveled by the user in a specific time period. or just for sorting the travels by date for instance.