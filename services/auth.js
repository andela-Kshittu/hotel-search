const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user").User;
const utils = require("../utils");

const authenticate = params => {
  return User.findOne({
    email: params.email
  }).then(user => {
    if (!user) {
      throw utils.generateError("Authentication failed. User not found.", 404);
    }

    if (!bcrypt.compareSync(params.password || "", user.password)) {
      throw errorUtil.generateError(
        "Authentication failed. Wrong password.",
        400
      );
    }

    const payload = {
      email: user.email,
      id: user.id,
      type: user.type,
      time: new Date()
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: process.env.TOKEN_EXPIRES_IN
    });
    return token;
  });
};

module.exports = {
  authenticate
};
