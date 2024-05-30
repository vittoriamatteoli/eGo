import User from "../models/user-model.js";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();
const SECRET = process.env.SECRET || "toast is the best secret";

const authenticateUser = async (req, res, next) => {
  try {
    const accessToken = req.header("Authorization");
    req.accessToken = accessToken; // add the token to the request object in case we need it for later use in other middlewares..
    if (!accessToken) {
      return res.status(401).json({
        loggedOut: true,
        message: "Access token is missing",
      });
    }
    const decoded = jwt.verify(accessToken, SECRET);
    if (!decoded) {
      return res.status(403).json({
        message: "Invalid access token",
      });
    }
    const user = await User.findOne({ _id: decoded.id });
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    req.user = user;
    next();
  } catch (error) {
    res.status(403).json({ message: "Access forbidden", error: error.message });
  }
};

// add authorization to the routes that need it, if we want to make an GUI for the admins who can see all users and their data and preform operations on the data - or if we want some kind of superusers (paid access for instance - but then we need to add "roles" to the user model)

const authorizeUser = (roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Access forbidden" });
    }
    next();
  };
};

// log out the user (and lets remmeberdelete the session token)
const signOut = async (req, res) => {
  try {
    const user = req.user;
    // option to add the used token to a blacklist if we want to set that up
    //option to add a refresh token if we want the service to "remember" the user and keep the user logged in for a longer period of time.
    //user.refreshToken = null;
    //await user.save();
    res.json({ message: "User logged out successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error logging out", error: error.message });
  }
};

export { authenticateUser, authorizeUser, signOut };
