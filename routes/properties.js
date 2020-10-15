const express = require("express");
const router = express.Router();
const propertiesController = require("../controllers/properties");

/* GET: find properties by lat and lon. */
router.get("/", propertiesController.findProperties);

/* GET: find all bookings for specified property ID. */
router.get("/:id/bookings", propertiesController.findBookingsByPropertyId);

module.exports = router;
