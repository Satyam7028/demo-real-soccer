import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "../models/User.js";

dotenv.config();

const resetUserPassword = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const email = "test@example.com";
    const newPassword = "password123";

    const user = await User.findOne({ email });
    if (!user) {
      console.log("User not found");
      process.exit(1);
    }

    user.password = newPassword;
    await user.save();
    console.log(`Password reset to '${newPassword}' for user ${email}`);
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

resetUserPassword();
