const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const userController = require("../controllers/user");

/* POST: create a user. */
router.post("/", userController.create);

/* POST: create a user. */
router.post("/login", userController.login);

/* GET: Number of open request for current user. */
router.get("/me/requests", auth.validateToken, userController.getOpenRequestCountForUser);

/* GET: Number of open request for a given user. */
router.get("/:id/requests", auth.validateToken, userController.getOpenRequestCountForUser);

module.exports = router;