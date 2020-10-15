const express = require("express");
const router = express.Router();
const bookingController = require("../controllers/booking");

/* POST: create a booking. */
router.post("/", bookingController.create);

module.exports = router;
