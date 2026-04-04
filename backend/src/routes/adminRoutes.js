const express = require('express');
const { getStats } = require('../controllers/adminController');
const auth = require('../middleware/authMiddleware');
const { adminOnly } = require('../middleware/roleMiddleware');

const router = express.Router();

router.get('/stats', auth, adminOnly, getStats);

module.exports = router;
