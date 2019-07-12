const mongoose = require("mongoose");
const { hash } = require("./helper");

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
  }
});

customerSchema.pre("save", function(done) {
  this.password = hash(this.password);
  done();
});

const Customer = mongoose.model("customers", customerSchema);

module.exports = Customer;
