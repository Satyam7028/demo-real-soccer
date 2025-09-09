import User from "../models/User.js";

export const getProfile = async (req, res) => {
  // req.user populated by protect middleware
  res.json(req.user);
};

export const updateProfile = async (req, res) => {
  const user = await User.findById(req.user._id);
  if (!user) return res.status(404).json({ message: "User not found" });

  user.name = req.body.name ?? user.name;
  user.email = req.body.email ?? user.email;
  if (req.body.password) user.password = req.body.password; // pre-save hashes it

  await user.save();
  // return new user + token
  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
  res.json({ _id: user._id, name: user.name, email: user.email, role: user.role, token });
};

export const listUsers = async (req, res) => {
  const users = await User.find().select("-password");
  res.json(users);
};

export const getUserById = async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");
  if (!user) return res.status(404).json({ message: "User not found" });
  res.json(user);
};

export const updateUserByAdmin = async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ message: "User not found" });
  user.name = req.body.name ?? user.name;
  user.email = req.body.email ?? user.email;
  if (req.body.role) user.role = req.body.role;
  await user.save();
  res.json({ message: "User updated" });
};

export const deleteUser = async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: "User removed" });
};
