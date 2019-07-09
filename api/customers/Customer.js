const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
  username: String,
  email: String,
  firstName: String,
  lastName: String,
  phoneNumber: String,
  password: String
});

const Customer = mongoose.model("customers", customerSchema);

module.exports = Customer;
