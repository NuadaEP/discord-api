const UserModel = require('../models/UserModel');
const UserValidator = require('../validators/UserValidator');

class UserController {
  async index(req, res) {
    const response = await UserModel.find();

    return res.json(response);
  }

  async show(req, res) {
    const response = await UserModel.findById(req.params.id);

    return res.json(response);
  }

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

  async delete(req, res) {
    await UserModel.findByIdAndDelete(req.params.id);

    return res.send(true);
  }
}

module.exports = new UserController();
