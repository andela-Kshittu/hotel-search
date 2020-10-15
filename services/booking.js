const Booking = require("../models/booking").Booking;

const create = async data => {
  let booking = new Booking();
  const {ownerId, propertyId} = data;
  Object.assign(booking, {
    ownerId,
    propertyId
  });

  return await booking.save();
};

const find = async propertyId => {
  return await Booking.find({propertyId});
};

module.exports = {
  create,
  find
};
