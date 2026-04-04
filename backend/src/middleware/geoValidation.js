const { calculateDistanceInMeters } = require('../utils/distanceCalculator');

// Hardcoded college coordinates (example)
const COLLEGE_LATITUDE = 28.8784;
const COLLEGE_LONGITUDE = 77.0647;
const MAX_DISTANCE_METERS = 200;

function geoValidation(req, res, next) {
  // const { latitude, longitude } = req.body;

  // if (typeof latitude !== 'number' || typeof longitude !== 'number') {
  //   return res.status(400).json({ message: 'Latitude and longitude are required for booking' });
  // }

  // const distance = calculateDistanceInMeters(latitude, longitude, COLLEGE_LATITUDE, COLLEGE_LONGITUDE);

  // if (distance > MAX_DISTANCE_METERS) {
  //   return res
  //     .status(400)
  //     .json({ message: 'Booking allowed only within 200 meters of campus.' });
  // }

  // Attach distance info if needed later
  // req.location = {
  //   latitude,
  //   longitude,
  //   distanceFromCampus: distance,
  // };

  next();
}

module.exports = geoValidation;

