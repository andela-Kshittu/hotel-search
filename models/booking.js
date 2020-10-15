const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema(
  {
    propertyId: {type: String, required: true},
    ownerId: {type: String, required: true},
  },
  {
    timestamps: {createdAt: "createdAt", updatedAt: "updatedAt"}
  }
);

const Booking = mongoose.model("Booking", BookingSchema);

module.exports = {Booking: Booking};
