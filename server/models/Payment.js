import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
  order: { type: mongoose.Schema.Types.ObjectId, ref: "Order", required: true },
  paymentMethod: { type: String, required: true },
  paymentResult: {
    id: String,
    status: String,
    update_time: String,
    email_address: String,
  },
  amount: { type: Number, required: true },
  currency: { type: String, default: "USD" },
  paidAt: { type: Date, default: Date.now },
}, { timestamps: true });

export default mongoose.model("Payment", paymentSchema);
