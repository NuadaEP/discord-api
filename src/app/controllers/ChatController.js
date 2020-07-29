const ChatModel = require('../models/ChatModel');
const ChatValidator = require('../validators/ChatValidator');

class ChatController {
  async index(req, res) {
    const response = await ChatModel.find();

    return res.json(response);
  }

  async show(req, res) {
    const response = await ChatModel.findById(req.params.id);

    return res.json(response);
  }

  async store(req, res) {
    try {
      await ChatValidator(req.body, 'store')

      const response = await ChatModel.create(req.body);

      return res.json(response);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }

  async update(req, res) {
    try {
      await ChatValidator(req.body, 'update')

      const response = await ChatModel.findByIdAndUpdate(req.params.id, req.body);

      return res.json(response);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }

  async delete(req, res) {
    await ChatModel.findByIdAndDelete(req.params.id);

    return res.send(true);
  }
}

module.exports = new ChatController();
