import mongoose from "mongoose";

const newsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true, lowercase: true },
  content: { type: String, required: true },
  excerpt: String,
  image: String,
  category: { type: String, enum: ["news", "transfer", "injury", "other"], default: "news" },
  author: { type: String, default: "Admin" },
  publishedAt: { type: Date, default: Date.now },
  tags: [String],
}, { timestamps: true });

newsSchema.index({ title: "text", content: "text" });

export default mongoose.model("NewsArticle", newsSchema);
