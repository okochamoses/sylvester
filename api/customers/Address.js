const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
  state: String,
  address: String,
  zip: String,
  landmark: String,
  default: { Boolean, default: false }
});

module.exports = addressSchema;
