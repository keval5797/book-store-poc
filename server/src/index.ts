import dotenv from "dotenv";
dotenv.config();
import express, { Application } from "express";
import mongoose from "mongoose";
import book_routes from "./books";
import { Book } from "./books/model";
import cors from "cors";

async function app() {
  const server: Application = express();
  await connectDB();
  server.use(express.json());
  server.use(cors());
  server.use("/books", book_routes);

  server.listen(process.env.PORT, () => {
    return console.log("Server is listening at ", process.env.PORT);
  });
}

async function connectDB() {
  try {
    await mongoose.connect(process.env.DB_URL!);
    console.log("Connected to Database");
  } catch (error) {
    console.log("Error while connecting to DB", error);
  }
}

app();
