const Booking = require('../models/Booking');
const Equipment = require('../models/Equipment');
const Sport = require('../models/Sport');
const { ALLOWED_SLOTS } = require('../middleware/timeValidation');

async function createBooking(req, res, next) {
  try {
    const { sportId, equipmentId, date, timeSlot, latitude, longitude } = req.body;

    if (!equipmentId || !date || !timeSlot) {
      return res
        .status(400)
        .json({ message: 'equipmentId, date and timeSlot are required' });
    }

    if (!ALLOWED_SLOTS.includes(timeSlot)) {
      return res.status(400).json({ message: 'Invalid time slot selected' });
    }

    if (sportId) {
      const sport = await Sport.findById(sportId);
      if (!sport) {
        return res.status(404).json({ message: 'Sport not found' });
      }
    }

    // Block only if the slot is already confirmed (issued) for this sport (if sport exists)
    const issuedBooking = await Booking.findOne({
      ...(sportId ? { sportId } : { equipmentId }),
      date,
      timeSlot,
      status: 'issued',
    });

    if (issuedBooking) {
      const targetType = sportId ? 'sport' : 'equipment';
      return res.status(409).json({
        message: `This time slot is already confirmed for this ${targetType}. Please choose a different slot or ${targetType}.`,
      });
    }

    const booking = await Booking.create({
      userId: req.user._id,
      sportId,
      equipmentId,
      date,
      timeSlot,
      status: 'booked',
      latitude,
      longitude,
    });

    res.status(201).json(booking);
  } catch (err) {
    next(err);
  }
}

async function issueBooking(req, res, next) {
  try {
    const { id } = req.params;
    const booking = await Booking.findById(id);

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    if (booking.status !== 'booked') {
      return res.status(400).json({ message: 'Only booked requests can be issued' });
    }

    const equipment = await Equipment.findById(booking.equipmentId);
    if (!equipment) {
      return res.status(404).json({ message: 'Equipment not found' });
    }

    if (equipment.availableQuantity <= 0) {
      return res.status(400).json({ message: 'Equipment not available to issue' });
    }

    equipment.availableQuantity -= 1;
    await equipment.save();

    booking.status = 'issued';
    await booking.save();

    // Auto-cancel all other pending bookings for the same sport + date + timeSlot
    await Booking.updateMany(
      {
        _id: { $ne: booking._id },
        sportId: booking.sportId,
        date: booking.date,
        timeSlot: booking.timeSlot,
        status: 'booked',
      },
      { $set: { status: 'cancelled' } }
    );

    res.json(booking);
  } catch (err) {
    next(err);
  }
}

async function cancelBooking(req, res, next) {
  try {
    const { id } = req.params;
    const booking = await Booking.findById(id);

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    if (booking.userId.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not allowed to cancel this booking' });
    }

    if (booking.status === 'cancelled') {
      return res.status(400).json({ message: 'Booking is already cancelled' });
    }

    const equipment = await Equipment.findById(booking.equipmentId);
    if (equipment) {
      equipment.availableQuantity += 1;
      await equipment.save();
    }

    booking.status = 'cancelled';
    await booking.save();

    res.json(booking);
  } catch (err) {
    next(err);
  }
}

async function returnBooking(req, res, next) {
  try {
    const { id } = req.params;
    const booking = await Booking.findById(id);

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    if (booking.status !== 'issued') {
      return res.status(400).json({ message: 'Only issued bookings can be returned' });
    }

    const equipment = await Equipment.findById(booking.equipmentId);
    if (equipment) {
      equipment.availableQuantity += 1;
      await equipment.save();
    }

    booking.status = 'returned';
    await booking.save();

    res.json(booking);
  } catch (err) {
    next(err);
  }
}

async function getMyBookings(req, res, next) {
  try {
    const bookings = await Booking.find({ userId: req.user._id })
      .populate('sportId', 'name')
      .populate('equipmentId', 'name')
      .sort({ createdAt: -1 });

    res.json(bookings);
  } catch (err) {
    next(err);
  }
}

async function getAllBookings(req, res, next) {
  try {
    const bookings = await Booking.find()
      .populate('userId', 'name email role')
      .populate('sportId', 'name')
      .populate('equipmentId', 'name')
      .sort({ createdAt: -1 });

    res.json(bookings);
  } catch (err) {
    next(err);
  }
}

module.exports = {
  createBooking,
  cancelBooking,
  returnBooking,
  getMyBookings,
  getAllBookings,
  issueBooking,
};

