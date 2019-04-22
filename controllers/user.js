const utils = require("../utils");
const userService = require("../services/user");
const authService = require("../services/auth");
const approvalService = require("../services/approval");

const create = async (req, res) => {
  try {
    //TODO: Payload validation
    const { email, type, password } = req.body;
    const user = {
      email,
      password,
      type
    };

    const token = await userService.create(user);

    res.send({
      success: true,
      message: "User created successfully",
      token
    });
  } catch (error) {
    console.error(error);
    return utils.handleError(res, error);
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const token = await authService.authenticate({ email, password });
    res.send({ token });
  } catch (error) {
    console.error(error);
    return utils.handleError(res, error);
  }
};

const getOpenRequestCountForUser = async (req, res) => {
    try {
        const id = req.params.id || req.user.id
        const requests = await approvalService.getOpenRequestCountForUser(id);
        res.send({ requests });
      } catch (error) {
        console.error(error);
        return utils.handleError(res, error);
      }
}

module.exports = {
  create,
  login,
  getOpenRequestCountForUser
};
