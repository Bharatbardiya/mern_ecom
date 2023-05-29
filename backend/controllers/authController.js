const crypto = require("crypto");
const User = require("../models/user");

const ErrorHandler = require("../utils/errorHandler");
const sendToken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail");

// Register a user => /api/v1/register
exports.registerUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const user = await User.create({
      name,
      email,
      password,
      avatar: {
        public_id: "avatars/kccvibpsuiusmwfepb3m",
        url: "https://res.cloudinary.com/shopit/image/upload/v1606305757/avatars/kccvibpsuiusmwfepb3m.png",
      },
    });

    sendToken(user, 200, res);
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Login User => /api/v1/login

exports.loginUser = async (req, res, next) => {
  const { email, password } = req.body;

  // check if email and password is entered by user
  if (!email || !password) {
    return next(new ErrorHandler("please enter email & password", 400));
  }

  // Finding user in database
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }

  //checks if password is correct or not
  const isPasswordMatched = await user.comparePassword(password);

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid password or Email", 401));
  }

  sendToken(user, 200, res);
};

// Forgot Password  => /api/v1/password/forgot
exports.forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    console.log(user);
    if (!user) {
      return next(new ErrorHandler("Invalid Email", 401));
    }
    const resetToken = user.getResetPasswordToken();
    // console.log(resetToken);
    await user.save({ validateBeforeSave: false });

    const resetUrl = `${req.protocol}://${req.get(
      "host"
    )}/api/v1/password/reset/${resetToken}`;

    const message = `You are receiving this email because you (or someone else) have requested the reset of the password for your account.\n\n
    Please click on the following link, or paste this into your browser to complete the process:\n
    ${resetUrl}\n
    If you did not request this, please ignore this email and your password will remain unchanged.\n`;

    await sendEmail(email, "RESET password on ShopNow", message);
    return res.status(200).json({
      success: true,
      message: `RESET Url send on your mail : ${email}`,
    });
  } catch (err) {
    return next(new ErrorHandler(err.message, 500));
  }
};

// Reset password using token => /api/v1/password/reset/:token

exports.resetPassword = async (req, res, next) => {
  try {
    const resetToken = req.params.token;
    const { password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
      return next(new ErrorHandler("Passwords do not match", 400));
    }
    // if (!resetPasswordToken) {
    //   return next(new ErrorHandler("Invalid Token", 401));
    // }
    // console.log(`token: ${resetToken}`);
    const resetPasswordToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    // console.log(`user: ${user}`);

    if (!user) {
      return next(new ErrorHandler("Invalid Token", 401));
    }

    user.password = password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    sendToken(user, 200, res);
  } catch (err) {
    return next(new ErrorHandler(err.message, 500));
  }
};

// logout the user  /api/v1/logout
exports.logoutUser = async (req, res, next) => {
  res.cookie("token", null, { expires: new Date(Date.now()), httpOnly: true });
  res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
};
