const Equipment = require('../models/Equipment');
const Sport = require('../models/Sport');

async function createEquipment(req, res, next) {
  try {
    const { name, sportId, totalQuantity, image } = req.body;

    if (!name || totalQuantity == null) {
      return res
        .status(400)
        .json({ message: 'name and totalQuantity are required' });
    }

    if (sportId) {
      const sport = await Sport.findById(sportId);
      if (!sport) {
        return res.status(404).json({ message: 'Sport not found' });
      }
    }

    const equipment = await Equipment.create({
      name,
      sportId: sportId || null,
      totalQuantity,
      availableQuantity: Number(totalQuantity),
      image,
    });

    res.status(201).json(equipment);
  } catch (err) {
    next(err);
  }
}

async function getEquipment(req, res, next) {
  try {
    const equipment = await Equipment.find()
      .populate('sportId', 'name')
      .sort({ name: 1 });
    res.json(equipment);
  } catch (err) {
    next(err);
  }
}

async function updateEquipment(req, res, next) {
  try {
    const { id } = req.params;
    const updates = req.body;

    if (updates.totalQuantity != null && updates.availableQuantity == null) {
      const eq = await Equipment.findById(id);
      if (!eq) {
        return res.status(404).json({ message: 'Equipment not found' });
      }
      const diff = updates.totalQuantity - eq.totalQuantity;
      updates.availableQuantity = Math.max(0, eq.availableQuantity + diff);
    }

    const equipment = await Equipment.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });

    if (!equipment) {
      return res.status(404).json({ message: 'Equipment not found' });
    }

    res.json(equipment);
  } catch (err) {
    next(err);
  }
}

async function deleteEquipment(req, res, next) {
  try {
    const { id } = req.params;
    const equipment = await Equipment.findByIdAndDelete(id);
    if (!equipment) {
      return res.status(404).json({ message: 'Equipment not found' });
    }
    res.json({ message: 'Equipment deleted' });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  createEquipment,
  getEquipment,
  updateEquipment,
  deleteEquipment,
};

