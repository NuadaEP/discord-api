const UserModel = require('../models/UserModel');
const ChatModel = require('../models/ChatModel');
const ChatValidator = require('../validators/ChatValidator');

class ChatController {
  async index(req, res) {
    const { _id: creator_id } = res.locals.user;

    const response = await ChatModel.find({
      ended_at: null,
      creator_id,
    }).populate('users');

    return res.json(response);
  }

  async store(req, res) {
    try {
      await ChatValidator(req.body, 'store');

      const { _id: creator_id } = res.locals.user;

      const { user_id } = req.body;

      const user_one = await UserModel.findById(creator_id);

      const user_two = await UserModel.findOne(user_id);

      const data = {
        external_id,
        users: [user_one, user_two],
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
