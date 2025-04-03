const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { CustomError } = require("./errorHandler");

// Function to hash password
const hashPassword = async (password) => {
  const salt = bcrypt.genSalt(10);
  hashedPassword = bcrypt.hash(password, salt);

  return hashedPassword;
};

// Function to compare password and hash
const comparePassword = async (password, hash) => {
  const isMatch = bcrypt.compare(password, hash);

  return isMatch;
};

// Function for generating JWT token
const generateJWT = (user) => {
  const payload = {
    id: user.id,
    email: user.email,
    role: user.role,
  };
  const secret = process.env.JWT_SECRET;
  const options = { expireIn: "1h" };

  return jwt.sign(payload, secret, options);
};

// Function to generate Refresh Token
const generateRefreshToken = (user) => {
  const payload = { userId: user.id };
  return jwt.sign(payload, JWT_SECRET_KEY, {
    expiresIn: REFRESH_TOKEN_EXPIRATION,
  });
};

// Function to verify refresh token
const verifyRefreshToken = (token) => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return jwt.decode.userId;
  } catch (error) {
    throw new CustomError("Refresh token is invalid or expire !", 401);
  }
};

// Function to generate verification code
const generateConfirmationCode = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

module.exports = {
  hashPassword,
  comparePassword,
  generateJWT,
  generateConfirmationCode,
  generateRefreshToken,
  verifyRefreshToken
};
