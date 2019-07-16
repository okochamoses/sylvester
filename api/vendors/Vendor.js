const mongoose = require("mongoose");

const vendorSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  businessName: String,
  password: String,
  username: {
    type: String,
    unique: true
  },
  email: {
    type: String,
    unique: true
  },
  phoneNumber: {
    type: String,
    unique: true
  },
  status: {
    type: Boolean,
    default: true
  },
  internal: {
    type: String,
    default: false
  },
  mustChangePassword: {
    type: Boolean,
    default: false
  },
  service: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "services"
  },
  address: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "addresses"
  }
});

const Vendor = mongoose.model("vendors", vendorSchema);

module.exports = Vendor;
