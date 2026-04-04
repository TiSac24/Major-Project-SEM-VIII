const Booking = require('../models/Booking');
const Equipment = require('../models/Equipment');
const User = require('../models/User');

async function getStats(req, res, next) {
  try {
    const totalStudents = await User.countDocuments({ role: 'student' });
    const totalEquipment = await Equipment.countDocuments();
    const activeBookings = await Booking.countDocuments({ status: 'issued' });
    
    const equipmentData = await Equipment.find({});
    const availableUnits = equipmentData.reduce((acc, curr) => acc + (curr.availableQuantity || 0), 0);

    res.json({
      totalStudents,
      totalEquipment,
      activeBookings,
      availableUnits,
    });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getStats,
};
