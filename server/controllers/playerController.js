import Player from "../models/Player.js";

export const listPlayers = async (req, res) => {
  try {
    const filter = {};
    if (req.query.team) filter.team = req.query.team;
    if (req.query.q) filter.name = { $regex: req.query.q, $options: "i" };

    const players = await Player.find(filter);
    res.json(players);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getPlayer = async (req, res) => {
  try {
    const player = await Player.findById(req.params.id);
    if (!player) return res.status(404).json({ message: "Player not found" });
    res.json(player);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const createPlayer = async (req, res) => {
  try {
    const player = await Player.create(req.body);
    res.status(201).json(player);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updatePlayer = async (req, res) => {
  try {
    const player = await Player.findById(req.params.id);
    if (!player) return res.status(404).json({ message: "Player not found" });

    Object.assign(player, req.body);
    await player.save();
    res.json(player);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deletePlayer = async (req, res) => {
  try {
    const player = await Player.findById(req.params.id);
    if (!player) return res.status(404).json({ message: "Player not found" });

    await player.deleteOne();
    res.json({ message: "Player deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET /api/players/topscorers
export const getTopScorers = async (req, res) => {
  try {
    const top = await Player.find().sort({ "stats.goals": -1 }).limit(10);
    res.json(top);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
