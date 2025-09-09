import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from '../../features/users/userSlice';
import { fetchPlayers } from '../../features/players/playerSlice';
import { fetchProducts } from '../../features/products/productSlice';
import { fetchAllOrders } from '../../features/orders/orderSlice';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const { items: users } = useSelector(state => state.users);
  const { items: players } = useSelector(state => state.players);
  const { items: products } = useSelector(state => state.products);
  const { items: orders } = useSelector(state => state.orders);

  useEffect(() => {
    dispatch(fetchUsers());
    dispatch(fetchPlayers());
    dispatch(fetchProducts());
    dispatch(fetchAllOrders());
  }, [dispatch]);

  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-blue-600">{users.length}</h2>
          <p className="text-gray-600">Total Users</p>
          <Link to="/admin/users" className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Manage Users
          </Link>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-green-600">{players.length}</h2>
          <p className="text-gray-600">Total Players</p>
          <Link to="/admin/players" className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Manage Players
          </Link>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-purple-600">{products.length}</h2>
          <p className="text-gray-600">Total Products</p>
          <Link to="/admin/products" className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Manage Products
          </Link>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-red-600">${totalRevenue.toFixed(2)}</h2>
          <p className="text-gray-600">Total Revenue</p>
          <Link to="/admin/orders" className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Manage Orders
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">Leagues</h2>
          <p className="text-gray-600">Manage football leagues</p>
          <Link to="/admin/leagues" className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            View Leagues
          </Link>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">Fixtures</h2>
          <p className="text-gray-600">Manage match fixtures</p>
          <Link to="/admin/fixtures" className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            View Fixtures
          </Link>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">News</h2>
          <p className="text-gray-600">Manage news articles</p>
          <Link to="/admin/news" className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            View News
          </Link>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">Orders</h2>
          <p className="text-gray-600">View and manage orders</p>
          <Link to="/admin/orders" className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            View Orders
          </Link>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">Reports</h2>
          <p className="text-gray-600">View analytics and reports</p>
          <Link to="/admin/reports" className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            View Reports
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
