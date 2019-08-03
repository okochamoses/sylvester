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
  price: Number,
  description: String,
  image: String
});

module.exports = mongoose.model("services", serviceSchema);
