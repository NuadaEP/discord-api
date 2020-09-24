const UserValidator = require('../validators/UserValidator');
const User = require('../models/UserModel');
const RemovePasswordAllUsers = require('../services/RemovePasswordAllUsers');

class UserController {
  async index(req, res) {
    const users = await RemovePasswordAllUsers();

    return res.json(users);
  }

  async show(req, res) {
    const { _id: user_id } = res.locals.user;

    return res.send({ user_id });
  }

  async store(req, res) {
    try {
      await UserValidator(req.body, 'store');

      const { name, email, password, confirmPassword } = req.body;

      if (await User.findOne({ email }))
        return res.status(400).json({ message: 'User is already in use' });

      if (password != confirmPassword)
        return res
          .status(400)
          .json({ message: 'The provided password is not identical' });

      const user = await User.create({ name, email, password });

      delete user.password;

      return res.json(user);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }
}

module.exports = new UserController();
