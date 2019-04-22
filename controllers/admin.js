const utils = require("../utils");
const transactionService = require("../services/transaction");
const approvalService = require("../services/approval");

const approve = async (req, res) => {
  try {
    const { id } = req.params;
    await approveOrRejectRequest(id, req.user, utils.approvals.approved);
    res.send({ message: "Transaction approved!" });
  } catch (error) {
    console.error(error);
    return utils.handleError(res, error);
  }
};

const reject = async (req, res) => {
  try {
    const { id } = req.params;
    await approveOrRejectRequest(id, req.user, utils.approvals.rejected);
    res.send({ message: "Transaction rejected!" });
  } catch (error) {
    console.error(error);
    return utils.handleError(res, error);
  }
};

const approveOrRejectRequest = async (transactionId, approvingUser, state) => {
  const transaction = await transactionService.find(transactionId);
  await approvalService.approveOrRejectRequest(
    transaction._id,
    approvingUser,
    state,
    utils.roles.admin
  );
  return await transactionService.updateState(transaction);
};

const getTransactions = async (req, res) => {
  try {
    const transactions = await transactionService.getAdminTransactions();
    res.send({ data: transactions });
  } catch (error) {
    console.error(error);
    return utils.handleError(res, error);
  }
};

module.exports = {
  approve,
  reject,
  getTransactions
};
