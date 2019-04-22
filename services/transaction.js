const utils = require("../utils");
const moment = require("moment");
const approvalService = require("../services/approval");
const Transaction = require("../models/transaction").Transaction;

const create = async data => {
  let transaction = new Transaction();
  const { value, from, to, expire, requireAdmin } = data;
  Object.assign(transaction, {
    value,
    from: from,
    to: to,
    expire: moment(expire),
    requireAdmin
  });

  // Create approval requests for this transaction
  const { _id } = transaction;
  // Othe user approval request data
  const approvalRequestData = {
    from,
    approvingParty: to,
    transaction: _id,
    type: utils.roles.user
  };
  const approvalReq = await approvalService.create(approvalRequestData);
  transaction.approvers = [approvalReq._id];

  if (transaction.requireAdmin) {
    // Create a storm admin approval request data
    delete approvalRequestData.approvingParty; // any admin can approve request
    approvalRequestData.type = utils.roles.admin;
    const adminApprovalReq = await approvalService.create(approvalRequestData);
    transaction.adminApproval = adminApprovalReq._id;
  }

  // Create transaction
  return await transaction.save();
};

const findAll = async () => {
  return await Transaction.find({})
    .select("value from to expire state requireAdmin  approved")
    .populate("approvers", "approval approved")
    .populate("adminApproval", "approval approved");
};

const getAdminTransactions = async () => {
  return await Transaction.find({ requireAdmin: true })
    .select("value from to expire state requireAdmin  approved")
    .populate("approvers", "approval approved")
    .populate("adminApproval", "approval approved");
};

const find = async id => {
  return await Transaction.findById(id)
    .select("value from to expire state requireAdmin  approved")
    .populate("approvers", "approval approved")
    .populate("adminApproval", "approval approved");
};

const update = async (transactionId, owner, data) => {
  await checkOwnership(transactionId, owner);
  delete data.owner;
  delete data.id;
  return await Transaction.update(
    { _id: transactionId, from: owner },
    { $set: data },
    { new: true }
  );
};

const remove = async (transactionId, owner) => {
  await checkOwnership(transactionId, owner);
  return await Transaction.remove({ _id: transactionId, from: owner });
};

const approveOrRejectRequest = async (transactionId, approvingUser, state) => {
  const transaction = await checkEnityExistsAndActive(transactionId);
  await approvalService.approveOrRejectRequest(
    transaction._id,
    approvingUser,
    state,
    utils.roles.user
  );
  return await updateState(transaction);
};

const checkOwnership = async (id, owner) => {
  const transaction = await checkEnityExistsAndActive(id);
  console.log("transaction is 2 : " + transaction);
  console.log("owner is : " + owner);
  if (!transaction || transaction.from !== owner) {
    let err = new Error("Transaction not found");
    err.status = 404; // Throw 404, so the requesting user has not idea if this record exists or not
    throw err;
  }
};

const checkEnityExistsAndActive = async id => {
  console.log("id is : " + id);
  const transaction = await Transaction.findOne({ _id: id });
  // Ensure transaction exists
  console.log("transaction is 1 : " + transaction);
  if (!transaction) {
    let err = new Error("Transaction not found");
    err.status = 404;
    throw err;
  }
  // Ensure trnasaction is active
  if (moment(transaction.expire).isBefore(moment(), "minute")) {
    let err = new Error("Expired transaction can not be updated");
    err.status = 400;
    throw err;
  }
  return transaction;
};

const updateState = async transaction => {
  // Update transaction state after an approval request update
  const state = await approvalService.getTransactionState(transaction._id);
  const data = { state };
  const { _id, from } = transaction;
  if (state === utils.states.completed) {
    data.approved = true;
  }
  return await Transaction.update({ _id, from }, { $set: data }, { new: true });
};

module.exports = {
  create,
  findAll,
  find,
  update,
  remove,
  approveOrRejectRequest,
  updateState,
  getAdminTransactions
};
