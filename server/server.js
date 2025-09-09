import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";

import connectDB from "./config/db.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

import productRoutes from "./routes/productRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import playerRoutes from "./routes/playerRoutes.js";
import leagueRoutes from "./routes/leagueRoutes.js";
import fixtureRoutes from "./routes/fixtureRoutes.js";
import newsRoutes from "./routes/newsRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";

dotenv.config(); // adjust path if your .env is outside server/
connectDB();

const app = express();

// Middleware
if (process.env.NODE_ENV === "development") app.use(morgan("dev"));

app.use(cors({
  origin: process.env.CLIENT_URL || "http://localhost:3000",
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/products", productRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/players", playerRoutes);
app.use("/api/leagues", leagueRoutes);
app.use("/api/fixtures", fixtureRoutes);
app.use("/api/news", newsRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/admin", adminRoutes);

app.get("/", (req, res) => res.send("API is running..."));

// Error handlers
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`✅ Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
