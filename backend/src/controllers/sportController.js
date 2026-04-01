const Sport = require('../models/Sport');

async function createSport(req, res, next) {
  try {
    const { name, image } = req.body;

    if (!name) {
      return res.status(400).json({ message: 'Name is required' });
    }

    const existing = await Sport.findOne({ name });
    if (existing) {
      return res.status(400).json({ message: 'Sport with this name already exists' });
    }

    const sport = await Sport.create({ name, description, image });
    res.status(201).json(sport);
  } catch (err) {
    next(err);
  }
}

async function getSports(req, res, next) {
  try {
    const sports = await Sport.find().sort({ name: 1 });
    res.json(sports);
  } catch (err) {
    next(err);
  }
}

async function getSportById(req, res, next) {
  try {
    const sport = await Sport.findById(req.params.id);
    if (!sport) {
      return res.status(404).json({ message: 'Sport not found' });
    }
    res.json(sport);
  } catch (err) {
    next(err);
  }
}

module.exports = {
  createSport,
  getSports,
  getSportById,
};

