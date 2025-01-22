// models/User.js
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    lowercase: true,
    required: [true, "can't be blank"],
    unique: true,
    index: true,
  },
  email: {
    type: String,
    lowercase: true,
    required: [true, "can't be blank"],
    unique: true,
    index: true,
  },
  password: {
    type: String,
    unique: true,
    index: true,
  },
  hash: String,
  salt: String,
});

module.exports = mongoose.model("User", UserSchema);
