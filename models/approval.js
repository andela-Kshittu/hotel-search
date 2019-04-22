const mongoose = require("mongoose");

const ApprovalSchema = new mongoose.Schema(
  {
    type: { type: String, enum: ["admin", "user" ], default: "user" },
    from: {type:mongoose.Schema.Types.ObjectId, required: true },
    approvingParty: { type:mongoose.Schema.Types.ObjectId }, // this will be null for request of type Admin until a Storm admin attends to this request
    transaction: {type:mongoose.Schema.Types.ObjectId, required: true },
    approval: { type: String, enum: ["pending", "approved", "rejected" ], default: "pending" },
    approved: { type: Boolean, required: true, default: false },
  },
  {
    timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" }
  }
);

const Approval = mongoose.model("Approval", ApprovalSchema);

module.exports = { Approval };