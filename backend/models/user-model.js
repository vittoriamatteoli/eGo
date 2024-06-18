import mongoose from "mongoose";
import bcryptjs from "bcryptjs";
import { getRandomAvatarUrl } from "../utils/avatarUtils.js";

const SALT_ROUNDS = 12; // make this configurable so we can adjust the security level if needed

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Username is required"],
    minlength: [3, "Username must be at least 3 characters long"],
    maxlength: [30, "Username must be at most 30 characters long"],
    unique: true,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    match: [/\S+@\S+\.\S+/, "Email is invalid"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [6, "Password must be at least 6 characters long"],
  },
  role: {
    type: String,
    default: "user",
  },
  // optional field for a refresh token if we want to keep the user logged in for a longer period of time
  //refreshToken: {
  //  type: String,
  //  default: null,
  // },

  points: {
    type: Number,
    default: 0,
  },
  energyLevel: {
    type: Number,
    default: 5,
  },
  avatarUrl: {
    type: String,
    default: function () {
      return getRandomAvatarUrl();
    },
  },
});
//update the users travelpoints after saving a travel
userSchema.methods.incrementPoints = function (points) {
  return this.model("User")
    .updateOne({ _id: this._id }, { $inc: { points: points } })
    .then(() => {
      console.log(
        `Points incremented by ${points}. New points: ${this.points + points}`
      );
    })
    .catch((error) => {
      console.error(`Error incrementing points: ${error}`);
    });
};

//this uses matchPassword method to compare the entered password with the hashed password in the database
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcryptjs.compare(enteredPassword, this.password);
};
//This adds a pre-save (pre) hook to hash the password *before* saving it to the database so we don't store the password in plain text
userSchema.pre("save", async function (next) {
  // we only hash the password if it has been modified (or is new)
  if (!this.isModified("password")) {
    return next();
  }

  this.password = await bcryptjs.hash(this.password, SALT_ROUNDS);

  // set a random avatar URL for new users
  if (this.isNew) {
    this.avatarUrl = this.avatarUrl || getRandomAvatarUrl();
  }

  next();
});

// This adds a pre-update hook to hash the password *before* updating it in the database
userSchema.pre("findOneAndUpdate", async function (next) {
  if (!this._update.password) {
    return next();
  }

  this._update.password = await bcryptjs.hash(this._update.password, SALT_ROUNDS);
  next();
});

export default mongoose.model("User", userSchema);
