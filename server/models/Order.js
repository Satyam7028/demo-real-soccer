import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  orderItems: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
      name: { type: String, required: true },
      qty: { type: Number, required: true },
      price: { type: Number, required: true },
      image: String,
    }
  ],
  shippingAddress: {
    address: { type: String, required: true },
    city: String,
    postalCode: String,
    country: String,
  },
  paymentMethod: { type: String, required: true },
  paymentResult: {
    id: String,
    status: String,
    update_time: String,
    email_address: String,
  },
  taxPrice: { type: Number, default: 0.0 },
  shippingPrice: { type: Number, default: 0.0 },
  totalPrice: { type: Number, required: true },
  isPaid: { type: Boolean, default: false },
  paidAt: Date,
  isDelivered: { type: Boolean, default: false },
  deliveredAt: Date,
}, { timestamps: true });

export default mongoose.model("Order", orderSchema);
