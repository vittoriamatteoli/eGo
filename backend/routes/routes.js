import express from "express";
import User from "../models/user-model.js";
import Travel from "../models/travel-model";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import {
  authenticateUser,
  authorizeUser,
  signOut,
} from "../middleware/middleware";

dotenv.config();
const SECRET = process.env.SECRET || "toast is the best secret";
//const REFRESH_SECRET = process.env.SECRET || "jam is the second best secret";
const router = express.Router();
const { calculatePoints } = require("../utils/calculatePoints");
// get all users and return the data
router.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while fetching users",
      error: error.message,
    });
  }
});

// get a specific user by id and return the data
router.get("/user/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// post a new user to the db, if they don't already exist
router.post("/user", async (req, res) => {
  const { username, email, password } = req.body;
  try {
    // check if the user already exists with the same username or email using the Mongodb $or operator
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res
        .status(400)
        .send({ message: "User with this username or email already exists" });
    }
    const newUser = await new User({
      username,
      email,
      password,
    }).save();
    res.status(201).send({ message: "User created successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error creating user" });
  }
});

// login the user and create a new session token for the users session if the user exists
//optional to add a refresh token if we want to keep the user logged in for a longer period of time
router.post("/sessions", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user && (await user.matchPassword(password))) {
      //generate a token for the user
      const token = jwt.sign({ id: user._id, role: user.role }, SECRET, {
        expiresIn: "1h",
      });
      const id = user._id;

      const role = user.role;

      // optional to generate a refresh token for the user
      //const refreshToken = jwt.sign({ id: user._id }, REFRESH_SECRET);
      //user.refreshToken = refreshToken;
      //await user.save();

      res.status(200).json({ accessToken: token, id: id, role: role });
    } else {
      res.status(401).json({ message: "Invalid username or password" });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error logging in",
      error: error.message,
    });
  }
});

//route to verify if token is valid with middleware isLoggedIn
router.get("/verify", authenticateUser, (req, res) => {
  res.json({ message: "You are logged in" });
});

router.get("/role", authenticateUser, (req, res) => {
  res.json({ role: req.user.role });
});

// patch request to update the energy level
router.patch("/user/:id", authenticateUser, async (req, res) => {
  try {
    const { id } = req.params;
    const { energyLevel } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { $set: { energyLevel: energyLevel } }, // use the $set operator to update energyLevel
      { new: true }
    );
    if (updatedUser) {
      res.json({
        message: "User energy level updated ⚡️",
        success: true,
        response: updatedUser,
      });
    } else {
      res.status(404).json({ message: "User not found", error: error.message });
    }
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while updating the user",
      error: error.message,
    });
  }
});

// patch request to  update the points
router.patch("/user/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { points } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { $inc: { points: points } }, // use the $inc operator to increment points
      { new: true }
    );
    if (updatedUser) {
      res.json({
        message: "User points updated 🥳",
        success: true,
        response: updatedUser,
      });
    } else {
      res.status(404).json({ message: "User not found", error: error.message });
    }
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while updating the user",
      error: error.message,
    });
  }
});

// get all travels for the user in the dashboard, but only if the user is authenticated and authorized
router.get("/dashboard", authenticateUser, authorizeUser, (req, res) => {
  res.send(
    "This endpoint is a protected route who lets autenticated users visit and see the data in the dashboard"
  );
});

router.post("/signout", signOut, (req, res) => {
  res.json({
    message: "User logged out successfully",
  });
});
//update the energy level or confirm the same
router.patch("/user/:id", authenticateUser, async (req, res) => {
  try {
    const { id } = req.params;
    const { energyLevel } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { $set: { energyLevel: energyLevel } }, // use the $set operator to update energyLevel
      { new: true }
    );
    if (updatedUser) {
      res.json({
        message: "User energy level updated ⚡️",
        success: true,
        response: updatedUser,
      });
    } else {
      res.status(404).json({ message: "User not found", error: error.message });
    }
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while updating the user",
      error: error.message,
    });
  }
});

//we could add a route to get all travels for the admin.

//get all travels of a  specified user
router.get("/user/:id/travels", authenticateUser, async (req, res) => {
  try {
    const { id } = req.params;
    const travels = await Travel.find({ user: id });

    res.status(200).json(travels);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error retrieving user travels" });
  }
});

//get one single travel for specified id
router.get("/travel/:id", authenticateUser, async (req, res) => {
  try {
    const { id } = req.params;
    const travel = await Travel.findById(id);
    res.status(200).json(travel);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error retrieving travel" });
  }
});

//upload travel details into travel model
router.post("/travel", authenticateUser, async (req, res) => {
  const { distance, mode, origin, destination, travelPoints } = req.body;
  const user = req.userId;

  try {
    const newTravel = await new Travel({
      distance,
      mode,
      origin,
      destination,
      travelPoints,
      user: req.user._id,
    }).save();

    res
      .status(201)
      .send({ message: "Travel uploaded successfully!", travel: newTravel });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error uploading travel" });
  }
});
// calculate points for the in the calculatepoints function
// pass energy, distance, and mode as arguments
//return the calculated points

router.post("/calculate", authenticateUser, async (req, res) => {
  const { fillPercentage, distance, mode } = req.body;
  const user = req.user;
  const points = await calculatePoints(fillPercentage, distance, mode);
  res.status(200).json({ points });
});

export default router;
