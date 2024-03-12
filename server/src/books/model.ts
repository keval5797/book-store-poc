import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
  name: String,
  author: String,
  description: String,
  price: Number,
});

export const Book = mongoose.model("book", bookSchema);
