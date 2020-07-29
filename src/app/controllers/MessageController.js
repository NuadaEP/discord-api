const UserModel = require('../models/UserModel');
const ChatModel = require('../models/ChatModel');
const MessageModel = require('../models/MessageModel');
const MessageValidator = require('../validators/MessageValidator');

class MessageController {
  async index(req, res) {
    const { chat_id } = req.params;

    const response = await MessageModel.find({ chat: chat_id });

    return res.json(response);
  }

  async store(req, res) {
    try {
      await MessageValidator(req.body, 'store');

      const { chat_id } = req.params;
      const { user_id, custom_fields = {} } = req.body;

      const chat = await ChatModel.findById(chat_id);

      const user = await UserModel.findById(user_id);

      const data = {
        ...req.body,
        chat,
        user,
        custom_fields: JSON.stringify(custom_fields),
      };

      const response = await MessageModel.create(data);

      return res.json(response);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }
}

module.exports = new MessageController();
