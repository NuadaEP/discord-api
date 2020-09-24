const UserValidator = require('../validators/UserValidator');
const User = require('../models/UserModel');
const RemovePasswordAllUsers = require('../services/RemovePasswordAllUsers');
const CreateUser = require('../services/CreateUser');

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

      const user = await CreateUser.execute(req.body);

      return res.json(user);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }
}

module.exports = new UserController();
