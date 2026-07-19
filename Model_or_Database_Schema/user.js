const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minLength: 4,
      maxLength: 50,
    },
    email: {
      type: String,
      required: true,
      unqiue: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true
    },
    preferences: {
      type: [String],
      required: true
    },
  },
  { timestamps: true },
);

const User = mongoose.model("User", userSchema);

module.exports = User;
