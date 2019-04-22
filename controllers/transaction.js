const utils = require("../utils");
const transactionService = require("../services/transaction");

const create = async (req, res) => {
  // TODO: Payload validation
  try {
    const { value, to, expire, requireAdmin } = req.body;
    console.log("user id : " + req.user.id)
    const transaction = await transactionService.create({
      value,
      from: req.user.id,
      to,
      expire,
      requireAdmin
    });
    res.send({ data: transaction });
  } catch (error) {
    console.error(error);
    return utils.handleError(res, error);
  }
};

const findAll = async (req, res) => {
  try {
    const transactions = await transactionService.findAll();
    res.send({  data: transactions });
  } catch (error) {
    console.error(error);
    return utils.handleError(res, error);
  }
};

const find = async (req, res) => {
  try {
    const { id } = req.params;
    const transaction = await transactionService.find(id);
    res.send({  data: transaction });
  } catch (error) {
    console.error(error);
    return utils.handleError(res, error);
  }
};

const getStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const transaction = await transactionService.find(id);
    res.send({ status: transaction.state });
  } catch (error) {
    console.error(error);
    return utils.handleError(res, error);
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.params;
    const { value, requireAdmin } = req.body;
    const owner = req.user.id;
    const transaction = await transactionService.update(id, owner, {
      value,
      requireAdmin
    });
    res.send({ data: transaction });
  } catch (error) {
    console.error(error);
    return utils.handleError(res, error);
  }
};

const remove = async (req, res) => {
  try {
    const { id } = req.params;
    const owner = req.user.id;
    await transactionService.remove(id, owner);
    res.send({ message: "Transaction deleted!" });
  } catch (error) {
    console.error(error);
    return utils.handleError(res, error);
  }
};

const approve = async (req, res) => {
  try {
    const { id } = req.params;
    await transactionService.approveOrRejectRequest(id, req.user, utils.approvals.approved);
    res.send({ message: "Transaction approved!" });
  } catch (error) {
    console.error(error);
    return utils.handleError(res, error);
  }
};

const reject = async (req, res) => {
  try {
    const { id } = req.params;
    await transactionService.approveOrRejectRequest(id, req.user, utils.approvals.rejected);
    res.send({ message: "Transaction rejected!" });
  } catch (error) {
    console.error(error);
    return utils.handleError(res, error);
  }
};

module.exports = {
  create,
  findAll,
  find,
  getStatus,
  update,
  remove,
  approve,
  reject
};
