const express = require("express");
const router = express.Router();
const adminController = require("../controllers/admin");
const auth = require("../middlewares/auth");

/* GET: Approve a single transaction. */
router.get("/transactions", auth.validateToken, auth.isAdmin, adminController.getTransactions);

/* GET: Approve a single transaction. */
router.get("/transactions/:id/approve", auth.validateToken, auth.isAdmin, adminController.approve);

/* GET: Reject a single transaction. */
router.get("/transactions/:id/reject", auth.validateToken, auth.isAdmin, adminController.reject);

module.exports = router;