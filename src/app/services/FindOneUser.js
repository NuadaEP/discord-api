const User = require('../models/UserModel');

class FindOneUser {
  async execute(email) {
    const user = await (await User.findOne({ email })).toJSON();

    delete user.password;

    return user;
  }
}

module.exports = new FindOneUser();
