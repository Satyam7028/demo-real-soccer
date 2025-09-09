import mongoose from "mongoose";

const leagueSchema = new mongoose.Schema({
  name: { type: String, required: true },
  country: String,
  season: String,
  teams: [String], // could also be references
  standings: Array, // can later be improved with schema
}, { timestamps: true });

export default mongoose.model("League", leagueSchema);
