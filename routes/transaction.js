const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const transactionController = require("../controllers/transaction");

/* POST: create a transaction. */
router.post("/", auth.validateToken, transactionController.create);

/* GET: Fetch all transaction. */
router.get("/", auth.validateToken, transactionController.findAll);

/* GET: Fetch a single transaction. */
router.get("/:id", auth.validateToken, transactionController.find);

/* PUT: Update a single transaction */
router.put("/:id", auth.validateToken, transactionController.update);

/* DELETE: Delete a single transaction. */
router.delete("/:id", auth.validateToken, transactionController.remove);

/* GET: Approve a single transaction. */
router.get("/:id/approve", auth.validateToken, transactionController.approve);

/* GET: Reject a single transaction. */
router.get("/:id/reject", auth.validateToken, transactionController.reject);

/* GET: Fetch status of a single transaction. */
router.get("/:id/status", auth.validateToken, transactionController.getStatus);

module.exports = router;