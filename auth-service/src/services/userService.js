const { User } = require("../../models/user.model");
const { hashPassword } = require("../utils/authUtils");
const { CustomError } = require("../utils/errorHandler");

class UserService {
  /**
   * find user by id
   */
  async findUserById(userId) {
    const user = await User.findByPk(userId);
    if (!user) throw new CustomError("Utilisateur non trouvé !", 404);

    return user;
  }
  /**
   * Create new user
   */

  async createUser(userData) {
    const hashedPassword = await hashPassword(userData.password);
    const user = await User.create({
      email: userData.email,
      password: hashedPassword,
      role: userData.role || "user",
    });

    return user;
  }

  /**
   * Find user by email
   */
  async findUserByEmail(email) {
    const user = await User.findOne({ where: { email } });
    if (!user) throw new CustomError("Utilisateur non trouvé !", 404);

    return user;
  }

  /**
   * Update user infos
   */
  async updateUser(userId, updatedData) {
    const user = await this.findUserById(userId);
    if (updatedData.password) {
      updatedData.password = await hashPassword(updatedData.password);
    }

    await user.update(updatedData);
    return user;
  }

  /**
   * Check if user is admin
   */
  async isAdmin(userId) {
    const user = await this.findUserById(userId);
    return user.role === "admin";
  }

  /**
   * Delete user
   */
  async deleteUser(userId) {
    const user = await this.findUserById(userId);
    await user.destroy();
    return { message: "User deleted successfully !" };
  }

  /**
   * Change user role
   */
  async changeUserRole(userId, newRole) {
    const user = await this.findUserById(userId);
    if (!["user", "admin"].includes(newRole)) {
      throw new CustomError("Invalid role !", 400);
    }

    await user.update({ role: newRole });
    return user;
  }
}

module.exports = new UserService();
