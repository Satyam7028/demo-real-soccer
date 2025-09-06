import express from "express";
import Stripe from "stripe";

const router = express.Router();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Create Stripe Checkout Session
router.post("/create-session", async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: req.body.items, // items = array of products from frontend
      mode: "payment",
      success_url: "http://localhost:3000/success",
      cancel_url: "http://localhost:3000/cancel",
    });

    res.json({ id: session.id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

export default router;
