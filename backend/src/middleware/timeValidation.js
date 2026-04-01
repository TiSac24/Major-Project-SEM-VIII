const ALLOWED_SLOTS = [
  '10:00-10:50',
  '11:00-11:50',
  '12:00-12:50',
  '13:00-13:50',
  '14:00-14:50',
  '15:00-15:50',
];

function isWithinAllowedWindow(date) {
  const hour = date.getHours();
  // 10:00 (10) inclusive to 16:00 (4PM) exclusive
  return hour >= 10 && hour < 16;
}

function timeValidation(req, res, next) {
  const { timeSlot } = req.body;

  if (!timeSlot) {
    return res.status(400).json({ message: 'timeSlot is required' });
  }

  if (!ALLOWED_SLOTS.includes(timeSlot)) {
    return res.status(400).json({ message: 'Invalid time slot selected' });
  }

  // const now = new Date();

  // if (!isWithinAllowedWindow(now)) {
  //   return res.status(400).json({ message: 'Booking is allowed only between 10:00 AM and 4:00 PM' });
  // }

  next();
}

module.exports = {
  timeValidation,
  ALLOWED_SLOTS,
};

