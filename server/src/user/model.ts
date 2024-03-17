import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  user_id: String,
  password: String,
});

export const User = mongoose.model("user", userSchema);
