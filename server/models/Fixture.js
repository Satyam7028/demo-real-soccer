import mongoose from "mongoose";

const fixtureSchema = new mongoose.Schema({
  league: { type: String, required: true },
  homeTeam: { type: String, required: true },
  awayTeam: { type: String, required: true },
  date: { type: Date, required: true },
  venue: String,
  score: {
    home: { type: Number, default: 0 },
    away: { type: Number, default: 0 },
  },
  status: {
    type: String,
    enum: ["scheduled", "live", "finished"],
    default: "scheduled",
  },
}, { timestamps: true });

// ✅ Export default model
export default mongoose.model("Fixture", fixtureSchema);
