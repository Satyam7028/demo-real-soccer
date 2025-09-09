import League from "../models/League.js";

// GET /api/leagues
export const listLeagues = async (req, res) => {
  try {
    const leagues = await League.find();
    res.json(leagues);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET /api/leagues/:id
export const getLeague = async (req, res) => {
  try {
    const league = await League.findById(req.params.id);
    if (!league) return res.status(404).json({ message: "League not found" });
    res.json(league);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST /api/leagues
export const createLeague = async (req, res) => {
  try {
    const league = await League.create(req.body);
    res.status(201).json(league);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// PUT /api/leagues/:id
export const updateLeague = async (req, res) => {
  try {
    const league = await League.findById(req.params.id);
    if (!league) return res.status(404).json({ message: "League not found" });

    Object.assign(league, req.body);
    await league.save();
    res.json(league);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE /api/leagues/:id
export const deleteLeague = async (req, res) => {
  try {
    const league = await League.findById(req.params.id);
    if (!league) return res.status(404).json({ message: "League not found" });

    await league.deleteOne();
    res.json({ message: "League deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
