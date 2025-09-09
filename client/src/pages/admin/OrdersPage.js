import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllOrders, updateOrderStatus, deleteOrder } from '../../features/orders/orderSlice';
import { notifySuccess, notifyError } from '../../utils/toast';

const OrdersPage = () => {
  const dispatch = useDispatch();
  const { items: orders, loading, error } = useSelector(state => state.orders);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    dispatch(fetchAllOrders());
  }, [dispatch]);

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await dispatch(updateOrderStatus({ id: orderId, status: newStatus })).unwrap();
      notifySuccess('Order status updated successfully');
    } catch (err) {
      notifyError(err.message || 'Failed to update status');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this order?')) {
      try {
        await dispatch(deleteOrder(id)).unwrap();
        notifySuccess('Order deleted successfully');
      } catch (err) {
        notifyError(err.message || 'Delete failed');
      }
    }
  };

  const viewOrderDetails = (order) => {
    setSelectedOrder(order);
  };

  const closeModal = () => {
    setSelectedOrder(null);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Orders Management</h1>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {orders.map((order) => (
              <tr key={order._id}>
                <td className="px-6 py-4 whitespace-nowrap">{order._id}</td>
                <td className="px-6 py-4 whitespace-nowrap">{order.user?.name || 'N/A'}</td>
                <td className="px-6 py-4 whitespace-nowrap">${order.totalPrice}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <select
                    value={order.status}
                    onChange={(e) => handleStatusChange(order._id, e.target.value)}
                    className="border rounded px-2 py-1"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Processing">Processing</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{new Date(order.createdAt).toLocaleDateString()}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => viewOrderDetails(order)}
                    className="text-blue-600 hover:text-blue-900 mr-2"
                  >
                    View
                  </button>
                  <button
                    onClick={() => handleDelete(order._id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedOrder && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
          <div className="relative top-20 mx-auto p-5 border w-11/12 max-w-4xl shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Order Details</h3>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <h4 className="font-semibold">Order ID:</h4>
                  <p>{selectedOrder._id}</p>
                </div>
                <div>
                  <h4 className="font-semibold">User:</h4>
                  <p>{selectedOrder.user?.name || 'N/A'}</p>
                </div>
                <div>
                  <h4 className="font-semibold">Total:</h4>
                  <p>${selectedOrder.totalPrice}</p>
                </div>
                <div>
                  <h4 className="font-semibold">Status:</h4>
                  <p>{selectedOrder.status}</p>
                </div>
                <div>
                  <h4 className="font-semibold">Date:</h4>
                  <p>{new Date(selectedOrder.createdAt).toLocaleString()}</p>
                </div>
                <div>
                  <h4 className="font-semibold">Payment Method:</h4>
                  <p>{selectedOrder.paymentMethod}</p>
                </div>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Items:</h4>
                <div className="bg-gray-50 p-4 rounded">
                  {selectedOrder.orderItems?.map((item, index) => (
                    <div key={index} className="flex justify-between mb-2">
                      <span>{item.name} (x{item.qty})</span>
                      <span>${item.price * item.qty}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex justify-end mt-4">
                <button
                  onClick={closeModal}
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrdersPage;
