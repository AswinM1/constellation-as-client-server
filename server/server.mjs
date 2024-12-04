import express from "express";
import mongoose from "mongoose";
import router from "./user.route.js";
import cors from "cors";
import dotenv from 'dotenv';
dotenv.config();


const app = express();
app.use(cors({
  origin: "http://localhost:5173", // Replace with your frontend URL
}));

// Middleware to parse JSON requests
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URL) // Fixed the typo here
  .then(() => {
    app.listen(3000, () => {
      console.log("Server started on port 3000");
      console.log("Connected to MongoDB");
    });

    // Use the router
    app.use("/api", router);
  })
  .catch((error) => {
    console.log(error);
  });
