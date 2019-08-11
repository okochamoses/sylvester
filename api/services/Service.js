const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: String,
  image: String,
  subServices: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "subServices"
    }
  ]
});

module.exports = mongoose.model("services", serviceSchema);
