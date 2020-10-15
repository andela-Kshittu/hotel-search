const utils = require("../utils");
const bookingService = require("../services/booking");
const propertiesService = require("../services/properties");

const create = async (req, res) => {
  try {
    const {propertyId, ownerId} = req.body;

    // ensure specified property exists
    const property = await propertiesService.find(propertyId);

    if (!property) {
      return res.status(404).send({message: "Invalid ID, property not found."});
    }

    const booking = await bookingService.create({propertyId, ownerId});
    res.send(booking);
  } catch (error) {
    console.error(error);
    return utils.handleError(res, error);
  }
};

module.exports = {
  create
};
