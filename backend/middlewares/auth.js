// checks if user is authenticated or not
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const ErrorHandler = require("../utils/errorHandler");

module.exports.isAuthenticatedUser = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    // console.log(token);
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "You are not authenticated",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decoded.id);

    next();

    // slkdf
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: "token nhi h " + err.message,
    });
  }
};

exports.authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      next(
        new ErrorHandler(`Role (${req.user.role}) can't access this page`, 403)
      );
    }
    next();
  };
};
