const MessageModel = require('../models/MessageModel');
const MessageValidator = require('../validators/MessageValidator');

class MessageController {
  async index(req, res) {
    const response = await MessageModel.find();

    return res.json(response);
  }

  async show(req, res) {
    const response = await MessageModel.findById(req.params.id);

    return res.json(response);
  }

  async store(req, res) {
    try {
      await MessageValidator(req.body, 'store')

      const response = await MessageModel.create(req.body);

      return res.json(response);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }

  async update(req, res) {
    try {
      await MessageValidator(req.body, 'update')

      const response = await MessageModel.findByIdAndUpdate(req.params.id, req.body);

      return res.json(response);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }

  async delete(req, res) {
    await MessageModel.findByIdAndDelete(req.params.id);

    return res.send(true);
  }
}

module.exports = new MessageController();
