import express from "express"
import cors from "cors"
import mongoose from "mongoose"
import dotenv from "dotenv"
// import crypto from "crypto"
// import bcrypt from "bcryptjs"
dotenv.config()

const mongoUrl = process.env.MONGO_URL || "mongodb://localhost/eGo"
mongoose.connect(mongoUrl)
mongoose.Promise = Promise

// Defines the port the app will run on. Defaults to 8080, but can be overridden
// when starting the server. Example command to overwrite PORT env variable value:
// PORT=9000 npm start
const port = process.env.PORT || 8080
const app = express()

// Add middlewares to enable cors and json body parsing
app.use(cors())
app.use(express.json())

// Start defining your routes here

app.get("/user", (req, res) => {
  res.send("Endpoint to get user details from DB!")
})
app.post("/registration", (req, res) => {
  res.send("to register user !")
})
app.post("/login", (req, res) => {
  res.send("to login user!")
})
app.get("/dashboard", (req, res) => {
  res.send("Authenticated endpoint to show the dashboard.!")
})

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
