const express = require('express');
const { createSport, getSports, getSportById } = require('../controllers/sportController');
const auth = require('../middleware/authMiddleware');
const { adminOnly } = require('../middleware/roleMiddleware');

const router = express.Router();

router.get('/', getSports);
router.get('/:id', getSportById);

router.post('/', auth, adminOnly, createSport);

module.exports = router;

