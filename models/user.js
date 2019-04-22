const mongoose = require("mongoose");
const validator = require('validator');

const UserSchema = new mongoose.Schema(
  {
    type: { type: String, enum: ["admin", "user"], default: "user" },
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true,
        validate: { validator: validator.isEmail, message: '{VALUE} email is not valid' },
      },
    password: {
        type: String, required: true
    }
  },
  {
    timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" }
  }
);

const User = mongoose.model("User", UserSchema);

module.exports = { User };