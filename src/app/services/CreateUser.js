const User = require('../models/UserModel');
const FindOneUser = require('./FindOneUser');

class CreateUser {
  async execute({ name, email, password, confirmPassword }) {
    if (await FindOneUser.execute(email))
      throw new Error('User is already in use');

    if (password !== confirmPassword)
      throw new Error('The provided password is not identical');

    const user = await (await User.create({ name, email, password })).toJSON();

    delete user.password;

    return user;
  }
}

module.exports = new CreateUser();
