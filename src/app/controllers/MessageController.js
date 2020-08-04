const UserModel = require('../models/UserModel');
const ChatModel = require('../models/ChatModel');
const MessageModel = require('../models/MessageModel');
const MessageValidator = require('../validators/MessageValidator');

class MessageController {
  async index(req, res) {
    const { chat_id } = req.params;

    const chat = await ChatModel.findById(chat_id);

    if (!chat)
      return res.status(400).json({ message: 'This chat does not exists' });

    const response = await MessageModel.find({ chat: chat_id });

    return res.json(response);
  }

  async store(req, res) {
    try {
      await MessageValidator(req.body, 'store');

      const { chat_id } = req.params;
      const { _id: user_id } = res.locals.user;

      const chat = await ChatModel.findById(chat_id);

      if (!chat)
        return res.status(400).json({ message: 'This chat does not exists' });

      const user = await UserModel.findById(user_id);

      const data = {
        ...req.body,
        chat,
        user,
      };

      const response = await MessageModel.create(data);

      chat.last_message_resume = req.body.content;
      chat.last_message_created_at = response.createdAt;
      chat.save();

      req.io.emit('message', response);

      return res.json(response);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }
}

module.exports = new MessageController();
