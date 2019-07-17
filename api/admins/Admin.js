const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  username: String,
  password: String,
  accessLevel: {
    type: String,
    enum: ["super-admin", "admin", "creator", "view"],
    default: "view"
  }
});

module.exports = mongoose.model("admins", adminSchema);
