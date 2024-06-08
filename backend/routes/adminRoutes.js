import express from "express";
import User from "../models/user-model.js";
import { authenticateUser, authorizeUser } from "../middleware/middleware";
import dotenv from "dotenv";
dotenv.config();
const SECRET = process.env.SECRET || "toast is the best secret";
const adminRouter = express.Router();
adminRouter.use(authenticateUser, authorizeUser(["admin"]));


// route for getting content behind authorization
adminRouter.get("/", (req, res) => {
  // This code will only run if the user is an admin
  res.render("admin");
});

// get all users in the database
adminRouter.get("/users", async (req, res) => {
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

//admin add user
adminRouter.post("/users", async (req, res) => {
  try {
    const { username, email, role, password} = req.body;
    if (!username || !email || !role || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .send({ message: "User with this email already exists" });
    }
    const newUser = new User({
      username,
      email,
      role,
      password,
    });
    const savedUser = await newUser.save();
    res.json(savedUser);
  } catch (error) {
    res.status(500).json({
      error: "An error occurred while adding the user"
    });
  }
});

//admin update user
adminRouter.put("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { username, email, role, password, points, energyLevel, avatarUrl } = req.body;

    if (!(username || email || role || password || points || energyLevel || avatarUrl)) {
      return res.status(400).json({
        error: "At least one field is required to update user data",
      });
    }

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (username) user.username = username;
    if (email) user.email = email;
    if (role) user.role = role;
    if (password) user.password = password;
    if (points) user.points = points;
    if (energyLevel) user.energyLevel = energyLevel;
    if (avatarUrl) user.avatarUrl = avatarUrl;

    const updatedUser = await user.save();

    res.json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "An error occurred while updating the user",
      error: error.message,
    });
  }
});


adminRouter.delete("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUser = await User.findByIdAndDelete(id);
    if (deletedUser) {
      res.json({ message: "user deleted", deletedUser });
    } else {
      res.status(404).json({ message: "User not found", error: error.message });
    }
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while deleting the user",
      error: error.message,
    });
  }
});

export default adminRouter;
