import mongoose from "mongoose";
const schema = new mongoose.Schema({
  name: {type:String, required:true},
  slug: {type:String, index:true},
  image: String,
  description: String,
  category: String,
  price: {type:Number, required:true},
  countInStock: {type:Number, default:0},
}, { timestamps:true });

schema.index({ name: "text", description: "text", category: "text" });

export default mongoose.model("Product", schema);
