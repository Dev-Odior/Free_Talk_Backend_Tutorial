import mongoose from "mongoose";
import express from "express";
import { app } from "./app";

// const app = express();

const start = async () => {
  if (!process.env.MONGO_URI) throw new Error("MONGO_URI is required!");
  if (!process.env.JWT_KEY) throw new Error("JWT_TOKEN is required!");

  try {
    await mongoose.connect(process.env.MONGO_URI);

    app.listen(8080, () => {
      console.log(`Server is listening and running on port 8080`);
    });
  } catch (err) {
    throw new Error("database Error");
  }
};

start();
