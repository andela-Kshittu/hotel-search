const utils = require("../utils");
const jwt = require("jsonwebtoken");


const authHeaderFormat = /^(Bearer\s)[\S]+/i;

const validateToken = (req, res, next) => {
  try {
    if (!isValidAuthHeader(req.headers.authorization)) {
      return res
        .status(403)
        .send({
          success: false,
          message: "Invalid / missing authorization header."
        });
    }

    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return res
        .status(403)
        .send({ success: false, message: "No token provided." });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res
          .status(401)
          .send({ success: false, message: "Failed to authenticate token." });
      }
      req.user = decoded;
      next();
    });
  } catch (error) {
    return utils.handleError(res, error);
  }
};

const isAdmin = async (req, res, next) => {
  if (req.user.type != utils.roles.admin) {
    return res.status(403).send({ success: false, message: "Unauthorized" });
  }
  next();
};

const isValidAuthHeader = (authHeader) => {
    const result = authHeaderFormat.test(authHeader);
    return result;
}

module.exports = {
  isAdmin,
  validateToken,
  isValidAuthHeader
};
