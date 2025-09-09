import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "../models/User.js";

dotenv.config();

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

const makeAdmin = async () => {
  await connectDB();
  const user = await User.findOneAndUpdate(
    { email: "admin@example.com" },
    { role: "admin" },
    { new: true }
  );
  console.log("User updated:", user);
  process.exit();
};

makeAdmin();
