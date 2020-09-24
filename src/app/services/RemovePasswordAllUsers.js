const User = require('../models/UserModel');

class RemovePasswordAllUsers {
  async execute() {
    const users = await User.find();

    const usersWithOutPassword = users.map(user => {
      delete user.password;

      return user;
    });

    return usersWithOutPassword;
  }
}

module.exports = new RemovePasswordAllUsers().execute;
