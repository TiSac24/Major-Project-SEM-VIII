const mongoose = require('mongoose');

const equipmentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    sportId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Sport',
      required: false,
    },
    image: {
      type: String,
      trim: true,
    },
    totalQuantity: {
      type: Number,
      required: true,
      min: 0,
    },
    availableQuantity: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  { timestamps: true }
);

const Equipment = mongoose.model('Equipment', equipmentSchema);

module.exports = Equipment;

