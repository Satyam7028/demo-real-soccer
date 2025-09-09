import { useSelector } from "react-redux";

export default function CheckoutPage() {
  const cartItems = useSelector((state) => state.cart.items);

  const total = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white p-6 shadow rounded">
      <h2 className="text-2xl font-bold mb-4">Checkout</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {cartItems.map((item) => (
            <div key={item._id} className="flex justify-between mb-2">
              <span>{item.name} x {item.qty}</span>
              <span>₹{item.price * item.qty}</span>
            </div>
          ))}
          <div className="font-bold mt-4">Total: ₹{total}</div>
          <button className="bg-blue-600 text-white px-4 py-2 rounded mt-4">Place Order</button>
        </div>
      )}
    </div>
  );
}
