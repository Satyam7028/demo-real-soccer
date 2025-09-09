import mongoose from "mongoose";
const schema = new mongoose.Schema({
  name: { type:String, required:true },
  position: String,
  team: String, // or reference to League/Club
  nationality: String,
  age: Number,
  stats: { matches: Number, goals: Number, assists: Number }
}, { timestamps:true });
export default mongoose.model("Player", schema);
