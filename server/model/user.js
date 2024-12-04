const mongoose = require("mongoose");


const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true, // Ensure email uniqueness
  },
  pass: {
    type: String,
    required: true,
  },
});

// Hash password before saving

const usermodel = mongoose.model("userdetail", userSchema);
module.exports = usermodel;
