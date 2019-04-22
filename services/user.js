const User = require("../models/user").User;
const utils = require("../utils");
const bcrypt = require("bcrypt");
const authService = require("../services/auth");

const create = async data => {
  let { email, type, password } = data;
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    // throw error user already exists
    throw utils.generateError("User with this email already registered.", 400);
  }

  const user = new User();
  type = type ? type : utils.roles.user;
  Object.assign(user, {
    email,
    type,
    password: bcrypt.hashSync(password, 2)
  });

  await user.save();

  return await authService.authenticate({ email, password });
};

module.exports = {
  create,
};
