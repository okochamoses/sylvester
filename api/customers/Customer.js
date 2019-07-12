const mongoose = require("mongoose");
const { hash } = require("./helper");

const customerSchema = new mongoose.Schema({
  username: String,
  email: String,
  firstName: String,
  lastName: String,
  phoneNumber: String,
  password: String
});

customerSchema.pre("save", function(done) {
  this.password = hash(this.password);
  done();
});

const Customer = mongoose.model("customers", customerSchema);

module.exports = Customer;
