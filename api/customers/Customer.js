const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
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
  mustChangePassword: {
    type: Boolean,
    default: false
  },
  addresses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Address"
    }
  ]
});

const Customer = mongoose.model("customers", customerSchema);

module.exports = Customer;
