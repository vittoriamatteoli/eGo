
import mongoose from 'mongoose';
import bcryptjs from 'bcryptjs';
import { getRandomAvatarUrl } from '../utils/avatarUtils.js';
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
    maxlength: [30, "Password must be at most 30 characters long"],
  },
  //role if we want to differ on paying or non payin users or admin.
  //we need to have some way of differentiate the users to use autorization in our project
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
    default: getRandomAvatarUrl,
  },
});



//Suggestion: hashing the pass before we save it at use the matchpassword method to compare the password as the user logs in.

//optional addon for security: (we could also save this method in a middleware file and import it here if we want to keep the model file cleaner)

//this uses matchPassword method to compare the entered password with the hashed password in the database
userSchema.methods.matchPassword = async function (enteredPassword) {

  return await bcryptjs.compare(enteredPassword, this.password);
};

//This adds a pre-save (pre) hook to hash the password *before* saving it to the database so we don't store the password in plain text
userSchema.pre("save", async function (next) {
  // we only hash the password if it has been modified (or is new)
  if (!this.isModified("password")) {

    next();

  }
  // hash the password before saving it to the database with the SALT_ROUNDS we can easoly adjust the security level.
  //high=more secure but slower to hash - (10-12 is supposed to be a good balance)
  this.password = await bcryptjs.hash(this.password, SALT_ROUNDS)
})


export default mongoose.model("User", userSchema);

