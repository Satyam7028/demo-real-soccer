import { useDispatch, useSelector } from "react-redux";
import { removeFromCart, updateQty, clearCart } from "./cartSlice";
import { Link } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";

// 🔹 Initialize Stripe with your publishable key
const stripePromise = loadStripe("pk_test_51S4LfER4fPQV782qiJwtJgx9nbghWttVPUPoHwWurYYkEBCR9Jt44pQuVykNrwiFhYomxbZR6p3pnbClZJz8Vc7D00F4U1y4J6"); 
// Replace with your real publishable key from Stripe Dashboard

export default function CartPage() {
  const { items } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const total = items.reduce((sum, i) => sum + i.price * i.qty, 0);

  // 🟢 Stripe Checkout Handler
  const handleCheckout = async () => {
    const stripe = await stripePromise;

    const { data } = await axios.post(
      "http://localhost:5001/api/stripe/create-session",
      {
        items: items.map((i) => ({
          price_data: {
            currency: "inr",
            product_data: { name: i.name },
            unit_amount: i.price * 100, // Stripe expects amount in cents/paise
          },
          quantity: i.qty,
        })),
      }
    );

    await stripe.redirectToCheckout({ sessionId: data.id });
  };

  // 🟡 If cart is empty
  if (items.length === 0) {
    return (
      <div className="text-center mt-20">
        <h2 className="text-xl mb-4">🛒 Your cart is empty</h2>
        <Link to="/" className="text-blue-600 underline">
          Go Shopping
        </Link>
      </div>
    );
  }

  // 🟢 Cart with items
  return (
    <div className="max-w-4xl mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-6">🛒 Your Cart</h2>
      <div className="bg-white shadow p-6 rounded">
        {items.map((item) => (
          <div
            key={item._id}
            className="flex items-center justify-between mb-4"
          >
            <div className="flex items-center">
              <img
                src={item.image}
                alt={item.name}
                className="h-16 w-16 object-cover mr-4 rounded"
              />
              <div>
                <h3 className="font-bold">{item.name}</h3>
                <p>₹{item.price}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="number"
                min="1"
                value={item.qty}
                onChange={(e) =>
                  dispatch(
                    updateQty({ id: item._id, qty: Number(e.target.value) })
                  )
                }
                className="border w-16 text-center rounded"
              />
              <button
                onClick={() => dispatch(removeFromCart(item._id))}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                Remove
              </button>
            </div>
          </div>
        ))}

        {/* 🟢 Footer Section */}
        <div className="flex justify-between items-center mt-6 border-t pt-4">
          <h3 className="text-lg font-bold">Total: ₹{total}</h3>
          <div>
            <button
              onClick={() => dispatch(clearCart())}
              className="bg-gray-500 text-white px-4 py-2 rounded mr-3"
            >
              Clear Cart
            </button>
            <button
              onClick={handleCheckout}
              className="bg-purple-600 text-white px-4 py-2 rounded"
            >
              Pay with Stripe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
