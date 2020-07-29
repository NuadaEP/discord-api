const UserModel = require('../models/UserModel');
const ChatModel = require('../models/ChatModel');
const ChatValidator = require('../validators/ChatValidator');

class ChatController {
  async index(req, res) {
    const response = await ChatModel.find({ ended_at: null }).populate('users');

    return res.json(response);
  }

  async store(req, res) {
    try {
      await ChatValidator(req.body, 'store');

      const { external_id = null, users, custom_fields = {} } = req.body;

      const user_one = await UserModel.findOne({
        external_id: users.user_one_external_id,
      });

      const user_two = await UserModel.findOne({
        external_id: users.user_two_external_id,
      });

      const data = {
        external_id,
        users: [user_one, user_two],
        custom_fields: JSON.stringify(custom_fields),
      };

      const response = await ChatModel.create(data);

      return res.json(response);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }

  async end(req, res) {
    try {
      const response = await ChatModel.findByIdAndUpdate(req.params.id, {
        ended_at: new Date(),
      });

      return res.json(response);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }
}

module.exports = new ChatController();
