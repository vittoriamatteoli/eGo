import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import router from "./routes/routes";
import expressListEndpoints from "express-list-endpoints";

dotenv.config();

const mongoUrl = process.env.MONGO_URL || "mongodb://localhost/eGo";
mongoose.connect(mongoUrl);
mongoose.Promise = Promise;

const port = process.env.PORT || 8080;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());

// import the routes
app.use("/", router);

app.get("/test-db", async (req, res) => {
  try {
    await mongoose.connection.db.admin().ping();
    res.send("Connected to MongoDB");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error connecting to MongoDB");
  }
});

// list all endpoints
app.get("/", (req, res) => {
  try {
    const routerEndpoints = expressListEndpoints(router);
    const descriptions = {
      "/energy": "This endpoint update the energy level of the user.",
      "/signout":
        "This endpoint make sure to log out the user and delete session token (and potentially adds used token to a blacklist if we want to set that up).",
      "/user":
        "This endpoint posts all the data provided from the new user to the  db.",
      "/sessions":
        "This endpoint authenticate the user and creates a new session token for the users session.",
      "/dashboard":
        "This endpoint is a protected route who lets autenticated users visit and see the data in the dashboard.",
      "/user/:id":
        "This endpoint returns the data for a specific user matching the id provided +update the energy level+update the points number .",
      "/users": "This route retrieves all users from the database.",
      "/": "This endpoint retrieves all endpoints available in the API.",
      "/travel":
        "This endpoint uploads travel details into travels in travel  model.",
      "/user/:id/travels":
        "This endpoint returns the travels for a specific user.",
      "/travel/:id": "This endpoint returns a specified travel",
    };

    const updatedEndpoints = routerEndpoints.map((endpoint) => {
      return {
        path: endpoint.path,
        methods: endpoint.methods,
        description: descriptions[endpoint.path] || "No description provided",
      };
    });
    res.json(updatedEndpoints);
  } catch (error) {
    // If an error occurred, create a new error with a custom message
    const customError = new Error(
      "An error occurred while fetching the endpoints"
    );
    res.status(404).json({
      success: false,
      response: error,
      message: customError.message,
    });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
