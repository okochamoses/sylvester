const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
  state: String,
  address: String,
  city: String,
  lga: String,
  zip: String,
  landmark: String,
  longitude: String,
  latitude: String,
  default: { Boolean, default: false }
});

module.exports = mongoose.model("address", addressSchema);
