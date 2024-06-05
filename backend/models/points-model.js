import mongoose from 'mongoose';

const pointsSchema = new mongoose.Schema({
  points: {
    type: Number,
    required: [true, "Points is required"],
    min: [0, "Points cannot be negative"],
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    requred: [true, "User is required"],
  },
  travel: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Travel',
    required: [true, "Travel is required"],
  },
  date:{
    type: Date,
    required: [true, "Date is required"],
  default: Date.now,
  },
});

export default mongoose.model('Points', pointsSchema);