const UserModel = require('../models/UserModel');
const ChatModel = require('../models/ChatModel');
const MessageModel = require('../models/MessageModel');
const MessageValidator = require('../validators/MessageValidator');

class MessageController {
  async index(req, res) {
    const response = await MessageModel.find();

    return res.json(response);
  }

  async store(req, res) {
    try {
      await MessageValidator(req.body, 'store');

      const { chat_id } = req.params;
      const { user_id, content, custom_fields = {} } = req.body;

      const chat = await ChatModel.findById(chat_id).populate('users');

      const user = await UserModel.findById(user_id);

      const data = {
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

  async update(req, res) {
    try {
      await MessageValidator(req.body, 'update');

      const response = await MessageModel.findByIdAndUpdate(
        req.params.id,
        req.body
      );

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
