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
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
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
      const token = jwt.sign({ id: user._id }, SECRET, { expiresIn: "1h" });
      const id = user._id;
      // optional to generate a refresh token for the user
      //const refreshToken = jwt.sign({ id: user._id }, REFRESH_SECRET);
      //user.refreshToken = refreshToken;
      //await user.save();
      res.status(200).json({ accessToken: token , id:id});
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

export default router;
