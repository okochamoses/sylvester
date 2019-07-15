const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  fixed: {
    type: Boolean,
    default: true
  },
  price: {
    type: Number
  }
});

module.exports = mongoose.model("services", serviceSchema);
