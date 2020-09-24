const User = require('../models/UserModel');

class RemovePasswordAllUsers {
  async execute() {
    const users = await User.find();

    const usersWithOutPassword = users.map(user => {
      const _user = user.toJSON();

      delete _user.password;

      return _user;
    });

    return usersWithOutPassword;
  }
}

module.exports = new RemovePasswordAllUsers().execute;
