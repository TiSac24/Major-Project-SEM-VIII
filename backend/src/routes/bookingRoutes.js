const express = require('express');
const {
  createBooking,
  cancelBooking,
  returnBooking,
  getMyBookings,
  getAllBookings,
  issueBooking,
  getBlockedSlots,
} = require('../controllers/bookingController');
const auth = require('../middleware/authMiddleware');
const { adminOnly, studentOnly } = require('../middleware/roleMiddleware');
const { timeValidation } = require('../middleware/timeValidation');
const geoValidation = require('../middleware/geoValidation');

const router = express.Router();

// Get blocked slots for a date/time
router.get('/blocked-slots', auth, getBlockedSlots);

// Student creates booking
router.post('/', auth, studentOnly, timeValidation, geoValidation, createBooking);

// Student cancels their own booking
router.patch('/:id/cancel', auth, cancelBooking);

// Admin issues equipment for a booking
router.patch('/:id/issue', auth, adminOnly, issueBooking);

// Admin marks equipment as returned
router.patch('/:id/return', auth, adminOnly, returnBooking);

// Student: my bookings
router.get('/me', auth, studentOnly, getMyBookings);

// Admin: all bookings
router.get('/', auth, adminOnly, getAllBookings);

module.exports = router;

