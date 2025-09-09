import User from "../models/User.js";
import Order from "../models/Order.js";

export const getStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalOrders = await Order.countDocuments();
    const totalRevenue = await Order.aggregate([
      { $match: { status: "completed" } },
      { $group: { _id: null, total: { $sum: "$totalAmount" } } }
    ]);
    res.json({
      totalUsers,
      totalOrders,
      totalRevenue: totalRevenue[0]?.total || 0
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
