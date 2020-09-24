const User = require('../models/UserModel');

class CreateUser {
  async findOneUser(email) {
    const user = await User.findOne({ email });

    return user;
  }

  async execute({ name, email, password, confirmPassword }) {
    if (await this.findOneUser(email))
      throw new Error('User is already in use');

    if (password !== confirmPassword)
      throw new Error('The provided password is not identical');

    await User.create({ name, email, password });

    return { success: true };
  }
}

module.exports = new CreateUser();
