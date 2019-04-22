const mongoose = require("mongoose");

const TransactionSchema = new mongoose.Schema(
  {
    value: { type: Number, required: true },
    from: { type: mongoose.Schema.Types.ObjectId, required: true },
    to: { type: mongoose.Schema.Types.ObjectId, required: true },
    expire: { type: Date, required: true },
    state: {
      type: String,
      enum: ["new", "pending", "denied", "completed"],
      default: "new"
    },
    requireAdmin: { type: Boolean, required: true },
    approved: { type: Boolean, required: true, default: false },
    approvers: [{ type: mongoose.Schema.Types.ObjectId, ref: "Approval" }],
    adminApproval: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Approval"
    }
  },
  {
    timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" }
  }
);

const Transaction = mongoose.model("Transaction", TransactionSchema);

module.exports = { Transaction };
