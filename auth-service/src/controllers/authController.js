const { CustomError } = require("../utils/errorHandler");
const { UserService } = require("../services/userService");
const {
  comparePassword,
  generateJWT,
  generateRefreshToken,
  verifyRefreshToken,
} = require("../utils/authUtils");

class AuthController {
  /**
   * Register new user
   */
  async register(req, res) {
    const { email, password, role } = req.body;

    // Check if email is already used
    const existingUser = await UserService.findUserByEmail(email);
    if (existingUser) throw new CustomError("Email already used !", 400);

    // Create user in database
    const user = await UserService.createUser({ email, password, role });

    // Generate JWT Token
    const token = generateJWT(user);
    const refreshToken = generateRefreshToken(user);

    res.status(201).json({
      message: "User creat successfully !",
      token,
      refreshToken,
    });
  }

  /**
   * Login new user
   */

  async login(req, res) {
    const { email, password } = req.body;

    // Check if user existe or not
    const user = await UserService.findUserByEmail(email);
    if (!user) throw new CustomError("User not found !", 404);

    // Check if password is correct
    const isPasswordCorrect = await comparePassword(password, user.password);
    if (!isPasswordCorrect)
      throw new CustomError("Password is not correct !", 401);

    // Generate JWT token and refresh Token
    const token = generateJWT(user);
    const refreshToken = generateRefreshToken(user);

    // Return value
    res.status(200).json({
      message: "User is now logIn !",
      token,
      refreshToken,
    });
  }

  /**
   * Refresh Token with JWT
   */

  async refreshToken(req, res) {
    const { refreshToken } = req.body;

    // Check if refresh token is there
    if (!refreshToken)
      throw new CustomError("Refresh token is required !", 400);

    // Verify refresh token
    const userId = await verifyRefreshToken(refreshToken);
    const user = await UserService.findUserById(userId);

    // Generate new token
    const token = generateJWT(user);
    const newRefreshToken = generateRefreshToken(user);

    res.status(200).json({
      message: "Token refresh successfully !",
      token,
      refreshToken: newRefreshToken,
    });
  }

  /**
   * Logout user
   */
  async logout(req, res) {
    res.status(200).json({ message: "User disconnected successfully !" });
  }
}

module.exports = new AuthController();
