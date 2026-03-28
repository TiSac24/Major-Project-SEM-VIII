const express = require('express');
const {
  createEquipment,
  getEquipment,
  updateEquipment,
  deleteEquipment,
} = require('../controllers/equipmentController');
const auth = require('../middleware/authMiddleware');
const { adminOnly } = require('../middleware/roleMiddleware');

const router = express.Router();

router.get('/', getEquipment);

router.post('/', auth, adminOnly, createEquipment);
router.put('/:id', auth, adminOnly, updateEquipment);
router.delete('/:id', auth, adminOnly, deleteEquipment);

module.exports = router;

