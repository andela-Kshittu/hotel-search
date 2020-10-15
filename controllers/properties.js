const utils = require("../utils");
const bookingService = require("../services/booking");
const propertiesService = require("../services/properties");

const findBookingsByPropertyId = async (req, res) => {
  try {
    const {id} = req.params;
    const bookings = await bookingService.find(id);
    res.send({bookings});
  } catch (error) {
    return utils.handleError(res, error);
  }
};

const findProperties = async (req, res) => {
  try {
    const {lat, lon} = req.query;
    const properties = await propertiesService.findProperties(lat, lon);
    res.send({properties});
  } catch (error) {
    return utils.handleError(res, error);
  }
}

module.exports = {
  findProperties,
  findBookingsByPropertyId
};
