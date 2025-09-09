import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserOrders } from "./orderSlice";

const OrderHistoryPage = () => {
  const dispatch = useDispatch();
  const { orders, loading, error } = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(fetchUserOrders());
  }, [dispatch]);

  return (
    <div className="max-w-4xl mx-auto mt-10 p-4">
      <h2 className="text-2xl font-bold mb-6">Order History</h2>
      {loading && <p>Loading orders...</p>}
      {error && <p className="text-red-600">Error: {error}</p>}
      {!loading && !error && orders.length === 0 && <p>No orders found.</p>}
      {!loading && !error && orders.length > 0 && (
        <table className="min-w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-4 py-2">Order ID</th>
              <th className="border px-4 py-2">Date</th>
              <th className="border px-4 py-2">Total</th>
              <th className="border px-4 py-2">Paid</th>
              <th className="border px-4 py-2">Delivered</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td className="border px-4 py-2">{order._id}</td>
                <td className="border px-4 py-2">{new Date(order.createdAt).toLocaleDateString()}</td>
                <td className="border px-4 py-2">${order.totalPrice.toFixed(2)}</td>
                <td className="border px-4 py-2">{order.isPaid ? "Yes" : "No"}</td>
                <td className="border px-4 py-2">{order.isDelivered ? "Yes" : "No"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default OrderHistoryPage;
