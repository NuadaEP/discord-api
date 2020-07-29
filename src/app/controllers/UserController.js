const UserModel = require('../models/UserModel');
const UserValidator = require('../validators/UserValidator');

class UserController {
  async store(req, res) {
    try {
      await UserValidator(req.body, 'store');

      const response = await UserModel.create({
        ...req.body,
        custom_fields: JSON.stringify(req.body.custom_fields),
      });

      return res.json(response);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }

  async update(req, res) {
    try {
      await UserValidator(req.body, 'update');

      const response = await UserModel.findByIdAndUpdate(req.params.id, {
        ...req.body,
        custom_fields: JSON.stringify(req.body.custom_fields),
      });

      return res.json(response);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }
}

module.exports = new UserController();
