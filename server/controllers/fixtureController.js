import Fixture from "../models/Fixture.js";

// GET /api/fixtures
export const listFixtures = async (req, res) => {
  try {
    const filters = {};
    if (req.query.league) filters.league = req.query.league;
    if (req.query.team) filters.$or = [{ homeTeam: req.query.team }, { awayTeam: req.query.team }];
    if (req.query.date) filters.date = req.query.date;

    const fixtures = await Fixture.find(filters);
    res.json(fixtures);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET /api/fixtures/:id
export const getFixture = async (req, res) => {
  try {
    const fixture = await Fixture.findById(req.params.id);
    if (!fixture) return res.status(404).json({ message: "Fixture not found" });
    res.json(fixture);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST /api/fixtures (Admin)
export const createFixture = async (req, res) => {
  try {
    const fixture = await Fixture.create(req.body);
    res.status(201).json(fixture);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// PUT /api/fixtures/:id (Admin)
export const updateFixture = async (req, res) => {
  try {
    const fixture = await Fixture.findById(req.params.id);
    if (!fixture) return res.status(404).json({ message: "Fixture not found" });

    Object.assign(fixture, req.body);
    await fixture.save();
    res.json(fixture);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE /api/fixtures/:id (Admin)
export const deleteFixture = async (req, res) => {
  try {
    const fixture = await Fixture.findById(req.params.id);
    if (!fixture) return res.status(404).json({ message: "Fixture not found" });

    await fixture.deleteOne();
    res.json({ message: "Fixture deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
