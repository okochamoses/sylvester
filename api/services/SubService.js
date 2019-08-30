const mongoose = require("mongoose");

const subServiceSchema = new mongoose.Schema({
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

module.exports = mongoose.model("subServices", subServiceSchema);
