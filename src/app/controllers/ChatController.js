const ChatModel = require('../models/ChatModel');
const ChatValidator = require('../validators/ChatValidator');

class ChatController {
  async index(req, res) {
    const response = await ChatModel.find();

    return res.json(response);
  }

  async store(req, res) {
    try {
      await ChatValidator(req.body, 'store');

      const response = await ChatModel.create(req.body);

      return res.json(response);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }

  async end(req, res) {
    try {
      const response = await ChatModel.findByIdAndUpdate(req.params.id, {
        ended_at: new Date.now(),
      });

      return res.json(response);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }
}

module.exports = new ChatController();
