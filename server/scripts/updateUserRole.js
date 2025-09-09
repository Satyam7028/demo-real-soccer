import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "../models/User.js";

dotenv.config();

const updateUserRole = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const email = "test@example.com";
    const user = await User.findOne({ email });
    if (!user) {
      console.log("User not found");
      process.exit(1);
    }

    user.role = "admin";
    await user.save();
    console.log(`User role updated to admin for ${email}`);
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

updateUserRole();
